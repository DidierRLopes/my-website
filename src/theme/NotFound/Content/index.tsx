import React, { useState, useEffect } from "react";

export default function NotFoundContent({ className }: { className?: string }) {
  const [showPlay, setShowPlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPlay(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`container margin-vert--xl ${className || ""}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            marginBottom: 8,
          }}
        >
          PAGE NOT FOUND
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.7,
            marginBottom: 32,
          }}
        >
          In the meantime..
        </p>
        {/* Saw-style grimy portable CRT TV */}
        <div style={{
          position: "relative",
          display: "inline-block",
          maxWidth: 400,
          width: "88%",
        }}>
          {/* TV body — dark, chunky, boxy plastic */}
          <div style={{
            background: "linear-gradient(160deg, #2a2a2a, #1a1a1a, #111)",
            borderRadius: 8,
            padding: "18px 18px 0 18px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
            border: "2px solid #0a0a0a",
            position: "relative",
          }}>
            {/* Scuff marks / grime texture */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 8,
              background: "radial-gradient(ellipse at 70% 30%, rgba(60,55,45,0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(50,45,35,0.1) 0%, transparent 40%)",
              pointerEvents: "none",
            }} />

            {/* Screen recessed area */}
            <div style={{
              background: "#080808",
              borderRadius: 6,
              padding: 6,
              boxShadow: "inset 0 3px 12px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.03)",
            }}>
              {/* CRT screen with convex bulge effect */}
              <div style={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 0 20px rgba(0,40,0,0.3)",
              }}>
                <img
                  src="/img/saw.gif"
                  alt=""
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: 4,
                    filter: "contrast(1.1) brightness(0.9) saturate(0.8)",
                  }}
                />
                {/* Green-ish CRT tint */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: 4,
                  background: "rgba(0, 30, 10, 0.12)",
                  pointerEvents: "none",
                }} />
                {/* Scanlines */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: 4,
                  background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)",
                  pointerEvents: "none",
                }} />
                {/* CRT vignette — dark edges */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: 4,
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.5), inset 0 0 120px rgba(0,0,0,0.2)",
                  pointerEvents: "none",
                }} />
                {/* Screen glare — subtle convex reflection */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: 4,
                  background: "radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.06) 0%, transparent 50%)",
                  pointerEvents: "none",
                }} />
                {/* Flicker animation overlay */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: 4,
                  animation: "crtFlicker 4s infinite",
                  pointerEvents: "none",
                }} />
              </div>
            </div>

            {/* Bottom control strip */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 8px 12px 8px",
            }}>
              {/* Left — brand emboss area */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                {/* Fake brand text */}
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#333",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}>CRT-404</span>
              </div>

              {/* Right — control buttons + knobs */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                {/* Power LED — dim red */}
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#ff2222",
                  boxShadow: "0 0 4px rgba(255,30,30,0.6), 0 0 8px rgba(255,30,30,0.3)",
                }} />
                {/* CH- button */}
                <div style={{
                  width: 22, height: 12,
                  background: "linear-gradient(180deg, #3a3a3a, #222)",
                  borderRadius: 2, border: "1px solid #111",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 5, color: "#555", fontFamily: "monospace", fontWeight: 700 }}>CH-</span>
                </div>
                {/* CH+ button */}
                <div style={{
                  width: 22, height: 12,
                  background: "linear-gradient(180deg, #3a3a3a, #222)",
                  borderRadius: 2, border: "1px solid #111",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 5, color: "#555", fontFamily: "monospace", fontWeight: 700 }}>CH+</span>
                </div>
                {/* PLAY button — appears after 3 seconds, glowing and clickable */}
                <a
                  href="/game"
                  style={{
                    width: 44,
                    height: 18,
                    background: showPlay
                      ? "linear-gradient(180deg, #cc2222, #881111)"
                      : "linear-gradient(180deg, #3a3a3a, #222)",
                    borderRadius: 3,
                    border: showPlay ? "1px solid #ff4444" : "1px solid #111",
                    boxShadow: showPlay
                      ? "0 0 8px rgba(255,30,30,0.6), 0 0 16px rgba(255,30,30,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                      : "inset 0 1px 0 rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    textDecoration: "none",
                    cursor: showPlay ? "pointer" : "default",
                    transition: "all 0.5s ease",
                    animation: showPlay ? "playBtnPulse 2s infinite" : "none",
                  }}
                >
                  {/* Play triangle */}
                  <div style={{
                    width: 0, height: 0,
                    borderLeft: `6px solid ${showPlay ? "#fff" : "#555"}`,
                    borderTop: "4px solid transparent",
                    borderBottom: "4px solid transparent",
                    transition: "border-color 0.5s ease",
                  }} />
                  <span style={{
                    fontSize: 7,
                    color: showPlay ? "#fff" : "#555",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: 1,
                    transition: "color 0.5s ease",
                  }}>PLAY</span>
                </a>
                {/* Volume dial */}
                <div style={{
                  width: 20, height: 20,
                  borderRadius: "50%",
                  background: "linear-gradient(145deg, #444, #222)",
                  border: "1px solid #111",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute", top: 3, left: "50%",
                    width: 1.5, height: 6, background: "#666",
                    transform: "translateX(-50%) rotate(-30deg)", borderRadius: 1,
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Spacer below TV */}
        <div style={{ height: 30 }} />
      </div>
      <style>{`
        @keyframes playBtnPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(255,30,30,0.6), 0 0 16px rgba(255,30,30,0.3), inset 0 1px 0 rgba(255,255,255,0.15); }
          50% { box-shadow: 0 0 12px rgba(255,30,30,0.8), 0 0 24px rgba(255,30,30,0.5), inset 0 1px 0 rgba(255,255,255,0.2); }
        }
        @keyframes crtFlicker {
          0%, 95%, 100% { opacity: 0; }
          96% { opacity: 0.03; background: rgba(200,255,200,0.5); }
          97% { opacity: 0; }
          98% { opacity: 0.02; background: rgba(200,255,200,0.3); }
        }
      `}</style>
    </main>
  );
}
