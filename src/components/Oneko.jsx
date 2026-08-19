import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Clean up any stale existing oneko elements (especially from Vite HMR)
    const existing = document.getElementById("oneko");
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    const nekoEl = document.createElement("div");
    let nekoPosX = 64;
    let nekoPosY = 64;

    let mousePosX = window.innerWidth / 2;
    let mousePosY = window.innerHeight / 2;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;

    const nekoSpeed = 10;
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

    nekoEl.id = "oneko";
    nekoEl.setAttribute("aria-hidden", "true");
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "pointer";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = "9999999";
    nekoEl.style.backgroundImage = "url('/oneko.gif')";
    nekoEl.style.backgroundRepeat = "no-repeat";
    nekoEl.style.transition = "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    nekoEl.title = "Click me! 🐾";

    document.body.appendChild(nekoEl);

    // Audio instance for authentic, cute cat meow
    function playMeowSound() {
      try {
        const sound = new Audio("/meow.wav");
        sound.volume = 0.85;
        const promise = sound.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      } catch {
        // Fallback silently if audio blocked
      }
    }

    function triggerCatInteraction() {
      playMeowSound();

      // Bounce & Alert animation on the cat
      nekoEl.style.transform = "scale(1.45) translateY(-10px)";
      setSprite("alert", 0);
      idleAnimation = "scratchSelf";
      idleAnimationFrame = 0;
      idleTime = 0;

      setTimeout(() => {
        nekoEl.style.transform = "scale(1)";
      }, 250);
    }

    // Direct click/pointerdown on Neko element
    const onNekoClick = (e) => {
      e.stopPropagation();
      triggerCatInteraction();
    };

    nekoEl.addEventListener("pointerdown", onNekoClick);
    nekoEl.addEventListener("click", onNekoClick);

    // Global click listener to catch clicks right near the cat (generous 44px proximity hitbox)
    const onGlobalPointerDown = (e) => {
      const dist = Math.hypot(e.clientX - nekoPosX, e.clientY - nekoPosY);
      if (dist < 44) {
        triggerCatInteraction();
      }
    };

    window.addEventListener("pointerdown", onGlobalPointerDown);

    const onMouseMove = (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    const onTouchMove = (event) => {
      if (event.touches.length > 0) {
        mousePosX = event.touches[0].clientX;
        mousePosY = event.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let lastFrameTimestamp;
    let animationFrameId;

    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      // Random idle actions
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");
        idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        // count down after being alerted before moving
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction || "idle", frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    function onAnimationFrame(timestamp) {
      if (!nekoEl.isConnected) return;
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      animationFrameId = window.requestAnimationFrame(onAnimationFrame);
    }

    animationFrameId = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      nekoEl.removeEventListener("pointerdown", onNekoClick);
      nekoEl.removeEventListener("click", onNekoClick);
      window.removeEventListener("pointerdown", onGlobalPointerDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      if (nekoEl && nekoEl.parentNode) {
        nekoEl.parentNode.removeChild(nekoEl);
      }
    };
  }, []);

  return null;
}
