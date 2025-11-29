import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function React3DLogo() {
  const { scene } = useGLTF("/models/react-logo.glb");

  return (
    <div className="aspect-square w-full bg-base-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-primary/20 hover:border-cyan-500 transition-all flex flex-col group">
      {/* 3D Canvas – takes most of the space */}
      <div className="flex-1">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} color="#61dafb" intensity={1.5} />
          <pointLight position={[-5, -5, 5]} color="#bd8cd9" intensity={1} />

          <primitive
            object={scene}
            scale={0.85}
            position={[0, 0, 0]}
            rotation={[0.3, 0.3, 0]}
          />

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>

      {/* Text ALWAYS visible below the canvas */}
      <div className="py-2 text-center">
        <p className="text-xs font-bold text-cyan-400">React.js</p>
      </div>
    </div>
  );
}