import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Function to handle creating skew animations
export const createSkewAnimation = (container) => {
  if (!container) return;

  const gridItems = container.querySelectorAll(".grid__item");

  gridItems.forEach((item) => {
    let skewSetter = gsap.quickSetter(item, "skewY", "deg"),
      proxy = { skew: 0 },
      clamp = gsap.utils.clamp(-6, 6); // don't let the skew go beyond 6 degrees.

    gsap.set(item, { transformOrigin: "right center", force3D: true });

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
  });
};
