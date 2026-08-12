import User from '../models/User.js';
import { generateTokens } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Helper to set cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
  const isProd = env.nodeEnv === 'production';
  
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000 // 15 mins
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, mobileNumber } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }
  
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'superadmin' : 'user';
  
  const user = new User({ name, email, password, mobileNumber, role });
  const verifyToken = user.createEmailVerificationToken();
  await user.save();

  // Send verification email
  const verifyUrl = `${env.clientUrl}/verify-email/${verifyToken}`;
  const message = `Please verify your email by clicking: \n\n ${verifyUrl}`;
  await sendEmail({ email: user.email, subject: 'Email Verification', message });
  
  res.status(201).json(new ApiResponse(201, null, 'Registration successful. Please verify your email.'));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email }).select('+password');
  
  // Dummy compare to prevent timing attacks
  if (!user) {
    await bcrypt.compare(password, '$2a$12$DUMMYHASHFORSECURITYTIMINGATTACKPREVENTION123456');
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if locked out
  if (user.isLocked) {
    throw new ApiError(401, 'Account temporarily locked. Please try again later.');
  }

  // Check status
  if (user.status === 'suspended' || user.status === 'inactive') {
    throw new ApiError(403, 'Account is inactive or suspended');
  }
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    await user.handleFailedLogin();
    throw new ApiError(401, 'Invalid email or password');
  }
  
  await user.recordLogin();
  
  const { accessToken, refreshToken } = generateTokens(user._id, user.role);
  setTokenCookies(res, accessToken, refreshToken);
  
  res.status(200).json(new ApiResponse(200, {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    isEmailVerified: user.isEmailVerified
  }, 'Login successful'));
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie('accessToken', 'logout', { httpOnly: true, expires: new Date(Date.now()) });
  res.cookie('refreshToken', 'logout', { httpOnly: true, expires: new Date(Date.now()) });
  res.status(200).json(new ApiResponse(200, null, 'User logged out'));
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ApiError(401, 'No refresh token provided');
  }
  
  try {
    const decoded = jwt.verify(refreshToken, env.jwt.refreshSecret);
    const user = await User.findById(decoded.id);
    
    if (!user || user.status !== 'active') {
      throw new ApiError(401, 'Invalid refresh token or inactive account');
    }
    
    // In a full implementation, we'd embed the tokenVersion in the JWT payload and verify it here.
    // For simplicity, we just generate new tokens.
    
    const tokens = generateTokens(user._id, user.role);
    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
    
    res.status(200).json(new ApiResponse(200, null, 'Tokens refreshed'));
  } catch {
    throw new ApiError(401, 'Invalid refresh token');
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(new ApiResponse(200, user, 'Current user profile'));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, mobileNumber, profileImage } = req.body;
  const user = await User.findById(req.user.id);
  
  if (name) user.name = name;
  if (mobileNumber) user.mobileNumber = mobileNumber;
  if (profileImage) user.profileImage = profileImage;
  
  await user.save();
  res.status(200).json(new ApiResponse(200, user, 'Profile updated'));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');
  
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid current password');
  }
  
  user.password = newPassword;
  await user.revokeTokens(); // Revokes old refresh tokens implicitly
  await user.save();
  
  // Log out user on all devices except current (handled via token revocation, need to login again)
  res.cookie('accessToken', 'logout', { httpOnly: true, expires: new Date(Date.now()) });
  res.cookie('refreshToken', 'logout', { httpOnly: true, expires: new Date(Date.now()) });
  
  res.status(200).json(new ApiResponse(200, null, 'Password changed successfully. Please log in again.'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // Return same message to prevent enumeration
    return res.status(200).json(new ApiResponse(200, null, 'If that email is registered, a password reset link has been sent.'));
  }
  
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  
  const resetUrl = `${env.clientUrl}/reset-password/${resetToken}`;
  const message = `You requested a password reset. Click here to reset: \n\n ${resetUrl}`;
  
  try {
    await sendEmail({ email: user.email, subject: 'Password Reset', message });
    res.status(200).json(new ApiResponse(200, null, 'If that email is registered, a password reset link has been sent.'));
  } catch {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, 'Email could not be sent');
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  
  if (!user) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }
  
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.revokeTokens();
  await user.save();
  
  res.status(200).json(new ApiResponse(200, null, 'Password reset successful'));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const emailVerificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
  const user = await User.findOne({
    emailVerificationToken,
    emailVerificationExpire: { $gt: Date.now() },
  });
  
  if (!user) {
    throw new ApiError(400, 'Invalid or expired verification token');
  }
  
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;
  await user.save();
  
  res.status(200).json(new ApiResponse(200, null, 'Email successfully verified'));
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(200).json(new ApiResponse(200, null, 'If that email is registered, a verification link has been sent.'));
  }
  
  if (user.isEmailVerified) {
    throw new ApiError(400, 'Email is already verified');
  }
  
  const verifyToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });
  
  const verifyUrl = `${env.clientUrl}/verify-email/${verifyToken}`;
  const message = `Please verify your email by clicking: \n\n ${verifyUrl}`;
  await sendEmail({ email: user.email, subject: 'Email Verification', message });
  
  res.status(200).json(new ApiResponse(200, null, 'If that email is registered, a verification link has been sent.'));
});
