// src/components/Local3D.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function Local3D({ model, glow = "#bd8cd9", name, scale = 1 }) {
  const { scene } = useGLTF(model);

  return (
    <div className="aspect-square w-full bg-base-100 rounded-2xl shadow-xl border border-primary/20 flex flex-col group cursor-pointer transition-all duration-500 hover:border-purple-400 hover:shadow-2xl">
      
      <div className="flex-1 relative overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 group-hover:ring-4 group-hover:ring-purple-500/30 transition-all duration-500">
          <Canvas camera={{ position: [0, 0, 5], fov: 48 }}>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
            <pointLight position={[10, 10, 10]} intensity={4.5} color={glow} />
            <pointLight position={[-10, -10, 10]} intensity={2.5} color="#f0e6ff" />

            <primitive object={scene} scale={scale} position={[0, 0, 0]} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
        </div>
      </div>

      <div className="py-3 px-2 text-center bg-base-100 rounded-b-2xl">
        <p className="text-xs font-bold text-gray-700 group-hover:text-purple-500 transition-colors duration-300 tracking-tight">
          {name}
        </p>
      </div>
    </div>
  );
}