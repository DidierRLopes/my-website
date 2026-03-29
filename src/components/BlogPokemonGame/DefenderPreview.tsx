import React, { useRef, useEffect } from "react";

export default function DefenderPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    mewtwoBody: null as HTMLImageElement | null,
    mewtwoArm: null as HTMLImageElement | null,
    mewBody: null as HTMLImageElement | null,
    mewTail: null as HTMLImageElement | null,
    animId: 0,
  });

  useEffect(() => {
    const s = stateRef.current;
    const imgs = [
      ["/img/mewtwo.png", "mewtwoBody"],
      ["/img/mewtwo_arm.png", "mewtwoArm"],
      ["/img/mew.png", "mewBody"],
      ["/img/mew_tail.png", "mewTail"],
    ] as const;
    for (const [src, key] of imgs) {
      const img = new Image();
      img.src = src;
      (s as any)[key] = img;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const SPRITE = 150;

    function draw(time: number) {
      ctx.clearRect(0, 0, W, H);

      // Left side: dark background for Mewtwo
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, W / 2, H);
      // Right side: light background for Mew
      ctx.fillStyle = "#f0f0f8";
      ctx.fillRect(W / 2, 0, W / 2, H);

      // Divider
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();

      // Subtle breathing animation
      const breathe = Math.sin(time * 0.002) * 2;

      // === Mewtwo (left, dark) ===
      const mCx = W * 0.25;
      const mCy = H * 0.45 + breathe;

      // Draw arm first (behind body? no - Mewtwo arm goes on top)
      // Body
      if (s.mewtwoBody?.complete) {
        ctx.drawImage(s.mewtwoBody, mCx - SPRITE / 2, mCy - SPRITE / 2, SPRITE, SPRITE);
      }
      // Arm pointing left (aimAngle = -PI)
      if (s.mewtwoArm?.complete) {
        const armSize = SPRITE * 0.5;
        const pivotX = mCx + 0.024 * SPRITE;
        const pivotY = mCy + 0.38 * SPRITE - SPRITE / 2;
        const rotation = -Math.PI - Math.PI - 0.2;
        ctx.save();
        ctx.translate(pivotX, pivotY);
        ctx.rotate(rotation);
        ctx.drawImage(s.mewtwoArm, -armSize / 2, -armSize / 2, armSize, armSize);
        ctx.restore();
      }

      // Label
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#c084fc";
      ctx.textAlign = "center";
      ctx.fillText("Mewtwo", mCx, H - 30);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#888";
      ctx.fillText("dark mode", mCx, H - 14);

      // === Mew (right, light) ===
      const eCx = W * 0.75;
      const eCy = H * 0.45 + breathe;

      // Tail behind body for Mew
      if (s.mewTail?.complete) {
        const tailSize = SPRITE * 1.1;
        const pivotX = eCx + 0.03 * SPRITE;
        const pivotY = eCy + 0.52 * SPRITE - SPRITE / 2;
        const rotation = -Math.PI - Math.PI - 0.65;
        ctx.save();
        ctx.translate(pivotX, pivotY);
        ctx.rotate(rotation);
        ctx.drawImage(s.mewTail, -tailSize / 2, -tailSize / 2, tailSize, tailSize);
        ctx.restore();
      }
      // Body on top
      if (s.mewBody?.complete) {
        ctx.drawImage(s.mewBody, eCx - SPRITE / 2, eCy - SPRITE / 2, SPRITE, SPRITE);
      }

      // Label
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#7c3aed";
      ctx.textAlign = "center";
      ctx.fillText("Mew", eCx, H - 30);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#666";
      ctx.fillText("light mode", eCx, H - 14);

      stateRef.current.animId = requestAnimationFrame(draw);
    }

    stateRef.current.animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(stateRef.current.animId);
  }, []);

  return (
    <div style={{ margin: "1.5em 0" }}>
      <canvas
        ref={canvasRef}
        width={700}
        height={280}
        style={{
          width: "100%",
          maxWidth: 700,
          display: "block",
          margin: "0 auto",
          borderRadius: 8,
          border: "1px solid #333",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
