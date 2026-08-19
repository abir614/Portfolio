import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function Local3D({ model, glow = "#4f46e5", name, scale = 1 }) {
  const { scene } = useGLTF(model);

  return (
    <div className="aspect-square w-full neo-box-sm neo-hover-lift rounded-xl p-1.5 xs:p-2 sm:p-2.5 flex flex-col justify-between items-center text-center bg-[var(--neo-surface-subtle)] group cursor-pointer relative overflow-hidden">
      
      {/* 3D Indicator Badge */}
      <div className="absolute top-1 left-1 z-10">
        <span className="font-mono text-[7px] xs:text-[8px] font-black bg-[var(--neo-surface)] text-[var(--neo-text)] border border-[var(--neo-border)] px-1 py-0.2 rounded shadow-[1px_1px_0px_var(--neo-shadow)]">
          3D
        </span>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5], fov: 48 }}>
          <ambientLight intensity={2.2} />
          <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
          <pointLight position={[10, 10, 10]} intensity={4} color={glow} />
          <pointLight position={[-10, -10, 10]} intensity={2} color="#ffffff" />

          <primitive object={scene} scale={scale} position={[0, 0, 0]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.4} />
        </Canvas>
      </div>

      {/* Card Footer Title */}
      <p className="font-display font-bold text-[10px] xs:text-[11px] sm:text-xs text-[var(--neo-text)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 w-full text-center pt-0.5">
        {name}
      </p>
    </div>
  );
}