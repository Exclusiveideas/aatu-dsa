import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export function scaleNewsContainer(newsSectionRef, animationCompleted, animationReversing) {
  const duration = 0.4,
    ease = CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1 ");

  if (animationCompleted & !animationReversing) {
    gsap.to(newsSectionRef?.current, {
      scale: 1,
      ease: ease,
      duration: duration,
    });
  } else if (animationReversing && !animationCompleted) {
    gsap.to(newsSectionRef?.current, {
      scale: 0.9,
      ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1 "),
      duration: duration,
    });
  }
}
