import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve('d:/project/Techzon IT Solutions/frontend/src');

// 1. Navbar.jsx
const navbarCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-colors duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl leading-none tracking-tighter">T</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Techzon</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Process</a>
          <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Portfolio</a>
          <a href="#company" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Company</a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-sm">Client Login</Button>
          <Button className="text-sm rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105">
            Schedule Call
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={cn("block w-6 h-0.5 bg-foreground transition-transform", isMobileMenuOpen ? "rotate-45 translate-y-2" : "")} />
          <span className={cn("block w-6 h-0.5 bg-foreground transition-opacity", isMobileMenuOpen ? "opacity-0" : "")} />
          <span className={cn("block w-6 h-0.5 bg-foreground transition-transform", isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "")} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              <a href="#services" className="text-lg font-medium">Services</a>
              <a href="#process" className="text-lg font-medium">Process</a>
              <a href="#portfolio" className="text-lg font-medium">Portfolio</a>
              <a href="#company" className="text-lg font-medium">Company</a>
              <Button className="mt-4 w-full">Schedule Call</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
`;

// 2. HeroCanvas.jsx
const heroCanvasCode = `import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

const NetworkGlobe = () => {
  const groupRef = useRef();
  const radius = 2.5;
  const count = 100;
  
  // Generate points on a sphere
  const [points, connections] = useMemo(() => {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; 
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      pts.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    
    // Create connection lines between nearby points
    const lines = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = pts[i].distanceTo(pts[j]);
        if (dist < 1.5) {
          lines.push([pts[i], pts[j]]);
        }
      }
    }
    return [pts, lines];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Smooth idle rotation
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    
    // Mouse parallax interaction
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Central subtle globe glow */}
      <Sphere args={[radius * 0.95, 32, 32]}>
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.03} />
      </Sphere>
      
      {/* Nodes */}
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Connections */}
      {connections.map((c, i) => (
        <Line 
          key={i} 
          points={c} 
          color="#4f46e5" 
          opacity={0.15} 
          transparent 
          lineWidth={1} 
        />
      ))}
    </group>
  );
};

export const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={['#020817', 5, 12]} />
        <ambientLight intensity={0.5} />
        <NetworkGlobe />
      </Canvas>
      
      {/* Gradient overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
};
`;

// 3. Hero.jsx
const heroCode = `import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { HeroCanvas } from '../three/HeroCanvas';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      <HeroCanvas />

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Enterprise IT Solutions 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Engineering the <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future of Enterprise IT</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            We architect, secure, and scale digital ecosystems for global industry leaders. Stop maintaining legacy systems. Start innovating.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Explore Our Services
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 text-base border-border/50 hover:bg-muted/50">
              Schedule Architecture Review
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements / Tech Nodes */}
      <motion.div style={{ y: y1, opacity }} className="absolute hidden lg:block left-10 top-1/3">
        <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md shadow-2xl">
          <div className="text-xs font-semibold text-muted-foreground mb-1">Uptime SLA</div>
          <div className="text-2xl font-bold text-foreground">99.999%</div>
        </div>
      </motion.div>

      <motion.div style={{ y: y2, opacity }} className="absolute hidden lg:block right-12 bottom-1/3">
        <div className="p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-md shadow-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground">Security</div>
            <div className="text-sm font-bold text-foreground">SOC2 Type II</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
`;

// 4. Home.jsx
const homeCode = `import React from 'react';
import { Hero } from '../components/home/Hero';

export const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      {/* Remaining sections will be appended here in future phases */}
      <div className="h-screen flex items-center justify-center border-t border-border">
        <p className="text-muted-foreground text-sm">Additional sections pending user approval...</p>
      </div>
    </div>
  );
};
`;

// Ensure directories exist
fs.mkdirSync(path.join(baseDir, 'components/home'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'components/three'), { recursive: true });

// Write files
fs.writeFileSync(path.join(baseDir, 'components/home', 'Navbar.jsx'), navbarCode);
fs.writeFileSync(path.join(baseDir, 'components/three', 'HeroCanvas.jsx'), heroCanvasCode);
fs.writeFileSync(path.join(baseDir, 'components/home', 'Hero.jsx'), heroCode);
fs.writeFileSync(path.join(baseDir, 'pages', 'Home.jsx'), homeCode);

// Update routes/index.jsx
const routesCode = `import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout, AdminLayout, AuthLayout } from '../layouts';
import { Home } from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
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

// Update layouts/index.jsx
const layoutsCode = `import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/home/Navbar';

export const PublicLayout = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground">
    <Navbar />
    <main className="flex-1"><Outlet /></main>
  </div>
);

export const AdminLayout = () => (
  <div className="flex min-h-screen bg-muted/40">
    <aside className="w-64 border-r border-border bg-background">Sidebar</aside>
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

console.log('Hero and Navbar components fully generated.');
