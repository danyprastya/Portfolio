import React from "react";
import { Canvas } from "@react-three/fiber";
import Character from "./Character";
import { OrbitControls } from "@react-three/drei";

const AnimatedCharacter = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 3, 5]} intensity={2} />
      <React.Suspense fallback={null}>
        <Character position={[0, -1.0, 0]}/>
      </React.Suspense>
      <OrbitControls
        enableZoom={false} 
        enablePan={false} // Batasi rotasi agar tidak bisa terbalik
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 2.5} />
    </Canvas>
  );
};

export default AnimatedCharacter;
