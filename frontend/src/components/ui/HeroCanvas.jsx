import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

function FloatingCore() {
    const meshRef = useRef();

    useFrame((state, _, __, invalidate) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
        // Request next frame since we use frameloop="demand"
        state.invalidate();
    });

    return (
        <Sphere ref={meshRef} args={[1, 48, 48]} scale={2}>
            <MeshDistortMaterial
                color="#56E0E0"
                envMapIntensity={0.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.4}
                roughness={0.2}
                distort={0.4}
                speed={2}
            />
        </Sphere>
    );
}

export default function HeroCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            frameloop="demand"
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
        >
            {/* Lighting for the light theme */}
            <ambientLight intensity={1.5} color="#F7FCFF" />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#DFFFFF" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#7BE8EA" />

            {/* 3D Model */}
            <FloatingCore />

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.5}
            />
        </Canvas>
    );
}
