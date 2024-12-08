import { useEffect, useRef, useState } from "react";
import "./loadingScreen.css";
import useHomeStore from "@/store/homeStore";
import Image from "next/image";
import LinearProgress from '@mui/material/LinearProgress';
import gsap from "gsap";
 
const LoadingScreen = () => {
  const [counter, setCounter] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const intervalIdRef = useRef(null);
  const loaderRef = useRef(null);
  const logoRef = useRef(null);

  const isSceneReady = useHomeStore((state) => state.isSceneReady);
  const setUnMountLoadingScreen = useHomeStore((state) => state.setUnMountLoadingScreen);
  

  useEffect(() => {
    if (counter >= 100) {
      clearInterval(intervalIdRef.current)
      return
    }; 

    intervalIdRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(intervalIdRef.current);
          setHasRun(true);
          return 100;
        }

        // Pause the interval if counter exceeds 50 and the scene is not ready
        if (prev > 50 && !isSceneReady) {
          clearInterval(intervalIdRef.current);
          return prev;
        }

        // Logic to make the counter start fast, slow down, and speed up again
        const remaining = 100 - prev;
        const increment = Math.max(1, Math.floor(remaining / 10));

        return prev + increment;
      });
    }, 100);

    return () => clearInterval(intervalIdRef.current);
  }, [isSceneReady]);

  useEffect(() => {
    if (!hasRun) return;

    let loaderAnimContext;

    const timeoutId = setTimeout(() => {
      loaderAnimContext = gsap.context(() => {
        gsap.set(loaderRef.current, { y: "0%", filter: 'blur(0px)', opacity: 1 });
        gsap.to(loaderRef.current, {
          y: "-110%",
          filter: 'blur(20px)',
          opacity: 0.6,
          duration: 2.5,
          ease: "expo.out",
          onComplete: () => {
            unMountLoadingScreen()
          }
        });
      }, loaderRef);
    }, 1300);

    return () => {
      if (loaderAnimContext && hasRun) {
        loaderAnimContext.revert();
      }
      clearTimeout(timeoutId);
    };
  }, [hasRun, loaderRef]);

  
  const unMountLoadingScreen = () => {
    setUnMountLoadingScreen(true)
  }



  return (
    <div ref={loaderRef} className={`loadingScreen`}>
      <div className="imgWrapper">
        <Image
          src="/imgs/logo.png"
          width={300}
          height={140}
          alt="tech-u logo"
          className="loader_logo"
          ref={logoRef}
        />
        <div className="loader"></div>
      </div>
      <div className="progressBox">
       <LinearProgress  variant="determinate" value={counter} />
      </div>
    </div>
  );
};

export default LoadingScreen;
