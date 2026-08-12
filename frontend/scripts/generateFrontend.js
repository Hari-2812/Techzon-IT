import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

// 1. Create Enterprise Folder Structure
const folders = [
  'assets',
  'components/ui',
  'components/common',
  'components/forms',
  'components/layout',
  'components/loaders',
  'components/seo',
  'components/animations',
  'components/three',
  'hooks',
  'services',
  'context',
  'utils',
  'constants',
  'routes',
  'layouts',
  'pages',
  'styles',
  'config'
];

folders.forEach((folder) => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// 2. Utils
const cnCode = `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;
fs.writeFileSync(path.join(baseDir, 'utils', 'cn.js'), cnCode);

// 3. Components
const components = {
  Button: `import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  };

  return (
    <button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} disabled={isLoading} {...props}>
      {isLoading ? <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      {children}
    </button>
  );
});
Button.displayName = 'Button';`,

  Input: `import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";`,

  Textarea: `import React from 'react';
import { cn } from '../../utils/cn';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";`,

  Badge: `import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
  );
};`,

  Card: `import React from 'react';
import { cn } from '../../utils/cn';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";`,

  Spinner: `import React from 'react';
import { cn } from '../../utils/cn';

export const Spinner = ({ className }) => (
  <svg className={cn("animate-spin h-5 w-5 text-current", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);`
};

Object.entries(components).forEach(([name, code]) => {
  fs.writeFileSync(path.join(baseDir, 'components/ui', `${name}.jsx`), code);
});

// Create placeholders for other requested components
const placeholders = ['Select', 'Checkbox', 'Radio', 'Toggle', 'Chip', 'Modal', 'Drawer', 'Tooltip', 'Accordion', 'Tabs', 'Table', 'Pagination', 'Breadcrumb', 'Avatar', 'Skeleton', 'Toast', 'Loader'];
placeholders.forEach(name => {
  const code = `import React from 'react';\nimport { cn } from '../../utils/cn';\n\nexport const ${name} = ({ className }) => <div className={cn('', className)}>${name} Component</div>;\n`;
  fs.writeFileSync(path.join(baseDir, 'components/ui', `${name}.jsx`), code);
});


// 4. Config & Axios
const axiosCode = `import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Handle global errors here (e.g. 401 refresh token logic)
    return Promise.reject(error);
  }
);

export default api;
`;
fs.writeFileSync(path.join(baseDir, 'config', 'axios.js'), axiosCode);

// 5. Layouts
const layoutsCode = `import React from 'react';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <header className="h-16 border-b flex items-center px-6">Header</header>
    <main className="flex-1"><Outlet /></main>
    <footer className="h-16 border-t flex items-center justify-center">Footer</footer>
  </div>
);

export const AdminLayout = () => (
  <div className="flex min-h-screen bg-muted/40">
    <aside className="w-64 border-r bg-background">Sidebar</aside>
    <main className="flex-1 p-6"><Outlet /></main>
  </div>
);

export const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted/40">
    <div className="w-full max-w-md"><Outlet /></div>
  </div>
);
`;
fs.writeFileSync(path.join(baseDir, 'layouts', 'index.jsx'), layoutsCode);

// 6. Routes
const routesCode = `import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AdminLayout, AuthLayout } from '../layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <div>Home Page (Pending)</div> },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <div>Login (Pending)</div> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <div>Dashboard (Pending)</div> }
    ]
  }
]);
`;
fs.writeFileSync(path.join(baseDir, 'routes', 'index.jsx'), routesCode);

// 7. Contexts
const contextsCode = `import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => useContext(ThemeContext);
`;
fs.writeFileSync(path.join(baseDir, 'context', 'index.jsx'), contextsCode);

console.log('Frontend Architecture successfully generated.');
