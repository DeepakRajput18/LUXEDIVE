import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  useGLTF,
  Stage,
  Float,
  Center,
  Html,
  useProgress
} from '@react-three/drei'
import { Loader2, AlertCircle } from 'lucide-react'

// Loading indicator component inside Canvas
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 min-w-[200px]">
        <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-luxe-gold/20 rounded-full" />
            <div 
                className="absolute inset-0 border-4 border-luxe-gold rounded-full border-t-transparent animate-spin"
                style={{ animationDuration: '1s' }}
            />
            <span className="text-sm font-black text-luxe-gold">{Math.round(progress)}%</span>
        </div>
        <div className="text-center">
            <p className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Loading 3D Model</p>
            <p className="text-gray-500 text-[8px] uppercase tracking-widest mt-1">High-Fidelity Rendering</p>
        </div>
      </div>
    </Html>
  )
}

// The car model component
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  
  // Basic optimization: traverse and set shadow properties
  scene.traverse((node: any) => {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
    }
  })

  return <primitive object={scene} />
}

interface Car3DViewerProps {
  modelUrl: string
}

const Car3DViewer: React.FC<Car3DViewerProps> = ({ modelUrl }) => {
  const [error, setError] = useState<string | null>(null)

  // Pre-normalized storage URL if needed
  const getFullUrl = (url: string) => {
    if (url.startsWith('http')) return url
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
    if (!SUPABASE_URL) return ''
    return `${SUPABASE_URL}/storage/v1/object/public/models/${url}`
  }

  const finalUrl = getFullUrl(modelUrl)

  if (!finalUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#0A0C10]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-serif text-white uppercase">Configuration Error</h3>
        <p className="text-gray-500 text-sm mt-2">Database environment URL is missing.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-[#0A0C10] group">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [5, 2, 5], fov: 35 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          <Stage 
            intensity={0.5} 
            environment="city" 
            shadows={{ type: 'contact', opacity: 0.4, blur: 3 }} 
            adjustCamera={1.5}
          >
            <Center>
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <Model url={finalUrl} />
              </Float>
            </Center>
          </Stage>
          
          <OrbitControls 
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.75} 
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minDistance={4}
            maxDistance={12}
          />
          
          {/* Subtle floor shadows if Stage isn't enough */}
          <ContactShadows 
            position={[0, -0.01, 0]} 
            opacity={0.75} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
      </Canvas>

      {/* 3D Exclusive UI Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none">
          <div className="flex items-center gap-3">
              <div className="w-0.5 h-6 bg-luxe-gold" />
              <div>
                  <h4 className="text-white text-xs font-serif uppercase tracking-widest">3D Real-Time Interaction</h4>
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Orbit • Zoom • Inspect</p>
              </div>
          </div>
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Drag to Orbit • Scroll to Zoom</span>
          </div>
      </div>
    </div>
  )
}

export default Car3DViewer
