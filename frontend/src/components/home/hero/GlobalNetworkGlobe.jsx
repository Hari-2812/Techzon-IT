import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Line, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Texture URLs
const EARTH_TEXTURE_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const EARTH_BUMP_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png';

const Earth = () => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // Load textures
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    EARTH_TEXTURE_URL,
    EARTH_BUMP_URL
  ]);

  // Optimize texture wrapping
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.anisotropy = 16;
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // 25s per rotation = 2 * PI / 25 = 0.25 rad/s
    const rotationSpeed = 0.25;
    
    if (earthRef.current) {
      earthRef.current.rotation.y = t * rotationSpeed;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * (rotationSpeed * 1.1); // Clouds move slightly faster
      cloudsRef.current.rotation.z = Math.sin(t * 0.1) * 0.05; // Slight drift
    }
  });

  return (
    <group>
      {/* Main Earth Sphere */}
      <Sphere ref={earthRef} args={[2.5, 64, 64]} rotation={[0.2, 0, 0]}>
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.015}
          color="#D9F2FF" // Bright cyan/blue tint
          emissive="#5BC0EB"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.3}
        />
        
        {/* Network points on the surface */}
        <NetworkNodes />
      </Sphere>

      {/* Atmospheric Cloud Layer (Procedural Approximation) */}
      <Sphere ref={cloudsRef} args={[2.53, 32, 32]}>
        <meshLambertMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
      
      {/* Outer Atmospheric Glow */}
      <Sphere args={[2.65, 32, 32]}>
        <meshBasicMaterial
          color="#D9F2FF"
          transparent={true}
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const NetworkNodes = () => {
  // Generate random points on the sphere for the digital network
  const { positions, colors } = useMemo(() => {
    const pos = [];
    const col = [];
    const colorObj = new THREE.Color();
    
    for (let i = 0; i < 200; i++) {
      const phi = Math.acos(-1 + (2 * i) / 200);
      const theta = Math.sqrt(200 * Math.PI) * phi;
      
      const r = 2.505; // Just above surface
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos.push(x, y, z);
      
      if (Math.random() > 0.8) {
        colorObj.set('#FF8A3D'); // Orange highlight
      } else {
        colorObj.set('#5BC0EB'); // Blue base
      }
      col.push(colorObj.r, colorObj.g, colorObj.b);
    }
    return { positions: new Float32Array(pos), colors: new Float32Array(col) };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} />
    </points>
  );
};

const OrbitalRings = () => {
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  
  const generateRing = (radius, points = 64) => {
    const arr = [];
    for (let i = 0; i <= points; i++) {
      const theta = (i / points) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return arr;
  };
  
  const ring1Pts = useMemo(() => generateRing(3.2), []);
  const ring2Pts = useMemo(() => generateRing(3.6), []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef1.current) {
      ringRef1.current.rotation.y = t * 0.1;
      ringRef1.current.rotation.x = Math.sin(t * 0.05) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -t * 0.08;
      ringRef2.current.rotation.z = Math.cos(t * 0.05) * 0.3;
    }
  });

  return (
    <group>
      <group ref={ringRef1} rotation={[0.4, 0, 0]}>
        <Line points={ring1Pts} color="#5BC0EB" opacity={0.3} transparent lineWidth={1} />
        <mesh position={[3.2, 0, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#FF8A3D" />
        </mesh>
      </group>
      <group ref={ringRef2} rotation={[-0.2, 0, 0.2]}>
        <Line points={ring2Pts} color="#D9F2FF" opacity={0.2} transparent lineWidth={1} />
        <mesh position={[-3.6, 0, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#5BC0EB" />
        </mesh>
      </group>
    </group>
  );
};

export const GlobalNetworkGlobe = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#D9F2FF" />
        
        <React.Suspense fallback={null}>
          <Earth />
          <OrbitalRings />
          <Preload all />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
