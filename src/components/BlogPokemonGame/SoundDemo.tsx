import React, { useRef, useState, useCallback, useEffect } from "react";

interface SoundDef {
  name: string;
  file: string;
  emoji: string;
  color: string;
  note?: string;
}

const SOUNDS: SoundDef[] = [
  { name: "Explosion", file: "explosion", emoji: "💥", color: "#ef4444", note: "Pitch varies with chain kills" },
  { name: "Hyperbeam", file: "hyperbeam", emoji: "⚡", color: "#facc15" },
  { name: "Ice Beam", file: "icebeam", emoji: "❄️", color: "#8cddff" },
  { name: "Psystrike", file: "psystrike", emoji: "🔮", color: "#a855f7" },
  { name: "Recover", file: "recover", emoji: "💚", color: "#4ade80" },
];

const AUDIO_BASE = "/audio/pokemon/";

export default function SoundDemo() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Record<string, AudioBuffer>>({});
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const recentDestroysRef = useRef<number[]>([]);
  const activeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy-init AudioContext and pre-fetch all buffers on first interaction
  const ensureAudio = useCallback(async () => {
    if (audioCtxRef.current && loaded) return audioCtxRef.current;

    const ctx = audioCtxRef.current || new AudioContext();
    audioCtxRef.current = ctx;

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (!loaded) {
      const fetches = SOUNDS.map(async (s) => {
        try {
          const resp = await fetch(`${AUDIO_BASE}${s.file}.mp3`);
          const arrayBuf = await resp.arrayBuffer();
          const audioBuf = await ctx.decodeAudioData(arrayBuf);
          buffersRef.current[s.file] = audioBuf;
        } catch {
          // Silently ignore fetch failures
        }
      });
      await Promise.all(fetches);
      setLoaded(true);
    }

    return ctx;
  }, [loaded]);

  const playSound = useCallback(
    async (name: string, volume = 0.5, playbackRate = 1.0) => {
      const ctx = await ensureAudio();
      if (!ctx || mutedRef.current) return;
      const buffer = buffersRef.current[name];
      if (!buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = playbackRate;
      const gain = ctx.createGain();
      gain.gain.value = volume;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
    },
    [ensureAudio],
  );

  const handleClick = useCallback(
    async (sound: SoundDef) => {
      // For explosion: chain-kill pitch logic matching the actual game
      if (sound.file === "explosion") {
        const now = performance.now();
        recentDestroysRef.current.push(now);
        recentDestroysRef.current = recentDestroysRef.current.filter(
          (t) => now - t < 500,
        );
        const count = recentDestroysRef.current.length;
        const vol = Math.min(0.5, 0.1 + (count - 1) * 0.08);
        const rate = Math.min(1.5, 1.0 + (count - 1) * 0.06);
        await playSound("explosion", vol, rate);
      } else {
        await playSound(sound.file, 0.5, 1.0);
      }

      // Visual pulse indicator
      setActiveSound(sound.file);
      if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
      activeTimerRef.current = setTimeout(() => setActiveSound(null), 300);
    },
    [playSound],
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      style={{
        margin: "1.5em 0",
        background: "#222",
        borderRadius: 10,
        padding: "1.2em 1em",
        border: "1px solid #333",
        position: "relative",
        fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
      }}
    >
      {/* Mute toggle */}
      <button
        type="button"
        onClick={() => { mutedRef.current = !mutedRef.current; setMuted(mutedRef.current); }}
        aria-label={muted ? "Unmute sounds" : "Mute sounds"}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: muted ? "#ffffff18" : "#ffffff10",
          border: muted ? "1px solid #ef4444" : "1px solid #555",
          borderRadius: 6,
          padding: "4px 8px",
          cursor: "pointer",
          fontSize: "1.1em",
          color: muted ? "#ef4444" : "#ccc",
          transition: "all 0.15s ease",
          lineHeight: 1,
        }}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Label */}
      <div
        style={{
          textAlign: "center",
          color: "#999",
          fontSize: "0.75em",
          marginBottom: "0.8em",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        Game Sounds — click to play
      </div>

      {/* Sound buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "0.6em",
        }}
      >
        {SOUNDS.map((s) => {
          const isActive = activeSound === s.file;
          return (
            <button
              type="button"
              key={s.file}
              onClick={() => handleClick(s)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                padding: "10px 14px",
                borderRadius: 8,
                background: isActive ? s.color + "35" : s.color + "15",
                border: isActive
                  ? `2px solid ${s.color}`
                  : `1px solid ${s.color}44`,
                cursor: "pointer",
                color: "inherit",
                fontFamily: "inherit",
                fontSize: "0.8em",
                transition: "all 0.12s ease",
                transform: isActive ? "scale(1.08)" : "scale(1)",
                boxShadow: isActive
                  ? `0 0 12px ${s.color}55`
                  : "none",
                minWidth: 90,
              }}
            >
              <span style={{ fontSize: "1.4em", lineHeight: 1 }}>
                {s.emoji}
              </span>
              <strong style={{ color: s.color, fontSize: "0.95em" }}>
                {s.name}
              </strong>
              {s.note && (
                <span
                  style={{
                    fontSize: "0.7em",
                    color: "#888",
                    marginTop: 2,
                    lineHeight: 1.2,
                    maxWidth: 100,
                    textAlign: "center",
                  }}
                >
                  {s.note}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Muted indicator */}
      {muted && (
        <div
          style={{
            textAlign: "center",
            marginTop: "0.6em",
            fontSize: "0.7em",
            color: "#ef4444",
            opacity: 0.7,
          }}
        >
          Sound muted
        </div>
      )}
    </div>
  );
}
