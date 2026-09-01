import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Clean up any stale existing oneko and footprint elements (especially from Vite HMR)
    const existingNeko = document.getElementById("oneko");
    if (existingNeko && existingNeko.parentNode) {
      existingNeko.parentNode.removeChild(existingNeko);
    }
    const existingFootprints = document.getElementById("neko-footprints");
    if (existingFootprints && existingFootprints.parentNode) {
      existingFootprints.parentNode.removeChild(existingFootprints);
    }

    // Footprints container
    const footprintContainer = document.createElement("div");
    footprintContainer.id = "neko-footprints";
    footprintContainer.setAttribute("aria-hidden", "true");
    footprintContainer.style.position = "fixed";
    footprintContainer.style.inset = "0";
    footprintContainer.style.pointerEvents = "none";
    footprintContainer.style.zIndex = "9999990";
    footprintContainer.style.overflow = "hidden";
    document.body.appendChild(footprintContainer);

    const pawTimeouts = new Set();
    let lastPawX = 64;
    let lastPawY = 64;
    let isLeftPaw = false;

    function createFootprint(x, y, angleDeg, scale = 1) {
      if (!footprintContainer || !footprintContainer.isConnected) return;

      const paw = document.createElement("div");
      paw.className = "neko-paw-print";
      paw.style.position = "absolute";
      paw.style.left = `${x}px`;
      paw.style.top = `${y}px`;
      paw.style.width = "14px";
      paw.style.height = "14px";
      paw.style.pointerEvents = "none";
      paw.style.userSelect = "none";
      paw.style.transformOrigin = "center center";
      paw.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) scale(${0.5 * scale})`;
      paw.style.opacity = "0.75";
      paw.style.transition = "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1.2s ease-out";
      paw.style.color = "var(--neo-accent, #6366f1)";
      paw.style.filter = "drop-shadow(0 1px 2px rgba(0,0,0,0.15))";

      // Cute stylized cat paw SVG (main pad + 4 toe beans)
      paw.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display:block; width:100%; height:100%;">
          <path d="M12 11.5 C9.2 11.5 7.8 13.8 7.8 16.2 C7.8 18.3 9.7 20 12 20 C14.3 20 16.2 18.3 16.2 16.2 C16.2 13.8 14.8 11.5 12 11.5 Z" />
          <circle cx="6.8" cy="9.2" r="1.9" />
          <circle cx="10.2" cy="6.6" r="1.9" />
          <circle cx="13.8" cy="6.6" r="1.9" />
          <circle cx="17.2" cy="9.2" r="1.9" />
        </svg>
      `;

      footprintContainer.appendChild(paw);

      // Pop in to full scale
      requestAnimationFrame(() => {
        paw.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) scale(${scale})`;
      });

      // Start fading out after delay
      const fadeTimeout = setTimeout(() => {
        paw.style.opacity = "0";
        paw.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) scale(${0.6 * scale})`;
      }, 1200);

      // Remove from DOM once fully faded
      const removeTimeout = setTimeout(() => {
        if (paw.parentNode) {
          paw.parentNode.removeChild(paw);
        }
        pawTimeouts.delete(fadeTimeout);
        pawTimeouts.delete(removeTimeout);
      }, 2400);

      pawTimeouts.add(fadeTimeout);
      pawTimeouts.add(removeTimeout);
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

    // Feline Hunting State Machine
    let huntingState = "none"; // "none" | "prep" | "leap" | "landing"
    let huntStartTime = 0;
    let huntStartX = 0;
    let huntStartY = 0;
    let huntTargetX = 0;
    let huntTargetY = 0;
    let lastPounceTime = 0;

    const POUNCE_COOLDOWN = 3500; // 3.5s cooldown between hunting pounces
    const PREP_DURATION = 380;    // 380ms smooth stealth crouch & tension
    const LEAP_DURATION = 320;    // 320ms snappy airborne leap
    const LANDING_DURATION = 350; // 350ms landing catch & recovery

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
    nekoEl.style.transformOrigin = "bottom center";
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
      huntingState = "none";

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

    // Global click listener to catch clicks right near the cat
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

    let lastSpriteUpdate = 0;
    let animationFrameId;

    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function getDirectionName(diffX, diffY, distance) {
      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      return direction || "idle";
    }

    function idle() {
      idleTime += 1;
      nekoEl.style.transform = "scale(1)";

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

    // Continuous 60fps animation update loop
    function updatePhysics() {
      const now = Date.now();

      // ========================================================
      // 1. HUNTING STATE: SMOOTH NATURAL STEALTH STALK & COIL
      // ========================================================
      if (huntingState === "prep") {
        const elapsed = now - huntStartTime;
        const progress = Math.min(1, elapsed / PREP_DURATION);

        // Smoothly creep forward into the stalk stance rather than freezing abruptly
        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const dist = Math.hypot(diffX, diffY) || 1;

        // Creep forward slowly (stalking speed 1.5px/frame with smooth deceleration)
        const stalkSpeed = (1 - progress) * 2.2;
        if (dist > 40) {
          nekoPosX -= (diffX / dist) * stalkSpeed;
          nekoPosY -= (diffY / dist) * stalkSpeed;
        }

        // Eyes locked on prey
        const dirName = getDirectionName(diffX, diffY, dist);
        setSprite(dirName !== "idle" ? dirName : "alert", 0);

        // Organic low stealth crouch: body lowers & widens smoothly
        const crouchRatio = Math.sin(progress * Math.PI * 0.5); // smooth ease-in-out
        const scaleX = 1 + 0.15 * crouchRatio;
        const scaleY = 1 - 0.20 * crouchRatio;
        const translateY = 2.5 * crouchRatio;

        // Subtle realistic hip settle (smooth single breath/sway, no high-frequency jitter)
        const hipSway = Math.sin(progress * Math.PI * 2) * (1.8 * crouchRatio);

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.transform = `scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}) translateY(${translateY.toFixed(1)}px) translateX(${hipSway.toFixed(1)}px)`;

        // Launch explosive jump
        if (elapsed >= PREP_DURATION) {
          huntingState = "leap";
          huntStartTime = now;
          huntStartX = nekoPosX;
          huntStartY = nekoPosY;
          huntTargetX = mousePosX;
          huntTargetY = mousePosY;

          const launchAngle = Math.atan2(huntTargetY - huntStartY, huntTargetX - huntStartX) * (180 / Math.PI) + 90;
          createFootprint(nekoPosX - 3, nekoPosY + 4, launchAngle, 1);
          createFootprint(nekoPosX + 3, nekoPosY + 4, launchAngle, 1);
        }
        return;
      }

      // ========================================================
      // 2. HUNTING STATE: 60FPS FLUID AIRBORNE LEAP
      // ========================================================
      if (huntingState === "leap") {
        const elapsed = now - huntStartTime;
        const progress = Math.min(1, elapsed / LEAP_DURATION);

        // Smooth cubic ease-out spring
        const easeOut = 1 - Math.pow(1 - progress, 2.4);

        nekoPosX = huntStartX + (huntTargetX - huntStartX) * easeOut;
        nekoPosY = huntStartY + (huntTargetY - huntStartY) * easeOut;

        // Parabolic jump arc in air (up to 32px height at peak)
        const jumpApex = -Math.sin(progress * Math.PI) * 32;

        const diffX = nekoPosX - huntTargetX;
        const diffY = nekoPosY - huntTargetY;
        const dist = Math.hypot(diffX, diffY) || 1;
        setSprite(getDirectionName(diffX, diffY, dist), Math.floor(progress * 4));

        // Smooth body stretch in flight
        const stretch = 1 + Math.sin(progress * Math.PI) * 0.22;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16 + jumpApex}px`;
        nekoEl.style.transform = `scale(${stretch.toFixed(3)}, ${(stretch * 0.95).toFixed(3)})`;

        // Landing impact on target
        if (progress >= 1) {
          huntingState = "landing";
          huntStartTime = now;
          nekoPosX = huntTargetX;
          nekoPosY = huntTargetY;
          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;

          // Landing squash
          nekoEl.style.transform = "scale(1.3, 0.7) translateY(4px)";
          const strikeAngle = Math.atan2(huntTargetY - huntStartY, huntTargetX - huntStartX) * (180 / Math.PI) + 90;
          createFootprint(nekoPosX - 5, nekoPosY + 4, strikeAngle, 1.15);
          createFootprint(nekoPosX + 5, nekoPosY + 4, strikeAngle, 1.15);

          playMeowSound();
          setSprite("scratchSelf", 0);
        }
        return;
      }

      // ========================================================
      // 3. HUNTING STATE: LANDING SQUASH & TRIUMPH RECOVERY
      // ========================================================
      if (huntingState === "landing") {
        const elapsed = now - huntStartTime;
        setSprite("scratchSelf", Math.floor(elapsed / 90));

        // Smooth bounce back from squash
        const recoveryProgress = Math.min(1, elapsed / 200);
        const scaleX = 1.3 - 0.3 * recoveryProgress;
        const scaleY = 0.7 + 0.3 * recoveryProgress;
        nekoEl.style.transform = `scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;

        if (elapsed >= LANDING_DURATION) {
          huntingState = "none";
          lastPounceTime = now;
          nekoEl.style.transform = "scale(1)";
          resetIdleAnimation();
        }
        return;
      }

      // ========================================================
      // 4. REGULAR CHASE & PATROL ENGINE
      // ========================================================
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // Check for organic hunting trigger when nearing cursor (55px - 110px range)
      const canHunt =
        distance >= 52 &&
        distance <= 110 &&
        now - lastPounceTime > POUNCE_COOLDOWN &&
        idleTime <= 2;

      if (canHunt) {
        huntingState = "prep";
        huntStartTime = now;
        huntStartX = nekoPosX;
        huntStartY = nekoPosY;
        huntTargetX = mousePosX;
        huntTargetY = mousePosY;
        idleTime = 0;
        return;
      }

      if (distance < nekoSpeed || distance < 48) {
        if (now - lastSpriteUpdate > 120) {
          lastSpriteUpdate = now;
          idle();
        }
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      // Step movement
      if (now - lastSpriteUpdate > 90) {
        lastSpriteUpdate = now;
        frameCount += 1;
        const direction = getDirectionName(diffX, diffY, distance);
        setSprite(direction, frameCount);

        const dirX = -(diffX / distance);
        const dirY = -(diffY / distance);

        nekoPosX += dirX * nekoSpeed;
        nekoPosY += dirY * nekoSpeed;

        nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
        nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.transform = "scale(1)";

        // Check distance traveled since last paw print
        const distSincePaw = Math.hypot(nekoPosX - lastPawX, nekoPosY - lastPawY);
        if (distSincePaw >= 24) {
          const angleDeg = Math.atan2(dirY, dirX) * (180 / Math.PI) + 90;
          const perpX = -dirY;
          const perpY = dirX;
          const sideOffset = isLeftPaw ? -5 : 5;
          isLeftPaw = !isLeftPaw;

          const spawnX = nekoPosX + perpX * sideOffset;
          const spawnY = (nekoPosY + 6) + perpY * sideOffset;

          lastPawX = nekoPosX;
          lastPawY = nekoPosY;

          createFootprint(spawnX, spawnY, angleDeg);
        }
      }
    }

    function onAnimationFrame() {
      if (!nekoEl.isConnected) return;
      updatePhysics();
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
      if (footprintContainer && footprintContainer.parentNode) {
        footprintContainer.parentNode.removeChild(footprintContainer);
      }
      pawTimeouts.forEach((id) => clearTimeout(id));
      pawTimeouts.clear();
    };
  }, []);

  return null;
}


