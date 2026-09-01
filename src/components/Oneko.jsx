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

    // Footprints and emote particles container
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

    // Spawns disappearing paw print
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
      paw.style.opacity = "0.85";
      paw.style.transition = "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1.2s ease-out";
      paw.style.color = "#ffffff";
      paw.style.filter = "drop-shadow(0 1px 2px rgba(0,0,0,0.35))";

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

    // Spawns cute floating emote bubbles (e.g. '!', '♥', 'z', '?')
    function spawnEmote(x, y, text, type = "default") {
      if (!footprintContainer || !footprintContainer.isConnected) return;

      const emote = document.createElement("div");
      emote.style.position = "absolute";
      emote.style.left = `${x}px`;
      emote.style.top = `${y - 14}px`;
      emote.style.pointerEvents = "none";
      emote.style.userSelect = "none";
      emote.style.fontFamily = "'Space Grotesk', system-ui, sans-serif";
      emote.style.fontWeight = "900";
      emote.style.fontSize = type === "sleep" ? "12px" : "14px";
      emote.style.lineHeight = "1";
      emote.style.padding = "2px 6px";
      emote.style.borderRadius = "999px";
      emote.style.transform = "translate(-50%, 0) scale(0.6)";
      emote.style.opacity = "0";
      emote.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out";
      emote.innerText = text;

      if (type === "alert") {
        emote.style.backgroundColor = "var(--neo-amber, #fbbf24)";
        emote.style.color = "#121212";
        emote.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      } else if (type === "love") {
        emote.style.backgroundColor = "var(--neo-rose, #fb7185)";
        emote.style.color = "#ffffff";
      } else if (type === "sleep") {
        emote.style.color = "var(--neo-accent, #818cf8)";
        emote.style.opacity = "0.85";
        emote.style.fontStyle = "italic";
      } else {
        emote.style.backgroundColor = "var(--neo-surface, #1e293b)";
        emote.style.color = "var(--neo-text, #f8fafc)";
        emote.style.border = "1px solid var(--neo-border, rgba(255,255,255,0.4))";
      }

      footprintContainer.appendChild(emote);

      requestAnimationFrame(() => {
        emote.style.opacity = "1";
        emote.style.transform = "translate(-50%, -20px) scale(1)";
      });

      const fadeTimeout = setTimeout(() => {
        emote.style.opacity = "0";
        emote.style.transform = "translate(-50%, -36px) scale(0.8)";
      }, 800);

      const removeTimeout = setTimeout(() => {
        if (emote.parentNode) {
          emote.parentNode.removeChild(emote);
        }
        pawTimeouts.delete(fadeTimeout);
        pawTimeouts.delete(removeTimeout);
      }, 1500);

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

    // Feline Behaviors State Machine
    let catState = "none"; 
    // "none" | "hunting_prep" | "hunting_leap" | "hunting_landing" | "scared_jump" | "scared_shuffle" | "scared_flee" | "hiding" | "tail_chase" | "rolling" | "batting"

    let actionStartTime = 0;
    let actionStartX = 0;
    let actionStartY = 0;
    let actionTargetX = 0;
    let actionTargetY = 0;
    let lastPounceTime = 0;
    let lastScaredTime = 0;
    let lastZzzTime = 0;

    // Mouse velocity tracker to detect sudden fast cursor movements (spooking the cat)
    let lastMouseTrackX = mousePosX;
    let lastMouseTrackY = mousePosY;
    let lastMouseTrackTime = Date.now();

    const POUNCE_COOLDOWN = 3500;
    const SCARED_COOLDOWN = 8000;

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
    nekoEl.title = "Click or play with me! 🐾";

    // Spiked Fur & Flared Bottlebrush Tail Overlay (Halloween Cat Piloerection Mode)
    const spikedFurEl = document.createElement("div");
    spikedFurEl.className = "neko-spiked-fur-overlay";
    spikedFurEl.style.position = "absolute";
    spikedFurEl.style.left = "-6px";
    spikedFurEl.style.top = "-8px";
    spikedFurEl.style.width = "44px";
    spikedFurEl.style.height = "44px";
    spikedFurEl.style.pointerEvents = "none";
    spikedFurEl.style.display = "none";
    spikedFurEl.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    spikedFurEl.innerHTML = `
      <svg viewBox="0 0 44 44" width="44" height="44" style="display:block; width:100%; height:100%;">
        <!-- Jagged Bristled Spine Spikes -->
        <path d="M9,22 L11,13 L14,17 L17,9 L20,15 L23,7 L26,14 L29,8 L32,16 L34,22" fill="none" stroke="var(--neo-text, #121212)" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" />
        <path d="M10,21 L12,14 L14,18 L17,11 L20,16 L23,9 L26,15 L29,10 L31,17 L33,21" fill="none" stroke="var(--neo-rose, #f43f5e)" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round" />
        <!-- Puffed Bottlebrush Spiky Tail -->
        <path d="M7,32 L2,29 L6,25 L1,22 L6,19 L2,15 L8,16" fill="none" stroke="var(--neo-text, #121212)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" />
        <path d="M7,31 L3,29 L6,26 L2,23 L6,20 L3,16 L7,17" fill="none" stroke="var(--neo-rose, #f43f5e)" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round" />
      </svg>
    `;
    nekoEl.appendChild(spikedFurEl);

    document.body.appendChild(nekoEl);

    function setSpikedFur(active) {
      if (active) {
        spikedFurEl.style.display = "block";
        spikedFurEl.style.opacity = "1";
      } else {
        spikedFurEl.style.opacity = "0";
        spikedFurEl.style.display = "none";
      }
    }

    // Audio instance for authentic cat meow
    function playMeowSound(vol = 0.85) {
      try {
        const sound = new Audio("/meow.wav");
        sound.volume = vol;
        const promise = sound.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      } catch {
        // Fallback silently if audio blocked
      }
    }

    function triggerCatInteraction() {
      playMeowSound(0.9);
      catState = "none";
      setSpikedFur(false);
      spawnEmote(nekoPosX, nekoPosY - 10, "♥", "love");

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

    // Direct click on Neko element
    const onNekoClick = (e) => {
      e.stopPropagation();
      triggerCatInteraction();
    };

    nekoEl.addEventListener("pointerdown", onNekoClick);
    nekoEl.addEventListener("click", onNekoClick);

    // Global click listener to catch nearby clicks (cat playfully bats at nearby click!)
    const onGlobalPointerDown = (e) => {
      const dist = Math.hypot(e.clientX - nekoPosX, e.clientY - nekoPosY);
      if (dist < 44) {
        triggerCatInteraction();
      } else if (dist < 130 && catState === "none" && idleTime > 0) {
        // Playful paw bat at nearby click
        catState = "batting";
        actionStartTime = Date.now();
        actionTargetX = e.clientX;
        actionTargetY = e.clientY;
        spawnEmote(actionTargetX, actionTargetY, "🐾", "play");
      }
    };

    window.addEventListener("pointerdown", onGlobalPointerDown);

    const onMouseMove = (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;

      const now = Date.now();
      const dt = now - lastMouseTrackTime;
      if (dt > 25) {
        const dX = mousePosX - lastMouseTrackX;
        const dY = mousePosY - lastMouseTrackY;
        const speed = Math.hypot(dX, dY);
        const distToCat = Math.hypot(mousePosX - nekoPosX, mousePosY - nekoPosY);

        // SUDDEN FAST FLICK NEAR CAT -> GET SCARED & BRISTLE UP!
        if (
          speed > 68 &&
          distToCat < 75 &&
          catState === "none" &&
          now - lastScaredTime > SCARED_COOLDOWN
        ) {
          triggerStartledBehavior();
        }

        lastMouseTrackX = mousePosX;
        lastMouseTrackY = mousePosY;
        lastMouseTrackTime = now;
      }
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

    // Trigger Startled, Spiked Fur & Crab-Walk Behavior
    function triggerStartledBehavior() {
      const now = Date.now();
      lastScaredTime = now;
      catState = "scared_jump";
      actionStartTime = now;
      actionStartX = nekoPosX;
      actionStartY = nekoPosY;

      // Enable the spiked bristled fur
      setSpikedFur(true);

      // Find nearest screen edge to flee and hide behind
      const distLeft = nekoPosX;
      const distRight = window.innerWidth - nekoPosX;
      const distTop = nekoPosY;
      const distBottom = window.innerHeight - nekoPosY;

      const minDist = Math.min(distLeft, distRight, distTop, distBottom);
      if (minDist === distLeft) {
        actionTargetX = 14;
        actionTargetY = nekoPosY;
      } else if (minDist === distRight) {
        actionTargetX = window.innerWidth - 14;
        actionTargetY = nekoPosY;
      } else if (minDist === distTop) {
        actionTargetX = nekoPosX;
        actionTargetY = 14;
      } else {
        actionTargetX = nekoPosX;
        actionTargetY = window.innerHeight - 14;
      }

      spawnEmote(nekoPosX, nekoPosY - 14, "!", "alert");
    }

    function idle() {
      idleTime += 1;
      const now = Date.now();

      // Emit gentle sleeping Zzz particles when taking a cat nap
      if (idleAnimation === "sleeping" && now - lastZzzTime > 1600) {
        lastZzzTime = now;
        spawnEmote(nekoPosX + 6, nekoPosY - 6, "z", "sleep");
      }

      // Natural Idle Personality Triggers
      if (idleTime > 8 && catState === "none") {
        const rand = Math.floor(Math.random() * 250);

        // 1. Tail Chasing Spin (1 in 250 idle frames) - Slow & Goofy
        if (rand === 1) {
          catState = "tail_chase";
          actionStartTime = now;
          actionStartX = nekoPosX;
          actionStartY = nekoPosY;
          return;
        }

        // 2. Playful Floor Roll & Belly Wiggle (1 in 250 idle frames)
        if (rand === 2) {
          catState = "rolling";
          actionStartTime = now;
          spawnEmote(nekoPosX, nekoPosY - 10, "♥", "love");
          return;
        }

        // 3. Spontaneous Wall Scratching / Loafing / Sleeping
        if (rand === 3 && idleAnimation == null) {
          const availableIdleAnimations = ["sleeping", "scratchSelf"];
          if (nekoPosX < 36) availableIdleAnimations.push("scratchWallW");
          if (nekoPosY < 36) availableIdleAnimations.push("scratchWallN");
          if (nekoPosX > window.innerWidth - 36) availableIdleAnimations.push("scratchWallE");
          if (nekoPosY > window.innerHeight - 36) availableIdleAnimations.push("scratchWallS");
          idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
        }
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

    // Continuous 60fps physics & behaviors engine
    function updatePhysics() {
      const now = Date.now();

      // ========================================================
      // 1. BEHAVIOR: TAIL CHASING (SLOWED DOWN, NATURAL CIRCLE)
      // ========================================================
      if (catState === "tail_chase") {
        const elapsed = now - actionStartTime;
        const duration = 3000; // Slowed down from 1.3s to 3.0s for clear, natural movement
        const progress = Math.min(1, elapsed / duration);

        // 2 full steady rotations over 3.0 seconds
        const angleRad = progress * Math.PI * 4;
        const radius = 13; // Wider, clearer pivot radius
        nekoPosX = actionStartX + Math.cos(angleRad) * radius;
        nekoPosY = actionStartY + Math.sin(angleRad) * radius;

        // Smooth 130ms sprite cycling around 8 directions
        const directions = ["E", "SE", "S", "SW", "W", "NW", "N", "NE"];
        const dirIndex = Math.floor((angleRad / (Math.PI * 2)) * 8) % 8;
        setSprite(directions[dirIndex], Math.floor(elapsed / 130));

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.transform = `scale(1.02)`;

        // Ring of tiny paw footprints evenly spaced
        if (Math.floor(elapsed / 220) !== Math.floor((elapsed - 16) / 220)) {
          createFootprint(nekoPosX, nekoPosY + 4, (angleRad * 180) / Math.PI + 90, 0.75);
        }

        if (progress >= 1) {
          catState = "none";
          setSprite("alert", 0);
          spawnEmote(nekoPosX, nekoPosY - 10, "?", "default");
          nekoEl.style.transform = "scale(1)";
          resetIdleAnimation();
        }
        return;
      }

      // ========================================================
      // 2. BEHAVIOR: PLAYFUL FLOOR ROLL & BELLY WIGGLE
      // ========================================================
      if (catState === "rolling") {
        const elapsed = now - actionStartTime;
        const duration = 1200;
        const progress = Math.min(1, elapsed / duration);

        const rollWiggle = Math.sin(progress * Math.PI * 4) * 25;
        const squash = 1 + Math.sin(progress * Math.PI) * 0.15;

        setSprite("scratchSelf", Math.floor(elapsed / 110));
        nekoEl.style.transform = `scale(${squash}, ${2 - squash}) translateY(3px) rotate(${rollWiggle.toFixed(1)}deg)`;

        if (progress >= 1) {
          catState = "none";
          nekoEl.style.transform = "scale(1)";
          setSprite("idle", 0);
          resetIdleAnimation();
        }
        return;
      }

      // ========================================================
      // 3. BEHAVIOR: PLAYFUL PAW BAT AT NEARBY CLICK
      // ========================================================
      if (catState === "batting") {
        const elapsed = now - actionStartTime;
        const duration = 380;
        const progress = Math.min(1, elapsed / duration);

        const diffX = nekoPosX - actionTargetX;
        const diffY = nekoPosY - actionTargetY;
        const dist = Math.hypot(diffX, diffY) || 1;
        setSprite(getDirectionName(diffX, diffY, dist), Math.floor(elapsed / 60));

        const batArc = Math.sin(progress * Math.PI) * 14;
        nekoEl.style.transform = `scale(1.2, 0.85) translate(${-(diffX / dist) * batArc}px, ${-(diffY / dist) * batArc}px)`;

        if (progress >= 1) {
          catState = "none";
          nekoEl.style.transform = "scale(1)";
          resetIdleAnimation();
        }
        return;
      }

      // ========================================================
      // 4. BEHAVIOR: SPIKED-FUR HALLOWEEN CAT JUMP & CRAB-WALK
      // ========================================================
      if (catState === "scared_jump") {
        const elapsed = now - actionStartTime;
        const duration = 320;
        const progress = Math.min(1, elapsed / duration);

        // High arched-back vertical startled leap with spiked fur
        const jumpY = -Math.sin(progress * Math.PI) * 28;
        setSprite("alert", 0);
        nekoEl.style.top = `${actionStartY - 16 + jumpY}px`;
        // Deep arched back + stiff extended legs (Halloween cat posture)
        nekoEl.style.transform = `scale(0.85, 1.45)`;

        if (progress >= 1) {
          catState = "scared_shuffle";
          actionStartTime = now;
        }
        return;
      }

      // Sideways stiff-legged crab-hop shuffle
      if (catState === "scared_shuffle") {
        const elapsed = now - actionStartTime;
        const duration = 500;
        const progress = Math.min(1, elapsed / duration);

        const crabHop = Math.sin(progress * Math.PI * 4) * 4;
        const crabSide = (actionTargetX > nekoPosX ? 1 : -1) * (progress * 16);

        nekoPosX = actionStartX + crabSide;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.transform = `scale(0.85, 1.45) translateY(${crabHop.toFixed(1)}px)`;

        if (progress >= 1) {
          catState = "scared_flee";
          actionStartTime = now;
          actionStartX = nekoPosX;
          actionStartY = nekoPosY;
        }
        return;
      }

      if (catState === "scared_flee") {
        const elapsed = now - actionStartTime;
        const diffX = nekoPosX - actionTargetX;
        const diffY = nekoPosY - actionTargetY;
        const dist = Math.hypot(diffX, diffY);

        // Sprint to nearest hiding wall with puffed tail
        const fleeSpeed = 16;
        if (dist > fleeSpeed) {
          nekoPosX -= (diffX / dist) * fleeSpeed;
          nekoPosY -= (diffY / dist) * fleeSpeed;
          const dir = getDirectionName(diffX, diffY, dist);
          setSprite(dir, Math.floor(elapsed / 50));
          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;
          nekoEl.style.transform = "scale(1.15, 0.95)";
          createFootprint(nekoPosX, nekoPosY + 4, Math.atan2(-diffY, -diffX) * (180 / Math.PI) + 90, 0.9);
        } else {
          // Reached wall: enter hiding / peeking stance
          catState = "hiding";
          actionStartTime = now;
          nekoPosX = actionTargetX;
          nekoPosY = actionTargetY;
          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;
        }
        return;
      }

      if (catState === "hiding") {
        const elapsed = now - actionStartTime;
        const duration = 2400;

        // Partially hide off-screen, peeking ears/eyes out cautiously
        setSprite("alert", 0);
        nekoEl.style.transform = `scale(0.9, 0.9) translateY(12px)`;

        // Spikes smooth down while safe in hiding
        if (elapsed > 800) {
          setSpikedFur(false);
        }

        if (elapsed > 1200 && elapsed < 1800) {
          setSprite("tired", 0);
        }

        // Coast is clear: return to normal
        if (elapsed >= duration) {
          catState = "none";
          setSpikedFur(false);
          nekoEl.style.transform = "scale(1)";
          setSprite("idle", 0);
          resetIdleAnimation();
        }
        return;
      }

      // ========================================================
      // 5. BEHAVIOR: HUNTING STALK, CROUCH & JUMP
      // ========================================================
      if (catState === "hunting_prep") {
        const elapsed = now - actionStartTime;
        const progress = Math.min(1, elapsed / 380);

        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const dist = Math.hypot(diffX, diffY) || 1;

        // Creep forward slowly in stalk stance
        const stalkSpeed = (1 - progress) * 2.2;
        if (dist > 40) {
          nekoPosX -= (diffX / dist) * stalkSpeed;
          nekoPosY -= (diffY / dist) * stalkSpeed;
        }

        const dirName = getDirectionName(diffX, diffY, dist);
        setSprite(dirName !== "idle" ? dirName : "alert", 0);

        const crouchRatio = Math.sin(progress * Math.PI * 0.5);
        const scaleX = 1 + 0.15 * crouchRatio;
        const scaleY = 1 - 0.20 * crouchRatio;
        const translateY = 2.5 * crouchRatio;
        const hipSway = Math.sin(progress * Math.PI * 2) * (1.8 * crouchRatio);

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.transform = `scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}) translateY(${translateY.toFixed(1)}px) translateX(${hipSway.toFixed(1)}px)`;

        if (elapsed >= 380) {
          catState = "hunting_leap";
          actionStartTime = now;
          actionStartX = nekoPosX;
          actionStartY = nekoPosY;
          actionTargetX = mousePosX;
          actionTargetY = mousePosY;

          const launchAngle = Math.atan2(actionTargetY - actionStartY, actionTargetX - actionStartX) * (180 / Math.PI) + 90;
          createFootprint(nekoPosX - 3, nekoPosY + 4, launchAngle, 1);
          createFootprint(nekoPosX + 3, nekoPosY + 4, launchAngle, 1);
        }
        return;
      }

      if (catState === "hunting_leap") {
        const elapsed = now - actionStartTime;
        const progress = Math.min(1, elapsed / 320);

        const easeOut = 1 - Math.pow(1 - progress, 2.4);
        nekoPosX = actionStartX + (actionTargetX - actionStartX) * easeOut;
        nekoPosY = actionStartY + (actionTargetY - actionStartY) * easeOut;

        const jumpApex = -Math.sin(progress * Math.PI) * 32;
        const diffX = nekoPosX - actionTargetX;
        const diffY = nekoPosY - actionTargetY;
        const dist = Math.hypot(diffX, diffY) || 1;
        setSprite(getDirectionName(diffX, diffY, dist), Math.floor(progress * 4));

        const stretch = 1 + Math.sin(progress * Math.PI) * 0.22;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16 + jumpApex}px`;
        nekoEl.style.transform = `scale(${stretch.toFixed(3)}, ${(stretch * 0.95).toFixed(3)})`;

        if (progress >= 1) {
          catState = "hunting_landing";
          actionStartTime = now;
          nekoPosX = actionTargetX;
          nekoPosY = actionTargetY;
          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;

          nekoEl.style.transform = "scale(1.3, 0.7) translateY(4px)";
          const strikeAngle = Math.atan2(actionTargetY - actionStartY, actionTargetX - actionStartX) * (180 / Math.PI) + 90;
          createFootprint(nekoPosX - 5, nekoPosY + 4, strikeAngle, 1.15);
          createFootprint(nekoPosX + 5, nekoPosY + 4, strikeAngle, 1.15);

          playMeowSound();
          setSprite("scratchSelf", 0);
        }
        return;
      }

      if (catState === "hunting_landing") {
        const elapsed = now - actionStartTime;
        setSprite("scratchSelf", Math.floor(elapsed / 90));

        const recoveryProgress = Math.min(1, elapsed / 200);
        const scaleX = 1.3 - 0.3 * recoveryProgress;
        const scaleY = 0.7 + 0.3 * recoveryProgress;
        nekoEl.style.transform = `scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;

        if (elapsed >= 350) {
          catState = "none";
          lastPounceTime = now;
          nekoEl.style.transform = "scale(1)";
          resetIdleAnimation();
        }
        return;
      }

      // ========================================================
      // 6. REGULAR CHASE & PATROL ENGINE
      // ========================================================
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // Check for organic hunting trigger when nearing cursor (52px - 110px range)
      const canHunt =
        distance >= 52 &&
        distance <= 110 &&
        now - lastPounceTime > POUNCE_COOLDOWN &&
        idleTime <= 2;

      if (canHunt) {
        catState = "hunting_prep";
        actionStartTime = now;
        actionStartX = nekoPosX;
        actionStartY = nekoPosY;
        actionTargetX = mousePosX;
        actionTargetY = mousePosY;
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

      // Continuous movement
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
