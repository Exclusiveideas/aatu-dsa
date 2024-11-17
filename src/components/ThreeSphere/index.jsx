'use client';

import { Canvas } from "@react-three/offscreen";
import { lazy, Suspense } from "react";
import { useMediaQuery } from "usehooks-ts";
import './threeSphere.css';


const Experiment = lazy(() => import("./experiment"));

const worker = new Worker(new URL("./worker.jsx", import.meta.url), {
  type: "module",
});

const ThreeSphere = () => {
  const isTablet = useMediaQuery("(max-width: 1199px)");

  return (
    <div className="canvas-wrapper">
      <Suspense>
        <Canvas
          worker={worker}
          fallback={<Experiment />}
          camera={{
            position: [0, 0, isTablet ? 9 : 6],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
          gl={{ alpha: true }}
        />
      </Suspense>
    </div>
  );
};

export default ThreeSphere;