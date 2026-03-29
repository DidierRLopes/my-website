import React, { useRef, useEffect, useState } from "react";

export default function HoOhRevival() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const stateRef = useRef({
    hoOhImg: null as HTMLImageElement | null,
    featherImg: null as HTMLImageElement | null,
    mewtwoImg: null as HTMLImageElement | null,
    mewtwoArmImg: null as HTMLImageElement | null,
    animId: 0,
    idleAnimId: 0,
    startTime: 0,
    angleDeg: 0,
    stars: [] as { x: number; y: number; s: number; phase: number }[],
    idleStars: [] as { x: number; y: number; s: number; phase: number }[],
  });

  useEffect(() => {
    const state = stateRef.current;
    const h = new Image();
    h.src = "/img/ho-oh.gif";
    state.hoOhImg = h;
    const f = new Image();
    f.src = "/img/feather.png";
    state.featherImg = f;
    const m = new Image();
    m.src = "/img/mewtwo.png";
    state.mewtwoImg = m;
    const ma = new Image();
    ma.src = "/img/mewtwo_arm.png";
    state.mewtwoArmImg = ma;
  }, []);

  // Draw initial idle scene when not playing
  useEffect(() => {
    if (playing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;

    const W = canvas.width;
    const H = canvas.height;

    // Generate idle stars once
    if (state.idleStars.length === 0) {
      for (let i = 0; i < 50; i++) {
        state.idleStars.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.8,
          s: 0.4 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawIdle(time: number) {
      ctx.clearRect(0, 0, W, H);

      // Dark starfield background
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, W, H);

      // Twinkling stars
      for (const st of state.idleStars) {
        const brightness =
          0.25 + 0.35 * Math.sin(time * 0.0015 + st.phase);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // Earth curve
      ctx.beginPath();
      ctx.ellipse(W / 2, H + 40, W * 0.75, 110, 0, Math.PI, 0);
      ctx.fillStyle = "#1a4a2a";
      ctx.fill();

      // Ho-Oh position for HTML overlay (idle: static on the right)
      const setPos = (state as any).setHoOhPos;
      if (setPos) setPos({ x: W * 0.75, y: H * 0.2, size: 100, angle: 0, visible: true });

      // Mewtwo ghostly at center on the ground
      const groundY = H * 0.72;
      const size = 120;
      if (state.mewtwoImg?.complete) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.drawImage(
          state.mewtwoImg,
          W / 2 - size / 2,
          groundY - size / 2,
          size,
          size,
        );
        // Draw arm too (ghostly)
        if (state.mewtwoArmImg?.complete) {
          const armRotation = -Math.PI - Math.PI - 0.2; // aimAngle = -Math.PI, pointing left
          const shoulderX = W / 2 - size * 0.15;
          const shoulderY = groundY - size * 0.05;
          ctx.save();
          ctx.translate(shoulderX, shoulderY);
          ctx.rotate(armRotation);
          const armW = size * 0.55;
          const armH = size * 0.25;
          ctx.drawImage(state.mewtwoArmImg, -armW * 0.25, -armH / 2, armW, armH);
          ctx.restore();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Instruction text
      ctx.font = "11px monospace";
      ctx.fillStyle = "#888";
      ctx.textAlign = "center";
      ctx.fillText("Press play to see the revival sequence", W / 2, H - 14);

      state.idleAnimId = requestAnimationFrame(drawIdle);
    }

    state.idleAnimId = requestAnimationFrame(drawIdle);
    return () => cancelAnimationFrame(state.idleAnimId);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    state.startTime = performance.now();
    state.angleDeg = 2 + Math.random() * 3; // 2-5 degrees

    const W = canvas.width; // 700
    const H = canvas.height; // 350

    // Generate stars
    state.stars = [];
    for (let i = 0; i < 50; i++) {
      state.stars.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.8,
        s: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Timing constants
    const HOOH_FLY_DURATION = 3000; // Ho-Oh flies from right to center
    const FEATHER_FALL_DURATION = 2400;
    const BURST_DURATION = 600;
    const POKEMON_FADE_DURATION = 1500;
    const FEATHER_START = HOOH_FLY_DURATION; // 3000
    const BURST_START = FEATHER_START + FEATHER_FALL_DURATION; // 5400
    const POKEMON_START = BURST_START; // 5400
    const TOTAL_DURATION = POKEMON_START + POKEMON_FADE_DURATION + 500; // ~7400

    // Ho-Oh flight parameters
    const hoOhSize = 100;
    const hoOhSpeed = (W / 2 + hoOhSize) / HOOH_FLY_DURATION;
    const hoOhBaseY = H * 0.12 + 8;
    const angleRad = state.angleDeg * (Math.PI / 180);
    const cx = W / 2;

    // Trail particles: store recent Ho-Oh positions
    const trailPositions: { x: number; y: number; time: number }[] = [];

    // Feather landing target
    const groundY = H * 0.72;

    function smoothstep(edge0: number, edge1: number, x: number): number {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    function getHoOhY(hoOhX: number): number {
      return hoOhBaseY - Math.tan(angleRad) * (W + hoOhSize / 2 - hoOhX);
    }

    function draw(time: number) {
      const elapsed = time - state.startTime;

      ctx.clearRect(0, 0, W, H);

      // Dark starfield background
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, W, H);

      // Twinkling stars
      for (const st of state.stars) {
        const brightness =
          0.25 + 0.35 * Math.sin(time * 0.0015 + st.phase);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // Earth curve
      ctx.beginPath();
      ctx.ellipse(W / 2, H + 40, W * 0.75, 110, 0, Math.PI, 0);
      ctx.fillStyle = "#1a4a2a";
      ctx.fill();

      // === Ho-Oh phase (0 to ~3000ms, continues flying left after drop) ===
      const hoOhVisible = elapsed < HOOH_FLY_DURATION + 1500; // keep flying past center
      if (hoOhVisible) {
        const hoOhX = W + hoOhSize / 2 - hoOhSpeed * elapsed;
        const hoOhY = getHoOhY(hoOhX);

        // Add trail position
        trailPositions.push({ x: hoOhX, y: hoOhY, time: elapsed });
        // Keep only recent trail dots
        while (
          trailPositions.length > 0 &&
          elapsed - trailPositions[0].time > 400
        ) {
          trailPositions.shift();
        }

        // Golden trail behind Ho-Oh
        for (let i = 0; i < trailPositions.length; i++) {
          const tp = trailPositions[i];
          const age = (elapsed - tp.time) / 400; // 0..1
          const alpha = 0.5 * (1 - age);
          const radius = 2.5 * (1 - age * 0.5);
          if (alpha > 0) {
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(250, 204, 21, ${alpha})`;
            ctx.fill();
          }
        }

        // Position Ho-Oh HTML overlay (animated GIF)
        const setPos = (state as any).setHoOhPos;
        if (setPos) {
          if (hoOhX > -hoOhSize && hoOhX < W + hoOhSize) {
            setPos({ x: hoOhX, y: hoOhY, size: hoOhSize, angle: -state.angleDeg, visible: true });
          } else {
            setPos({ x: 0, y: 0, size: 0, angle: 0, visible: false });
          }
        }
      } else {
        // Ho-Oh has flown off screen
        const setPos = (state as any).setHoOhPos;
        if (setPos) setPos({ x: 0, y: 0, size: 0, angle: 0, visible: false });
      }

      // === Feather phase (3000ms to 5400ms) ===
      if (elapsed >= FEATHER_START && elapsed < BURST_START + BURST_DURATION) {
        const featherElapsed = Math.min(
          elapsed - FEATHER_START,
          FEATHER_FALL_DURATION,
        );
        const progress = featherElapsed / FEATHER_FALL_DURATION; // 0..1

        // Ho-Oh Y at the center when feather drops
        const dropY = getHoOhY(cx);

        const featherX = cx + Math.sin(progress * Math.PI * 6) * 45;
        const featherY = dropY + progress * (groundY - dropY);
        const zigzagAngle = Math.cos(progress * Math.PI * 6) * 0.4;

        const featherSize = 30;
        if (state.featherImg?.complete && progress <= 1) {
          ctx.save();
          ctx.translate(featherX, featherY);
          ctx.rotate(zigzagAngle);
          ctx.drawImage(
            state.featherImg,
            -featherSize / 2,
            -featherSize / 2,
            featherSize,
            featherSize,
          );
          ctx.restore();

          // Subtle glow around feather
          const glowGrad = ctx.createRadialGradient(
            featherX,
            featherY,
            0,
            featherX,
            featherY,
            20,
          );
          glowGrad.addColorStop(0, "rgba(250, 204, 21, 0.25)");
          glowGrad.addColorStop(1, "rgba(250, 204, 21, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(featherX, featherY, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === Golden burst when feather lands (5400ms to 6000ms) ===
      if (elapsed >= BURST_START && elapsed < BURST_START + BURST_DURATION) {
        const burstProgress =
          (elapsed - BURST_START) / BURST_DURATION; // 0..1
        const burstRadius = 30 + burstProgress * 50; // 30 to 80
        const burstAlpha = 0.7 * (1 - burstProgress);

        const grad = ctx.createRadialGradient(
          cx,
          groundY,
          0,
          cx,
          groundY,
          burstRadius,
        );
        grad.addColorStop(0, `rgba(255, 215, 0, ${burstAlpha})`);
        grad.addColorStop(0.5, `rgba(250, 204, 21, ${burstAlpha * 0.5})`);
        grad.addColorStop(1, `rgba(250, 204, 21, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, groundY, burstRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // === Pokemon (Mewtwo) fades in with smoothstep (5400ms to 6900ms) ===
      if (elapsed >= POKEMON_START) {
        const fadeProgress =
          (elapsed - POKEMON_START) / POKEMON_FADE_DURATION;
        const alpha = smoothstep(0, 1, Math.min(1, fadeProgress));

        if (state.mewtwoImg?.complete) {
          ctx.save();
          ctx.globalAlpha = alpha;
          const size = 120;
          ctx.drawImage(
            state.mewtwoImg,
            cx - size / 2,
            groundY - size / 2,
            size,
            size,
          );
          // Draw arm on top at shoulder position
          if (state.mewtwoArmImg?.complete) {
            const armRotation = -Math.PI - Math.PI - 0.2;
            const shoulderX = cx - size * 0.15;
            const shoulderY = groundY - size * 0.05;
            ctx.save();
            ctx.translate(shoulderX, shoulderY);
            ctx.rotate(armRotation);
            const armW = size * 0.55;
            const armH = size * 0.25;
            ctx.drawImage(state.mewtwoArmImg, -armW * 0.25, -armH / 2, armW, armH);
            ctx.restore();
          }
          ctx.globalAlpha = 1;
          ctx.restore();
        }
      }

      // Label
      ctx.font = "11px monospace";
      ctx.fillStyle = "#888";
      ctx.textAlign = "center";
      if (elapsed < FEATHER_START) {
        ctx.fillText("Ho-Oh appears...", W / 2, H - 14);
      } else if (elapsed < BURST_START) {
        ctx.fillText("Sacred Ash feather falls...", W / 2, H - 14);
      } else if (elapsed < TOTAL_DURATION) {
        ctx.fillText("Mewtwo revives!", W / 2, H - 14);
      }

      if (elapsed < TOTAL_DURATION) {
        state.animId = requestAnimationFrame(draw);
      } else {
        setPlaying(false);
      }
    }

    state.animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(state.animId);
  }, [playing]);

  // Track Ho-Oh HTML position for the animated GIF overlay
  const [hoOhPos, setHoOhPos] = useState<{ x: number; y: number; size: number; angle: number; visible: boolean }>({
    x: 0.75, y: 0.2, size: 100, angle: 0, visible: true,
  });

  // Update Ho-Oh position from animation loop
  useEffect(() => {
    (stateRef.current as any).setHoOhPos = setHoOhPos;
  }, []);

  return (
    <div style={{ margin: "1.5em 0", textAlign: "center" }}>
      <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
        <canvas
          ref={canvasRef}
          width={700}
          height={350}
          style={{
            width: "100%",
            display: "block",
            borderRadius: 8,
            border: "1px solid #333",
          }}
        />
        {hoOhPos.visible && (
          <img
            src="/img/ho-oh.gif"
            alt="Ho-Oh"
            style={{
              position: "absolute",
              left: `${(hoOhPos.x / 700) * 100}%`,
              top: `${(hoOhPos.y / 350) * 100}%`,
              width: `${(hoOhPos.size / 700) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${hoOhPos.angle}deg)`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      <button
        onClick={() => setPlaying(true)}
        disabled={playing}
        style={{
          marginTop: "0.6em",
          padding: "6px 20px",
          borderRadius: 6,
          border: "1px solid #555",
          background: playing ? "#222" : "#333",
          color: playing ? "#666" : "#facc15",
          cursor: playing ? "default" : "pointer",
          fontSize: "0.85em",
          fontFamily: "monospace",
        }}
      >
        {playing ? "Playing..." : "\u25B6 Play revival animation"}
      </button>
    </div>
  );
}
