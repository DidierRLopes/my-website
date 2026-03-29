import React, { useRef, useEffect, useState } from "react";

type Power = "icebeam" | "psystrike" | "recover";

const POWER_INFO: Record<Power, { name: string; color: string; text: string; trigger: string }> = {
  icebeam: { name: "Ice Beam", color: "#8cddff", text: "Freeze!", trigger: "Freezes all pokeballs with ice shards, slowing them to a crawl" },
  psystrike: { name: "Psystrike", color: "#a855f7", text: "Psystrike!", trigger: "Expanding purple shockwave destroys every pokeball on screen" },
  recover: { name: "Recover", color: "#4ade80", text: "+1 Life", trigger: "Restores a life with healing particles (when lives < 2)" },
};

const POWERS: Power[] = ["icebeam", "psystrike", "recover"];


export default function MilestonePowers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePower, setActivePower] = useState<Power>("icebeam");
  const stateRef = useRef({
    power: "icebeam" as Power,
    startTime: 0,
    animId: 0,
    tangrowthImg: null as HTMLImageElement | null,
    mewtwoImg: null as HTMLImageElement | null,
    mewtwoArmImg: null as HTMLImageElement | null,
    pokeballImg: null as HTMLImageElement | null,
    balls: [] as { x: number; y: number; vy: number; vx: number; size: number; rot: number; alive: boolean }[],
  });

  useEffect(() => {
    const s = stateRef.current;
    const t = new Image(); t.src = "/img/tangrowth.png"; s.tangrowthImg = t;
    const m = new Image(); m.src = "/img/mewtwo.png"; s.mewtwoImg = m;
    const a = new Image(); a.src = "/img/mewtwo_arm.png"; s.mewtwoArmImg = a;
    const p = new Image(); p.src = "/img/pokeballs/pokeball.png"; s.pokeballImg = p;
  }, []);

  useEffect(() => {
    stateRef.current.power = activePower;
    stateRef.current.startTime = performance.now();
  }, [activePower]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    state.startTime = performance.now();

    const W = canvas.width;
    const H = canvas.height;

    function draw(time: number) {
      const elapsed = time - state.startTime;
      const loopDuration = 4000;
      const t = (elapsed % loopDuration) / loopDuration;
      const info = POWER_INFO[state.power];

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 137 + 50) % W);
        const sy = ((i * 97 + 30) % (H * 0.8));
        ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.1 * Math.sin(time * 0.001 + i)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // Earth curve
      ctx.beginPath();
      ctx.ellipse(W / 2, H + 50, W * 0.7, 100, 0, Math.PI, 0);
      ctx.fillStyle = "#1a4a2a";
      ctx.fill();
      ctx.strokeStyle = "#2a6a3a";
      ctx.lineWidth = 2;
      ctx.stroke();

      const cx = W / 2;
      const cy = H * 0.52;
      const BODY_SIZE = 110;

      // Spawn & update dropping pokeballs
      if (state.power !== "recover") {
        // Pre-spawn balls at mid-screen on loop reset so effects have targets
        if (t < 0.015 && state.balls.length === 0) {
          const preSpawnCount = 8;
          for (let i = 0; i < preSpawnCount; i++) {
            // Scatter across the upper half, already mid-flight
            const bx = 60 + Math.random() * (W - 120);
            const by = 30 + Math.random() * (cy * 0.7);
            const angle = Math.atan2(cy - by, cx - bx);
            const spd = 0.3 + Math.random() * 0.3;
            state.balls.push({
              x: bx, y: by,
              vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
              size: 22 + Math.random() * 10,
              rot: Math.random() * Math.PI * 2,
              alive: true,
            });
          }
        }

        // Also spawn new balls over time
        const spawnInterval = 600;
        const spawnPhase = Math.floor(elapsed / spawnInterval);
        while (state.balls.length < Math.min(spawnPhase + 8, 14)) {
          const side = Math.random();
          let bx: number, by: number, bvx: number, bvy: number;
          if (side < 0.6) {
            bx = 40 + Math.random() * (W - 80);
            by = -20;
            const angle = Math.atan2(cy - by, cx - bx);
            bvx = Math.cos(angle) * 0.4;
            bvy = Math.sin(angle) * 0.4;
          } else if (side < 0.8) {
            bx = -20;
            by = Math.random() * cy * 0.5;
            const angle = Math.atan2(cy - by, cx - bx);
            bvx = Math.cos(angle) * 0.4;
            bvy = Math.sin(angle) * 0.4;
          } else {
            bx = W + 20;
            by = Math.random() * cy * 0.5;
            const angle = Math.atan2(cy - by, cx - bx);
            bvx = Math.cos(angle) * 0.4;
            bvy = Math.sin(angle) * 0.4;
          }
          state.balls.push({
            x: bx, y: by, vx: bvx, vy: bvy,
            size: 22 + Math.random() * 10,
            rot: Math.random() * Math.PI * 2,
            alive: true,
          });
        }

        // Update ball positions
        for (const b of state.balls) {
          if (!b.alive) continue;
          // Ice beam: freeze balls after a short delay so reader sees them moving first
          if (state.power === "icebeam" && t > 0.15) {
            b.vx *= 0.95;
            b.vy *= 0.95;
          }
          b.x += b.vx;
          b.y += b.vy;
          b.rot += 0.02;

          // Psystrike: destroy when wave reaches (delayed start so balls are visible)
          if (state.power === "psystrike" && t > 0.12) {
            const dist = Math.hypot(b.x - cx, b.y - cy);
            const maxR = Math.max(W, H) * 1.2;
            const expandProgress = Math.min((t - 0.12) / 0.25, 1);
            if (dist < maxR * expandProgress) b.alive = false;
          }
        }

        // Draw alive balls
        if (state.pokeballImg?.complete) {
          for (const b of state.balls) {
            if (!b.alive) continue;
            ctx.save();
            ctx.translate(b.x, b.y);
            ctx.rotate(b.rot);

            ctx.drawImage(state.pokeballImg, -b.size / 2, -b.size / 2, b.size, b.size);

            // Frost coating for ice beam
            if (state.power === "icebeam" && t > 0.08) {
              const iceAlpha = Math.min(1, (t - 0.08) * 5);
              ctx.globalAlpha = iceAlpha * 0.4;
              ctx.fillStyle = "rgba(180, 220, 255, 0.6)";
              ctx.beginPath();
              ctx.arc(0, 0, b.size / 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            ctx.restore();
          }
        }
      }

      // Reset balls on loop
      if (t < 0.02) {
        state.balls = [];
      }

      // Draw Mewtwo body
      if (state.mewtwoImg?.complete) {
        ctx.drawImage(state.mewtwoImg, cx - BODY_SIZE / 2, cy - BODY_SIZE / 2, BODY_SIZE, BODY_SIZE);
      }

      // Draw Mewtwo arm (pointing in beam direction for hyperbeam, else left)
      if (state.mewtwoArmImg?.complete) {
        const armSize = BODY_SIZE * 0.5;
        const pivotX = cx + 0.024 * BODY_SIZE;
        const pivotY = cy + 0.38 * BODY_SIZE - BODY_SIZE / 2;
        const armRotation = -Math.PI - Math.PI - 0.2;
        ctx.save();
        ctx.translate(pivotX, pivotY);
        ctx.rotate(armRotation);
        ctx.drawImage(state.mewtwoArmImg, -armSize / 2, -armSize / 2, armSize, armSize);
        ctx.restore();
      }

      // Draw effect
      switch (state.power) {
        case "icebeam": {
          const effectStart = 0.15; // delay so balls are visible first
          const effectT = Math.max(0, t - effectStart);
          const fadeIn = Math.min(1, effectT * 6);
          const fadeOut = t > 0.8 ? (1 - t) / 0.2 : 1;
          const intensity = t < effectStart ? 0 : fadeIn * Math.max(0, fadeOut);

          // Ice beam rays - tapered beams like the real game
          const rayDuration = 0.2;
          if (effectT > 0 && effectT < rayDuration) {
            const rayProgress = effectT / rayDuration;
            const rayAlpha = rayProgress < 0.7 ? 1 : 1 - (rayProgress - 0.7) / 0.3;
            const rayLength = Math.max(W, H) * 1.2 * Math.min(rayProgress / 0.3, 1);
            const numRays = 12;

            ctx.save();
            ctx.globalAlpha = rayAlpha * 0.7;
            for (let i = 0; i < numRays; i++) {
              const rayAngle = (i / numRays) * Math.PI * 2 + Math.sin(i * 1.7) * 0.15;
              const endX = cx + Math.cos(rayAngle) * rayLength;
              const endY = cy + Math.sin(rayAngle) * rayLength;
              const perpAngle = rayAngle + Math.PI / 2;
              const originHalf = 3;
              const endHalf = 6 + (i % 3) * 2;

              ctx.beginPath();
              ctx.moveTo(cx + Math.cos(perpAngle) * originHalf, cy + Math.sin(perpAngle) * originHalf);
              ctx.lineTo(endX + Math.cos(perpAngle) * endHalf, endY + Math.sin(perpAngle) * endHalf);
              ctx.lineTo(endX - Math.cos(perpAngle) * endHalf, endY - Math.sin(perpAngle) * endHalf);
              ctx.lineTo(cx - Math.cos(perpAngle) * originHalf, cy - Math.sin(perpAngle) * originHalf);
              ctx.closePath();

              const rayGrad = ctx.createLinearGradient(cx, cy, endX, endY);
              rayGrad.addColorStop(0, "rgba(140, 220, 255, 0.9)");
              rayGrad.addColorStop(0.3, "rgba(180, 240, 255, 0.6)");
              rayGrad.addColorStop(0.7, "rgba(200, 245, 255, 0.25)");
              rayGrad.addColorStop(1, "rgba(220, 250, 255, 0)");
              ctx.fillStyle = rayGrad;
              ctx.fill();
            }

            // Central burst glow
            const burstGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
            burstGrad.addColorStop(0, `rgba(220, 245, 255, ${rayAlpha * 0.8})`);
            burstGrad.addColorStop(0.5, `rgba(160, 220, 255, ${rayAlpha * 0.3})`);
            burstGrad.addColorStop(1, "rgba(160, 220, 255, 0)");
            ctx.fillStyle = burstGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 60, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Screen flash
          if (t < 0.08) {
            ctx.save();
            ctx.fillStyle = `rgba(200, 240, 255, ${0.6 * (1 - t / 0.08)})`;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();
          }

          // Frozen overlay
          ctx.save();
          ctx.fillStyle = `rgba(180, 220, 245, ${0.12 * intensity})`;
          ctx.fillRect(0, 0, W, H);
          ctx.restore();

          // Frost vignette
          if (intensity > 0) {
            ctx.save();
            const vigGrad = ctx.createRadialGradient(cx, H / 2, Math.min(W, H) * 0.15, cx, H / 2, Math.max(W, H) * 0.6);
            vigGrad.addColorStop(0, "rgba(180, 230, 255, 0)");
            vigGrad.addColorStop(0.6, `rgba(150, 210, 245, ${0.08 * intensity})`);
            vigGrad.addColorStop(1, `rgba(120, 180, 230, ${0.35 * intensity})`);
            ctx.fillStyle = vigGrad;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Frost borders
            ctx.save();
            ctx.globalAlpha = intensity * 0.5;
            const borderSize = 30;
            for (const [gx1, gy1, gx2, gy2, rx, ry, rw, rh] of [
              [0, 0, 0, borderSize, 0, 0, W, borderSize],
              [0, H, 0, H - borderSize, 0, H - borderSize, W, borderSize],
              [0, 0, borderSize, 0, 0, 0, borderSize, H],
              [W, 0, W - borderSize, 0, W - borderSize, 0, borderSize, H],
            ] as [number, number, number, number, number, number, number, number][]) {
              const grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
              grad.addColorStop(0, "rgba(200, 235, 255, 0.7)");
              grad.addColorStop(1, "rgba(200, 235, 255, 0)");
              ctx.fillStyle = grad;
              ctx.fillRect(rx, ry, rw, rh);
            }
            ctx.restore();
          }

          // Ice shards on frozen balls
          if (intensity > 0) {
            for (const fb of state.balls.filter(b => b.alive)) {
              ctx.save();
              ctx.globalAlpha = intensity;

              // Outer icy glow
              const pulseScale = 1 + Math.sin(time * 0.003) * 0.1;
              const glowR = fb.size * 0.9 * pulseScale;
              const glowGrad = ctx.createRadialGradient(fb.x, fb.y, fb.size * 0.25, fb.x, fb.y, glowR);
              glowGrad.addColorStop(0, "rgba(140, 210, 255, 0.4)");
              glowGrad.addColorStop(0.6, "rgba(160, 220, 255, 0.15)");
              glowGrad.addColorStop(1, "rgba(160, 220, 255, 0)");
              ctx.fillStyle = glowGrad;
              ctx.beginPath();
              ctx.arc(fb.x, fb.y, glowR, 0, Math.PI * 2);
              ctx.fill();

              // Ice shards
              for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + Math.sin(time * 0.002 + i * 2.7) * 0.08;
                const innerR = fb.size * 0.38;
                const outerR = fb.size * (0.55 + (i % 3) * 0.12) + Math.sin(time * 0.003 + i) * 2;
                const halfWidth = (2 + (i % 2) * 1.5) * (Math.PI / 180) * innerR;
                const ix = fb.x + Math.cos(angle) * innerR;
                const iy = fb.y + Math.sin(angle) * innerR;
                const ox = fb.x + Math.cos(angle) * outerR;
                const oy = fb.y + Math.sin(angle) * outerR;
                const perpA = angle + Math.PI / 2;

                ctx.beginPath();
                ctx.moveTo(ix - Math.cos(perpA) * halfWidth, iy - Math.sin(perpA) * halfWidth);
                ctx.lineTo(ox, oy);
                ctx.lineTo(ix + Math.cos(perpA) * halfWidth, iy + Math.sin(perpA) * halfWidth);
                ctx.closePath();
                const shardGrad = ctx.createLinearGradient(ix, iy, ox, oy);
                shardGrad.addColorStop(0, "rgba(160, 215, 250, 0.7)");
                shardGrad.addColorStop(0.6, "rgba(210, 240, 255, 0.85)");
                shardGrad.addColorStop(1, "rgba(255, 255, 255, 0.95)");
                ctx.fillStyle = shardGrad;
                ctx.fill();
                ctx.strokeStyle = "rgba(120, 190, 240, 0.5)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }

              // Sparkle dots
              for (let i = 0; i < 4; i++) {
                const angle = (i / 4) * Math.PI * 2 + time * 0.001;
                const dist = fb.size * (0.6 + Math.sin(time * 0.005 + i * 3) * 0.1);
                ctx.beginPath();
                ctx.arc(fb.x + Math.cos(angle) * dist, fb.y + Math.sin(angle) * dist, 1.5 + Math.sin(time * 0.01 + i * 2), 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx.fill();
              }

              ctx.restore();
            }
          }

          // Floating ice particles
          if (intensity > 0) {
            ctx.save();
            ctx.globalAlpha = intensity * 0.6;
            for (let i = 0; i < 15; i++) {
              const seed = i * 137.5;
              const px = ((seed + time * 0.01 * (0.3 + (i % 5) * 0.15)) % W);
              const py = ((seed * 2.3 + time * 0.008 * (0.2 + (i % 3) * 0.1)) % (H * 0.8));
              ctx.beginPath();
              ctx.arc(px, py, 1.5 + (i % 4) * 0.8, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(220, 240, 255, 0.7)";
              ctx.fill();
            }
            ctx.restore();
          }
          break;
        }

        case "psystrike": {
          const psyStart = 0.12; // delay so balls are visible first
          const psyT = Math.max(0, t - psyStart);
          const expandDuration = 0.25;
          const expandProgress = Math.min(psyT / expandDuration, 1);
          const fadeAlpha = t < psyStart ? 0 : t > 0.85 ? (1 - t) / 0.15 : Math.min(psyT * 10, 1);
          const maxRadius = Math.max(W, H) * 1.2;
          const currentRadius = maxRadius * expandProgress;

          if (fadeAlpha > 0) {
            ctx.save();

            // Inner filled gradient across screen
            ctx.globalAlpha = fadeAlpha * 0.35;
            const psyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentRadius);
            psyGrad.addColorStop(0, "rgba(123, 47, 247, 0.6)");
            psyGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.2)");
            psyGrad.addColorStop(0.85, "rgba(200, 130, 255, 0.05)");
            psyGrad.addColorStop(1, "rgba(200, 130, 255, 0)");
            ctx.fillStyle = psyGrad;
            ctx.fillRect(0, 0, W, H);

            // Bright ring at wavefront
            if (expandProgress < 1) {
              ctx.globalAlpha = fadeAlpha * 0.8;
              const ringWidth = 30 + expandProgress * 20;
              const ringGrad = ctx.createRadialGradient(
                cx, cy, Math.max(0, currentRadius - ringWidth),
                cx, cy, currentRadius
              );
              ringGrad.addColorStop(0, "rgba(200, 130, 255, 0)");
              ringGrad.addColorStop(0.3, "rgba(168, 85, 247, 0.6)");
              ringGrad.addColorStop(0.7, "rgba(123, 47, 247, 0.8)");
              ringGrad.addColorStop(1, "rgba(200, 130, 255, 0)");
              ctx.fillStyle = ringGrad;
              ctx.beginPath();
              ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
              ctx.fill();
            }

            // Central burst glow
            if (t < 0.15) {
              const burstAlpha = (1 - t / 0.15) * fadeAlpha;
              ctx.globalAlpha = burstAlpha;
              const burstGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
              burstGrad.addColorStop(0, "rgba(220, 180, 255, 0.9)");
              burstGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.4)");
              burstGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
              ctx.fillStyle = burstGrad;
              ctx.beginPath();
              ctx.arc(cx, cy, 80, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }

          // Explosion particles where pokeballs were
          if (t > psyStart && t < 0.6) {
            const particleAge = (t - psyStart) / 0.45;
            const pAlpha = 1 - particleAge;
            const pColors = ["#a855f7", "#7b2ff7", "#c084fc", "#e9d5ff", "#fff"];
            for (const fb of state.balls.filter(b => !b.alive)) {
              for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + fb.x * 0.01;
                const spd = (2 + (i % 3) * 2) * particleAge * 30;
                const px = fb.x + Math.cos(angle) * spd;
                const py = fb.y + Math.sin(angle) * spd;
                ctx.beginPath();
                ctx.arc(px, py, 2 * pAlpha, 0, Math.PI * 2);
                ctx.fillStyle = pColors[i % pColors.length] + Math.round(pAlpha * 255).toString(16).padStart(2, "0");
                ctx.fill();
              }
            }
          }
          break;
        }

        case "recover": {
          // Green healing particles rising
          for (let i = 0; i < 16; i++) {
            const px = cx + Math.sin(i * 1.5 + time * 0.003) * 50;
            const py = cy + 70 - ((time * 0.05 + i * 25) % 140);
            const alpha = 0.7 * (1 - ((time * 0.05 + i * 25) % 140) / 140);
            ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, 3 + Math.sin(i + time * 0.01) * 1, 0, Math.PI * 2);
            ctx.fill();
          }

          // Pulsing glow around pokemon
          const glowAlpha = 0.2 + 0.12 * Math.sin(time * 0.005);
          const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 80);
          grad.addColorStop(0, `rgba(74, 222, 128, ${glowAlpha})`);
          grad.addColorStop(0.6, `rgba(74, 222, 128, ${glowAlpha * 0.4})`);
          grad.addColorStop(1, "rgba(74, 222, 128, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, 80, 0, Math.PI * 2);
          ctx.fill();

          // Pokemon Center icon pulse
          const pcPulse = 0.8 + 0.2 * Math.sin(time * 0.008);
          ctx.save();
          ctx.globalAlpha = pcPulse;
          ctx.font = "bold 16px monospace";
          ctx.fillStyle = "#4ade80";
          ctx.textAlign = "center";
          ctx.fillText("+1 ❤️", cx, cy - 70);
          ctx.restore();
          break;
        }
      }

      // Tangrowth narrator - rises from bottom with eased animation, manga speech bubble
      if (state.tangrowthImg?.complete) {
        const riseTime = 0.12;
        const sinkStart = 0.9;
        const restY = H - 100;
        const hiddenY = H + 20;

        let tgDrawY: number;
        if (t < riseTime) {
          const eased = 1 - (1 - t / riseTime) * (1 - t / riseTime);
          tgDrawY = hiddenY + (restY - hiddenY) * eased;
        } else if (t > sinkStart) {
          const st = (t - sinkStart) / (1 - sinkStart);
          tgDrawY = restY + (hiddenY - restY) * st * st;
        } else {
          tgDrawY = restY;
        }

        const tgSize = 90;
        const tgX = W - tgSize - 15;
        ctx.drawImage(state.tangrowthImg, tgX, tgDrawY, tgSize, tgSize);

        // Manga spiky speech bubble
        if (t > riseTime + 0.05 && t < sinkStart - 0.05) {
          const bubbleAlpha = Math.min(1, (t - riseTime - 0.05) * 15);
          ctx.save();
          ctx.globalAlpha = Math.min(bubbleAlpha, t < sinkStart - 0.1 ? 1 : (sinkStart - 0.05 - t) * 20);

          const bubbleText = `Wow, ${info.name}!!`;
          ctx.font = `900 italic 13px "Helvetica Neue", "Impact", "Arial Black", sans-serif`;
          const textW = ctx.measureText(bubbleText).width;
          const bubbleW = textW + 30;
          const bubbleH = 28;
          const bubbleCx = tgX + tgSize / 2;
          const bubbleCy = tgDrawY - 22;
          let bx = Math.min(bubbleCx - bubbleW / 2, W - bubbleW - 8);

          // Spiky burst outline
          const spikeCx = bx + bubbleW / 2;
          const spikeCy = bubbleCy;
          const radiusX = bubbleW / 2 + 8;
          const radiusY = bubbleH / 2 + 8;
          const spikeCount = 14;
          const spikeDepth = 6;

          ctx.beginPath();
          for (let i = 0; i <= spikeCount * 2; i++) {
            const angle = (i / (spikeCount * 2)) * Math.PI * 2 - Math.PI / 2;
            const isSpike = i % 2 === 0;
            const rx = isSpike ? radiusX + spikeDepth : radiusX - spikeDepth * 0.3;
            const ry = isSpike ? radiusY + spikeDepth : radiusY - spikeDepth * 0.3;
            const px = spikeCx + Math.cos(angle) * rx;
            const py = spikeCy + Math.sin(angle) * ry;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = "rgba(20, 15, 40, 0.95)";
          ctx.fill();
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Pointer tail
          const tailTipX = tgX + tgSize / 2;
          const tailTipY = tgDrawY + 5;
          ctx.beginPath();
          ctx.moveTo(spikeCx - 8, bubbleCy + bubbleH / 2 + spikeDepth - 2);
          ctx.lineTo(tailTipX, tailTipY);
          ctx.lineTo(spikeCx + 8, bubbleCy + bubbleH / 2 + spikeDepth - 2);
          ctx.fillStyle = "rgba(20, 15, 40, 0.95)";
          ctx.fill();
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Text
          ctx.font = `900 italic 13px "Helvetica Neue", "Impact", "Arial Black", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.lineJoin = "round";
          ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
          ctx.lineWidth = 3;
          ctx.strokeText(bubbleText, spikeCx, spikeCy);
          ctx.fillStyle = "#f0e6ff";
          ctx.fillText(bubbleText, spikeCx, spikeCy);

          ctx.restore();
        }
      }

      state.animId = requestAnimationFrame(draw);
    }

    state.animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(state.animId);
  }, []);

  return (
    <div style={{ margin: "1.5em 0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4em", marginBottom: "0.5em" }}>
        {POWERS.map((p) => {
          const info = POWER_INFO[p];
          const active = activePower === p;
          return (
            <button
              key={p}
              onClick={() => setActivePower(p)}
              style={{
                padding: "5px 14px",
                borderRadius: 6,
                border: `1px solid ${active ? info.color : "#444"}`,
                background: active ? info.color + "22" : "#222",
                color: active ? info.color : "#888",
                cursor: "pointer",
                fontSize: "0.8em",
                fontFamily: "monospace",
                fontWeight: active ? "bold" : "normal",
              }}
            >
              {info.name}
            </button>
          );
        })}
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={340}
        style={{
          width: "100%",
          maxWidth: 700,
          display: "block",
          margin: "0 auto",
          borderRadius: 8,
          border: "1px solid #333",
        }}
      />
      <p style={{ textAlign: "center", fontSize: "0.8em", opacity: 0.6, marginTop: "0.4em", fontFamily: "monospace" }}>
        {POWER_INFO[activePower].trigger} — Tangrowth narrates from the corner
      </p>
    </div>
  );
}
