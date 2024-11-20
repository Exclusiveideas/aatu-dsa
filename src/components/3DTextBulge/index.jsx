'use client'

import { useRef, useMemo, useEffect, useState } from "react";

// 3D
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import './bulgeTxt.css';
import useHomeStore from "@/store/homeStore";
import { useDomToCanvas } from "@/utils/hooks/useDomToCanvas";


function Lights({ lightMode }) {
  const lightColor = lightMode ? '#fff' : '#000'

  return <ambientLight color={lightColor} intensity={5}/>;
}


function SceneComp({ lightMode }) {
  const state = useThree();
  const { width, height } = state.viewport;
  const [domEl, setDomEl] = useState(null);
  const [sceneReady, setSceneReady] = useState(false)
  const setIsSceneReady = useHomeStore((state) => state.setIsSceneReady);
  

  const materialRef = useRef();
  const textureDOM = useDomToCanvas(domEl, () => setSceneReady(true)); // Pass callback to signal readiness

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: textureDOM },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(1, 1, 1) }
    }),
    [textureDOM]
  );

  const mouseLerped = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (materialRef.current && sceneReady) {
      const mouse = state.mouse;
      mouseLerped.current.x = THREE.MathUtils.lerp(mouseLerped.current.x, mouse.x, 0.1);
      mouseLerped.current.y = THREE.MathUtils.lerp(mouseLerped.current.y, mouse.y, 0.1);
      materialRef.current.uniforms.uMouse.value.x = mouseLerped.current.x;
      materialRef.current.uniforms.uMouse.value.y = mouseLerped.current.y;
    }
  });

  useEffect(() => {
    setIsSceneReady(sceneReady)
  }, [sceneReady])
  
  
  

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={(el) => setDomEl(el)} className="dom-element">
          <p className="flex flex-col">
            Your Digital Portal <br />
            to Excellence
          </p>
        </div>
      </Html>
      {sceneReady && ( 
        <mesh>
          <planeGeometry args={[width, height, 254, 254]} />
          <CustomShaderMaterial
            ref={materialRef}
            baseMaterial={THREE.MeshStandardMaterial}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            flatShading
            transparent
          />
          <Lights lightMode={lightMode} />
        </mesh>
      )}
    </>
  );
}



const Scene = ({ lightMode }) => {
  return (
    <div className="parent-container">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <SceneComp lightMode={lightMode} />
      </Canvas>
    </div>
  )
}

export default Scene