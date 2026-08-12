import React from 'react';
import { BookOpen, Users, Video, CreditCard, MessageSquare, CheckCircle, Database, Layout, Server, Lock, Zap, FileText } from 'lucide-react';

export const CASE_STUDIES = {
  "lms-system": {
    slug: "lms-system",
    _id: "lms-system",
    title: "LMS System",
    category: "Learning Management System",
    projectType: "Full-Stack Web Application",
    description: "A complete full-stack learning platform for managing courses, students, mentors, live classes, recorded content, payments, assessments, progress, and certificates.",
    shortDescription: "A complete full-stack learning platform for managing courses, students, mentors, live classes, recorded content, payments, assessments, progress, and certificates.",
    overview: "The LMS System is a full-stack web application designed to provide a centralized digital learning environment for students, mentors, and administrators.\n\nThe platform brings course management, student enrollment, live learning, recorded sessions, payments, assignments, quizzes, progress tracking, and certificates into one system.\n\nThe goal is to simplify the complete learning lifecycle while providing students with a clean and structured learning experience.",
    objective: [
      "Centralize learning content",
      "Simplify course enrollment",
      "Manage students and mentors",
      "Support live and recorded learning",
      "Track student progress",
      "Manage assessments",
      "Handle online payments",
      "Provide certificates",
      "Provide secure role-based access"
    ],
    features: [
      {
        title: "Course Management",
        description: "Manage courses, modules, sessions, and learning content.",
        icon: BookOpen
      },
      {
        title: "Live Learning",
        description: "Support live sessions through Google Meet integration.",
        icon: Video
      },
      {
        title: "Progress Tracking",
        description: "Track student learning progress across courses.",
        icon: Zap
      },
      {
        title: "Assessments",
        description: "Support assignments and quizzes.",
        icon: FileText
      },
      {
        title: "Certificates",
        description: "Generate certificates after successful course completion.",
        icon: CheckCircle
      },
      {
        title: "Secure Access",
        description: "Restrict course content based on enrollment and authorization.",
        icon: Lock
      }
    ],
    technologies: {
      Frontend: ["React", "Vite", "Tailwind CSS", "Redux Toolkit", "React Query", "Axios", "React Hook Form", "Framer Motion"],
      Backend: ["Node.js", "Express.js", "REST API"],
      Database: ["MongoDB", "MongoDB Atlas"],
      Authentication: ["JWT", "Role-based authorization"],
      Payments: ["Razorpay"],
      Real_time: ["Socket.IO"],
      Other: ["Google Meet integration", "Secure content access"]
    },
    techStack: ["React", "Node.js", "MongoDB", "Razorpay"],
    workflow: [
      "Student",
      "Registration",
      "Course Selection",
      "Payment",
      "Enrollment",
      "Learning Dashboard",
      "Course Progress",
      "Assessment",
      "Certificate"
    ],
    challenges: [
      {
        challenge: "Managing multiple learning activities in a single platform.",
        solution: "Designed a centralized dashboard architecture for courses, students, payments, progress, assessments, and certificates."
      },
      {
        challenge: "Restricting course content to enrolled students.",
        solution: "Implemented JWT authentication and enrollment-based authorization."
      }
    ],
    architecture: {
      frontend: "React Frontend",
      backend: "Node.js / Express API",
      database: "MongoDB",
      external: ["Razorpay", "Google Meet", "Socket.IO"]
    },
    sidebarInfo: {
      "Project Type": "Full-Stack Web Application",
      "Frontend": "React / Vite / Tailwind CSS",
      "Backend": "Node.js / Express",
      "Database": "MongoDB",
      "Integrations": "Razorpay / Google Meet / Socket.IO"
    },
    outcome: "The LMS provides a centralized platform for managing the complete learning journey, from student registration and course enrollment to learning, assessments, progress tracking, and certification.\n\nThe system reduces the need for multiple disconnected tools and provides students and administrators with a structured digital learning experience."
  },
  "whatsapp-crm-dashboard": {
    slug: "whatsapp-crm-dashboard",
    _id: "whatsapp-crm-dashboard",
    title: "WhatsApp CRM Dashboard",
    category: "CRM / Customer Engagement Platform",
    projectType: "Full-Stack SaaS / CRM Platform",
    description: "A centralized customer engagement platform for managing WhatsApp contacts, campaigns, templates, conversations, scheduling, and analytics.",
    shortDescription: "A centralized customer engagement platform for managing WhatsApp contacts, campaigns, templates, conversations, scheduling, and analytics.",
    overview: "The WhatsApp CRM Dashboard is a centralized customer communication platform designed to help businesses organize contacts and manage WhatsApp-based communication campaigns.\n\nThe platform provides a structured interface for managing contacts, creating campaigns, using message templates, scheduling communication, and tracking campaign activity.",
    objective: [
      "Centralize customer contacts",
      "Simplify WhatsApp campaign management",
      "Organize message templates",
      "Schedule campaigns",
      "Track campaign activity",
      "Integrate WhatsApp Business communication",
      "Provide a centralized CRM dashboard"
    ],
    features: [
      {
        title: "Contact Management",
        description: "Centralized storage and organization for all customer contacts.",
        icon: Users
      },
      {
        title: "Bulk Campaigns",
        description: "Create and launch large-scale personalized messaging campaigns.",
        icon: MessageSquare
      },
      {
        title: "Message Templates",
        description: "Manage pre-approved WhatsApp message templates natively.",
        icon: FileText
      },
      {
        title: "Campaign Scheduling",
        description: "Schedule campaigns to deploy at optimal engagement times.",
        icon: Zap
      },
      {
        title: "Analytics & Tracking",
        description: "Monitor campaign statuses, delivery rates, and read receipts.",
        icon: CheckCircle
      },
      {
        title: "Cloud API Integration",
        description: "Seamlessly connect with the Meta WhatsApp Business API via webhooks.",
        icon: Server
      }
    ],
    technologies: {
      Frontend: ["React", "Vite", "Tailwind CSS", "Axios", "React Hook Form", "Framer Motion"],
      Backend: ["Node.js", "Express.js", "REST API"],
      Database: ["MongoDB", "MongoDB Atlas"],
      Authentication: ["JWT"],
      WhatsApp: ["WhatsApp Cloud API", "Meta WhatsApp Business Platform", "Webhooks"]
    },
    techStack: ["React", "Node.js", "WhatsApp API", "MongoDB"],
    workflow: [
      "Business",
      "Connect WhatsApp",
      "Import Contacts",
      "Create Campaign",
      "Select Template",
      "Schedule / Send",
      "WhatsApp Delivery",
      "Track Messages",
      "Analyze Campaign"
    ],
    challenges: [
      {
        challenge: "Managing large-scale customer communication.",
        solution: "Created a centralized campaign and contact management dashboard."
      },
      {
        challenge: "Tracking WhatsApp communication.",
        solution: "Integrated WhatsApp Cloud API and webhook-based message status tracking."
      }
    ],
    architecture: {
      frontend: "React Frontend",
      backend: "Node.js / Express API",
      database: "MongoDB",
      external: ["WhatsApp Cloud API", "Webhooks"]
    },
    sidebarInfo: {
      "Project Type": "Full-Stack SaaS / CRM Platform",
      "Frontend": "React / Vite / Tailwind CSS",
      "Backend": "Node.js / Express",
      "Database": "MongoDB",
      "Integrations": "WhatsApp Cloud API / Webhooks"
    },
    outcome: "The WhatsApp CRM Dashboard provides businesses with a centralized interface for organizing customer communication and managing WhatsApp campaigns instead of relying on disconnected manual processes."
  }
};
