import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Box3, MathUtils, Vector3 } from 'three'

const MODEL_PATH = '/models/car.glb'

function useResponsiveCamera() {
  const [cameraPosition, setCameraPosition] = useState(() =>
    window.innerWidth < 768 ? [0, 1.35, 6.6] : [0, 1.5, 5],
  )

  useEffect(() => {
    const handleResize = () => {
      setCameraPosition(window.innerWidth < 768 ? [0, 1.35, 6.6] : [0, 1.5, 5])
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return cameraPosition
}

function CarModel({ onLoaded, scrollProgress = 0 }) {
  const groupRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const autoRotationRef = useRef(0)
  const { scene } = useGLTF(MODEL_PATH)

  const { model, offset } = useMemo(() => {
    const clonedScene = scene.clone(true)

    clonedScene.traverse((child) => {
      if (!child.isMesh) return

      child.castShadow = true
      child.receiveShadow = true

      if (child.material) {
        child.material.envMapIntensity = 1.35
        child.material.needsUpdate = true
      }
    })

    const bounds = new Box3().setFromObject(clonedScene)
    const center = bounds.getCenter(new Vector3())
    const baseY = bounds.min.y

    return {
      model: clonedScene,
      offset: [-center.x, -baseY, -center.z],
    }
  }, [scene])

  useEffect(() => {
    onLoaded?.()
  }, [onLoaded])

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    autoRotationRef.current += delta * 0.18

    const scrollRotationY = scrollProgress * Math.PI
    const targetY =
      autoRotationRef.current + pointerRef.current.x * 0.3 + scrollRotationY
    const targetX = pointerRef.current.y * 0.1

    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.045,
    )
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.04,
    )
  })

  return (
    <group ref={groupRef} scale={1.5} position={[0, -0.62, 0]}>
      <primitive object={model} position={offset} />
    </group>
  )
}

function CameraRig({ offsetX = 0 }) {
  useFrame(({ camera }) => {
    camera.position.x = MathUtils.lerp(camera.position.x, offsetX, 0.05)
    camera.updateProjectionMatrix()
  })

  return null
}

function CarScene({
  onLoaded,
  scrollProgress = 0,
  cameraOffsetX = 0,
  enableOrbit = true,
}) {
  const cameraPosition = useResponsiveCamera()

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          fov: 45,
          position: cameraPosition,
          near: 0.1,
          far: 100,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[4, 5, 3]}
          intensity={1.5}
          color="#f5f0e8"
          castShadow
        />
        <pointLight
          position={[-2.5, 1.2, 2.5]}
          color="#c9a84c"
          intensity={0.8}
        />
        <CameraRig offsetX={cameraOffsetX} />
        <Suspense fallback={null}>
          <CarModel onLoaded={onLoaded} scrollProgress={scrollProgress} />
        </Suspense>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.62, 0]}
          opacity={0.4}
          blur={2.5}
          scale={9}
          far={4}
          color="#c9a84c"
        />
        <OrbitControls
          enabled={enableOrbit}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
          target={[0, 0.15, 0]}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)

export default CarScene
