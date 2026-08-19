import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register the ScrollTrigger plugin with GSAP once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Standard Minimal Neo-Brutalist entrance animation for sections and titles
 * Reveals with a crisp upward translation and subtle scale
 */
export const animateSectionHeading = (element) => {
  if (!element) return;
  
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 40,
      scale: 0.98,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

/**
 * Staggered fade and slide entrance for grid items (Project Cards, Skills, etc.)
 */
export const animateGridItems = (containerSelector, itemSelector, options = {}) => {
  return gsap.fromTo(
    itemSelector,
    {
      opacity: 0,
      y: 35,
      scale: 0.97,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: options.stagger || 0.06,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: containerSelector,
        start: options.start || "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
};

/**
 * Neo-Brutalist button hover timeline for interactive tactile feedback
 */
export const createButtonHoverTimeline = (element) => {
  if (!element) return null;

  const tl = gsap.timeline({ paused: true });
  tl.to(element, {
    x: -2,
    y: -2,
    boxShadow: "5px 5px 0px var(--neo-shadow)",
    duration: 0.15,
    ease: "power1.out",
  });

  return tl;
};

export { gsap, ScrollTrigger, useGSAP };
export default gsap;
