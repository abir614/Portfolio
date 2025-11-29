import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function FurryBall() {
  const { scene } = useGLTF("/models/furry-ball.glb");

  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 -ml-1 -mt-2.5 pointer-events-auto select-none">
      {/* -mt-2.5 = drops ~10px perfectly */}
      <div className="w-full h-full flex items-center justify-center">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 40 }}
          style={{ width: "100%", height: "100%" }}
          className="rounded-full overflow-hidden"
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#bd8cd9" />
          <pointLight position={[-10, -10, 10]} intensity={1} color="#c4b5fd" />

          <primitive
            object={scene}
            scale={2.4}
            position={[0, 0, 0]}
            rotation={[0.3, 0, 0]}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.8}
            rotateSpeed={1.3}
          />
        </Canvas>
      </div>
    </div>
  );
}