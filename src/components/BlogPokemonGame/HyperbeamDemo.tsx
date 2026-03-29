import React, { useRef, useEffect } from "react";

export default function HyperbeamDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    animId: 0,
    startTime: 0,
    mewtwoImg: null as HTMLImageElement | null,
    mewtwoArmImg: null as HTMLImageElement | null,
    pokeballImg: null as HTMLImageElement | null,
    balls: [] as { x: number; y: number; vx: number; vy: number; size: number; rot: number; alive: boolean }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
  });

  useEffect(() => {
    const s = stateRef.current;
    const m = new Image(); m.src = "/img/mewtwo.png"; s.mewtwoImg = m;
    const a = new Image(); a.src = "/img/mewtwo_arm.png"; s.mewtwoArmImg = a;
    const p = new Image(); p.src = "/img/pokeballs/pokeball.png"; s.pokeballImg = p;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    s.startTime = performance.now();

    const W = canvas.width;
    const H = canvas.height;
    const LOOP = 2500;
    const BODY_SIZE = 110;

    function draw(time: number) {
      const elapsed = time - s.startTime;
      const t = (elapsed % LOOP) / LOOP;

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

      const cx = W / 2;
      const cy = H * 0.52;
      const beamAngle = -Math.PI / 2 + Math.sin(t * Math.PI * 3) * 0.9;

      // Spawn & update pokeballs
      const spawnPhase = Math.floor(elapsed / 350);
      while (s.balls.length < Math.min(spawnPhase + 3, 12)) {
        const side = Math.random();
        let bx: number, by: number;
        if (side < 0.6) {
          bx = 40 + Math.random() * (W - 80);
          by = -20;
        } else if (side < 0.8) {
          bx = -20;
          by = Math.random() * cy * 0.5;
        } else {
          bx = W + 20;
          by = Math.random() * cy * 0.5;
        }
        const angle = Math.atan2(cy - by, cx - bx);
        s.balls.push({
          x: bx, y: by, vx: Math.cos(angle) * 0.5, vy: Math.sin(angle) * 0.5,
          size: 22 + Math.random() * 10, rot: Math.random() * Math.PI * 2, alive: true,
        });
      }

      const EXPLODE_COLORS = ["#facc15", "#f97316", "#ef4444", "#fff", "#fde68a"];
      for (const b of s.balls) {
        if (!b.alive) continue;
        b.x += b.vx;
        b.y += b.vy;
        b.rot += 0.02;
        // Destroy if beam sweeps past
        if (t > 0.05) {
          const ballAngle = Math.atan2(b.y - cy, b.x - cx);
          let diff = ballAngle - beamAngle;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          if (Math.abs(diff) < 0.3) {
            b.alive = false;
            // Spawn explosion particles
            for (let pi = 0; pi < 10; pi++) {
              const a = Math.random() * Math.PI * 2;
              const spd = 1.5 + Math.random() * 3;
              s.particles.push({
                x: b.x, y: b.y,
                vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
                life: 1,
                color: EXPLODE_COLORS[Math.floor(Math.random() * EXPLODE_COLORS.length)],
              });
            }
          }
        }
      }

      // Update & draw particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        if (p.life <= 0) { s.particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + p.life * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw alive balls
      if (s.pokeballImg?.complete) {
        for (const b of s.balls) {
          if (!b.alive) continue;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.rot);
          ctx.drawImage(s.pokeballImg, -b.size / 2, -b.size / 2, b.size, b.size);
          ctx.restore();
        }
      }

      // Reset balls on loop
      if (t < 0.02) { s.balls = []; s.particles = []; }

      // Draw Mewtwo body
      if (s.mewtwoImg?.complete) {
        ctx.drawImage(s.mewtwoImg, cx - BODY_SIZE / 2, cy - BODY_SIZE / 2, BODY_SIZE, BODY_SIZE);
      }

      // Draw arm following beam
      if (s.mewtwoArmImg?.complete) {
        const armSize = BODY_SIZE * 0.5;
        const pivotX = cx + 0.024 * BODY_SIZE;
        const pivotY = cy + 0.38 * BODY_SIZE - BODY_SIZE / 2;
        const armRotation = beamAngle - Math.PI - 0.2;
        ctx.save();
        ctx.translate(pivotX, pivotY);
        ctx.rotate(armRotation);
        ctx.drawImage(s.mewtwoArmImg, -armSize / 2, -armSize / 2, armSize, armSize);
        ctx.restore();
      }

      // === Beam rendering ===
      const beamProgress = Math.min(1, t * 2.5);
      const fadeAlpha = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;

      if (beamProgress > 0) {
        const beamLen = Math.max(W, H) * 1.2;
        const growProgress = Math.min(t * 3, 1);
        const originHalfW = 4 * 0.3;
        const farHalfW = (4 + (50 - 4) * growProgress) / 2;

        ctx.save();
        ctx.globalAlpha = fadeAlpha;
        ctx.translate(cx, cy - 20);
        ctx.rotate(beamAngle);

        // Outer glow
        const outerGrad = ctx.createLinearGradient(0, 0, beamLen, 0);
        outerGrad.addColorStop(0, "rgba(255, 200, 50, 0.5)");
        outerGrad.addColorStop(0.4, "rgba(255, 120, 30, 0.3)");
        outerGrad.addColorStop(1, "rgba(255, 120, 30, 0)");
        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.moveTo(0, -originHalfW * 2);
        ctx.lineTo(beamLen, -farHalfW * 1.5);
        ctx.lineTo(beamLen, farHalfW * 1.5);
        ctx.lineTo(0, originHalfW * 2);
        ctx.closePath();
        ctx.fill();

        // Main beam body
        ctx.beginPath();
        ctx.moveTo(0, -originHalfW);
        ctx.lineTo(beamLen, -farHalfW);
        ctx.lineTo(beamLen, farHalfW);
        ctx.lineTo(0, originHalfW);
        ctx.closePath();
        const mainGrad = ctx.createLinearGradient(0, -farHalfW, 0, farHalfW);
        mainGrad.addColorStop(0, "rgba(255, 160, 30, 0.5)");
        mainGrad.addColorStop(0.25, "rgba(255, 240, 180, 0.9)");
        mainGrad.addColorStop(0.5, "rgba(255, 255, 255, 1)");
        mainGrad.addColorStop(0.75, "rgba(255, 240, 180, 0.9)");
        mainGrad.addColorStop(1, "rgba(255, 160, 30, 0.5)");
        ctx.fillStyle = mainGrad;
        ctx.fill();

        // Hot white core
        ctx.beginPath();
        ctx.moveTo(0, -originHalfW * 0.3);
        ctx.lineTo(beamLen, -farHalfW * 0.3);
        ctx.lineTo(beamLen, farHalfW * 0.3);
        ctx.lineTo(0, originHalfW * 0.3);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 240, 0.9)";
        ctx.shadowColor = "rgba(255, 255, 200, 0.8)";
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Energy flicker particles
        for (let i = 0; i < 6; i++) {
          const ft = Math.random();
          const fx = ft * beamLen * 0.8;
          const localHW = originHalfW + (farHalfW - originHalfW) * ft;
          const fy = (Math.random() - 0.5) * localHW * 1.2;
          ctx.beginPath();
          ctx.arc(fx, fy, 2 + Math.random() * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`;
          ctx.fill();
        }

        ctx.restore();

        // ハイパービーム manga text
        if (beamProgress > 0.2) {
          const textAlpha = beamProgress < 0.3 ? (beamProgress - 0.2) * 10 : fadeAlpha;
          ctx.save();
          ctx.globalAlpha = textAlpha;
          const kana = "ハイパービーム";
          const impactSize = Math.min(W * 0.09, 55);
          const textCx = cx;
          const textCy = 40;
          const tiltAngle = -15 * Math.PI / 180;

          ctx.translate(textCx, textCy);
          ctx.rotate(tiltAngle);

          // Speed lines
          for (let i = 0; i < 6; i++) {
            const ly = -impactSize * 0.6 + (i / 6) * impactSize * 1.2;
            ctx.strokeStyle = `rgba(199, 125, 255, ${0.12 + Math.random() * 0.12})`;
            ctx.lineWidth = 1.5 + Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(-impactSize * 3 - Math.random() * 100, ly + (Math.random() - 0.5) * 6);
            ctx.lineTo(impactSize * 3, ly + (Math.random() - 0.5) * 4);
            ctx.stroke();
          }

          ctx.font = `900 ${impactSize}px "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.lineJoin = "round";

          const chars = kana.split("");
          const charWidths = chars.map(ch => ctx.measureText(ch).width);
          const totalTextW = charWidths.reduce((a, b) => a + b, 0);
          let curX = -totalTextW / 2;

          for (let i = 0; i < chars.length; i++) {
            const chCx = curX + charWidths[i] / 2;
            const yOff = (i % 2 === 0 ? -1 : 1) * (3 + Math.sin(i * 1.7) * 4);

            ctx.save();
            ctx.translate(chCx, yOff);

            ctx.strokeStyle = "#1A0033";
            ctx.lineWidth = impactSize * 0.12;
            ctx.strokeText(chars[i], 0, 0);

            const grad = ctx.createLinearGradient(-impactSize * 0.4, -impactSize * 0.4, impactSize * 0.4, impactSize * 0.4);
            grad.addColorStop(0, "#FFE066");
            grad.addColorStop(0.3, "#FFF5CC");
            grad.addColorStop(0.5, "#FFFFFF");
            grad.addColorStop(0.7, "#FFF5CC");
            grad.addColorStop(1, "#FFD700");
            ctx.fillStyle = grad;
            ctx.fillText(chars[i], 0, 0);

            ctx.restore();
            curX += charWidths[i];
          }
          ctx.restore();
        }
      }

      s.animId = requestAnimationFrame(draw);
    }

    s.animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(s.animId);
  }, []);

  return (
    <div style={{ margin: "1.5em 0" }}>
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
    </div>
  );
}
