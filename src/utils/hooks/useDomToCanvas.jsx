
import html2canvas from "html2canvas";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import * as THREE from "three";

export const useDomToCanvas = (domEl, onReady) => {
  const [texture, setTexture] = useState();
  
  const convertDomToCanvas = useCallback(async () => {
    if (!domEl) return; 
    const canvas = await html2canvas(domEl, { backgroundColor: null });
    setTexture(new THREE.CanvasTexture(canvas));
    if (onReady) onReady();
  }, [domEl, onReady]);

  
  const debouncedResize = useCallback(
    debounce(() => {
      convertDomToCanvas();
    }, 100),
    [convertDomToCanvas]
  );

  useEffect(() => {
    if (!domEl || !window) return;

    convertDomToCanvas(); // Initial conversion

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);

  return texture;
};