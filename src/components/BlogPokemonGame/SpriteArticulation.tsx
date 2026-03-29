import React, { useRef, useEffect, useState } from "react";

type PokemonMode = "dark" | "light";

const CANVAS_W = 700;
const CANVAS_H = 380;

// Star field — generated once
function makeStars(count: number) {
  const stars: { x: number; y: number; r: number; a: number }[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * CANVAS_W,
      y: Math.random() * CANVAS_H,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.4 + 0.1,
    });
  }
  return stars;
}

const STARS = makeStars(80);

export default function SpriteArticulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSplit, setShowSplit] = useState(false);
  const [mode, setMode] = useState<PokemonMode>("dark");

  const stateRef = useRef({
    bodyImg: null as HTMLImageElement | null,
    armImg: null as HTMLImageElement | null,
    mouseX: CANVAS_W / 2,
    mouseY: 100,
    animId: 0,
    showSplit: false,
    mode: "dark" as PokemonMode,
  });

  // Load images when mode changes
  useEffect(() => {
    const state = stateRef.current;
    state.mode = mode;
    const body = new Image();
    const arm = new Image();
    if (mode === "dark") {
      body.src = "/img/mewtwo.png";
      arm.src = "/img/mewtwo_arm.png";
    } else {
      body.src = "/img/mew.png";
      arm.src = "/img/mew_tail.png";
    }
    state.bodyImg = body;
    state.armImg = arm;
  }, [mode]);

  useEffect(() => {
    stateRef.current.showSplit = showSplit;
  }, [showSplit]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const scaleX = canvas!.width / rect.width;
      const scaleY = canvas!.height / rect.height;
      state.mouseX = (e.clientX - rect.left) * scaleX;
      state.mouseY = (e.clientY - rect.top) * scaleY;
    }
    function onTouch(e: TouchEvent) {
      e.preventDefault();
      const rect = canvas!.getBoundingClientRect();
      const scaleX = canvas!.width / rect.width;
      const scaleY = canvas!.height / rect.height;
      const t = e.touches[0];
      state.mouseX = (t.clientX - rect.left) * scaleX;
      state.mouseY = (t.clientY - rect.top) * scaleY;
    }
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: false });

    function drawStars() {
      for (const s of STARS) {
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx!.fill();
      }
    }

    // Sprite size matching game's SPRITE_SIZE = 160
    const SPRITE_SIZE = 160;

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);

      // Background
      ctx!.fillStyle = "#0d0d1a";
      ctx!.fillRect(0, 0, W, H);
      drawStars();

      const split = state.showSplit;
      const isDark = state.mode === "dark";
      const bodyDrawSize = SPRITE_SIZE;

      if (split) {
        drawSplit(ctx!, W, H, bodyDrawSize, isDark);
      } else {
        drawCombined(ctx!, W, H, bodyDrawSize, isDark);
      }

      state.animId = requestAnimationFrame(draw);
    }

    function drawSplit(
      ctx: CanvasRenderingContext2D,
      W: number,
      H: number,
      bodyDrawSize: number,
      isDark: boolean,
    ) {
      const bodyX = W * 0.25;
      const bodyY = H * 0.45;
      const armCenterX = W * 0.72;
      const armCenterY = H * 0.45;

      // Draw body
      if (state.bodyImg?.complete) {
        ctx.drawImage(
          state.bodyImg,
          bodyX - bodyDrawSize / 2,
          bodyY - bodyDrawSize / 2,
          bodyDrawSize,
          bodyDrawSize,
        );
      }

      // Label body
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#aaa";
      ctx.textAlign = "center";
      ctx.fillText(
        isDark ? "mewtwo.png (static)" : "mew.png (static)",
        bodyX,
        bodyY + bodyDrawSize / 2 + 20,
      );

      // Arm/tail with rotation
      const dx = state.mouseX - armCenterX;
      const dy = state.mouseY - armCenterY;
      const aimAngle = Math.atan2(dy, dx);

      if (state.armImg?.complete) {
        if (isDark) {
          // Mewtwo arm
          const armSize = bodyDrawSize * 0.5;
          const rotation = aimAngle - Math.PI - 0.2;
          ctx.save();
          ctx.translate(armCenterX, armCenterY);
          ctx.rotate(rotation);
          ctx.drawImage(
            state.armImg,
            -armSize / 2,
            -armSize / 2,
            armSize,
            armSize,
          );
          ctx.restore();
        } else {
          // Mew tail
          const tailSize = bodyDrawSize * 1.1;
          const rotation = aimAngle - Math.PI - 0.65;
          ctx.save();
          ctx.translate(armCenterX, armCenterY);
          ctx.rotate(rotation);
          ctx.drawImage(
            state.armImg,
            -tailSize / 2,
            -tailSize / 2,
            tailSize,
            tailSize,
          );
          ctx.restore();
        }
      }

      // Pivot dot
      ctx.beginPath();
      ctx.arc(armCenterX, armCenterY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#facc15";
      ctx.fill();

      // Label arm/tail
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#aaa";
      ctx.textAlign = "center";
      ctx.fillText(
        isDark
          ? "mewtwo_arm.png (rotates)"
          : "mew_tail.png (rotates)",
        armCenterX,
        armCenterY + bodyDrawSize / 2 + 20,
      );

      // Plus sign between them
      ctx.font = "bold 28px monospace";
      ctx.fillStyle = "#facc15";
      ctx.textAlign = "center";
      ctx.fillText("+", W * 0.48, H * 0.47);

      // Instruction
      ctx.font = "11px monospace";
      ctx.fillStyle = "#666";
      ctx.textAlign = "center";
      ctx.fillText(
        "Move your mouse to rotate the " + (isDark ? "arm" : "tail"),
        W / 2,
        H - 12,
      );
    }

    function drawCombined(
      ctx: CanvasRenderingContext2D,
      W: number,
      H: number,
      bodyDrawSize: number,
      isDark: boolean,
    ) {
      // Position body similar to game layout
      const cx = W / 2;
      const bodyTopY = H * 0.12;
      const bodyX = cx;
      const bodyY = bodyTopY;

      // Compute aim angle from pivot
      let pivotX: number, pivotY: number;
      let rotation: number;
      let fireOriginX: number, fireOriginY: number;

      if (isDark) {
        // Mewtwo pivot: shoulder area
        pivotX = bodyX + 0.024 * bodyDrawSize;
        pivotY = bodyY + 0.43 * bodyDrawSize;

        const dx = state.mouseX - pivotX;
        const dy = state.mouseY - pivotY;
        const aimAngle = Math.atan2(dy, dx);
        rotation = aimAngle - Math.PI - 0.2;

        // Fire origin: hand position via rotation matrix
        const armSize = bodyDrawSize * 0.5;
        const localHandX = -0.5 * armSize / 2;
        const localHandY = -0.4 * armSize / 2;
        const cosA = Math.cos(rotation);
        const sinA = Math.sin(rotation);
        fireOriginX = pivotX + cosA * localHandX - sinA * localHandY;
        fireOriginY = pivotY + sinA * localHandX + cosA * localHandY;

        // Draw body
        if (state.bodyImg?.complete) {
          ctx.drawImage(
            state.bodyImg,
            bodyX - bodyDrawSize / 2,
            bodyY,
            bodyDrawSize,
            bodyDrawSize,
          );
        }

        // Draw arm rotating around pivot
        if (state.armImg?.complete) {
          const armSize2 = bodyDrawSize * 0.5;
          ctx.save();
          ctx.translate(pivotX, pivotY);
          ctx.rotate(rotation);
          ctx.drawImage(
            state.armImg,
            -armSize2 / 2,
            -armSize2 / 2,
            armSize2,
            armSize2,
          );
          ctx.restore();
        }
      } else {
        // Mew pivot: tail base
        pivotX = bodyX + 0.03 * bodyDrawSize;
        pivotY = bodyY + 0.52 * bodyDrawSize;

        const dx = state.mouseX - pivotX;
        const dy = state.mouseY - pivotY;
        const aimAngle = Math.atan2(dy, dx);
        rotation = aimAngle - Math.PI - 0.65;

        // Fire origin: orb at tip of tail via rotation matrix
        const tailSize = bodyDrawSize * 1.1;
        const localTipX = -0.43 * tailSize / 2;
        const localTipY = -0.68 * tailSize / 2;
        const cosA = Math.cos(rotation);
        const sinA = Math.sin(rotation);
        fireOriginX = pivotX + cosA * localTipX - sinA * localTipY;
        fireOriginY = pivotY + sinA * localTipX + cosA * localTipY;

        // Draw tail behind body
        if (state.armImg?.complete) {
          const tailSize2 = bodyDrawSize * 1.1;
          ctx.save();
          ctx.translate(pivotX, pivotY);
          ctx.rotate(rotation);
          ctx.drawImage(
            state.armImg,
            -tailSize2 / 2,
            -tailSize2 / 2,
            tailSize2,
            tailSize2,
          );
          ctx.restore();
        }

        // Draw body on top
        if (state.bodyImg?.complete) {
          ctx.drawImage(
            state.bodyImg,
            bodyX - bodyDrawSize / 2,
            bodyY,
            bodyDrawSize,
            bodyDrawSize,
          );
        }
      }

      // Fire origin dot (yellow)
      ctx.beginPath();
      ctx.arc(fireOriginX, fireOriginY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#facc15";
      ctx.fill();
      // Glow ring
      ctx.beginPath();
      ctx.arc(fireOriginX, fireOriginY, 10, 0, Math.PI * 2);
      ctx.strokeStyle = "#facc1588";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dotted aim line from fire origin outward
      const aimDx = state.mouseX - pivotX;
      const aimDy = state.mouseY - pivotY;
      const aimAngle = Math.atan2(aimDy, aimDx);
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = "#facc1566";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(fireOriginX, fireOriginY);
      ctx.lineTo(
        fireOriginX + Math.cos(aimAngle) * 250,
        fireOriginY + Math.sin(aimAngle) * 250,
      );
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Pivot dot (subtle)
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#facc1566";
      ctx.fill();

      // Instruction
      ctx.font = "11px monospace";
      ctx.fillStyle = "#666";
      ctx.fillText(
        "Move your mouse to aim \u2014 "
          + (isDark ? "arm" : "tail")
          + " follows, body stays static",
        W / 2,
        H - 12,
      );
    }

    state.animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(state.animId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const isDark = mode === "dark";

  return (
    <div style={{ margin: "1.5em 0" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "0.5em",
        }}
      >
        <button
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          style={{
            padding: "6px 16px",
            borderRadius: 6,
            border: "1px solid #555",
            background: isDark ? "#6b21a833" : "#ec489933",
            color: isDark ? "#c084fc" : "#f472b6",
            cursor: "pointer",
            fontSize: "0.85em",
            fontFamily: "monospace",
          }}
        >
          {isDark ? "Mewtwo (dark)" : "Mew (light)"} — click to switch
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{
          width: "100%",
          maxWidth: CANVAS_W,
          display: "block",
          margin: "0 auto",
          borderRadius: 8,
          border: "1px solid #333",
          cursor: "crosshair",
        }}
      />
      <div
        style={{
          textAlign: "center",
          marginTop: "0.5em",
        }}
      >
        <button
          onClick={() => setShowSplit(!showSplit)}
          style={{
            padding: "6px 16px",
            borderRadius: 6,
            border: "1px solid #555",
            background: showSplit ? "#facc1533" : "#333",
            color: showSplit ? "#facc15" : "#ccc",
            cursor: "pointer",
            fontSize: "0.85em",
            fontFamily: "monospace",
          }}
        >
          {showSplit ? "Show combined" : "Show separated sprites"}
        </button>
      </div>
      <p
        style={{
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: "0.85em",
          color: "#999",
          marginTop: "0.75em",
          lineHeight: 1.6,
        }}
      >
        {isDark
          ? "Mewtwo\u2019s arm rotates from the shoulder to aim. The body stays completely static while only the arm sprite rotates around its pivot point."
          : "Mew\u2019s tail rotates from the base \u2014 the orb at the tip is the fire origin. The body stays completely static while only the tail sprite rotates around its pivot point."}
      </p>
    </div>
  );
}
