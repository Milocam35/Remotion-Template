import { Easing, interpolate, useCurrentFrame } from "remotion";
import { FONT, PX, q, T } from "./theme";

// DESIGN.md §4: pixel font thickened with a stroke drawn under the fill.
export const pixelText = {
  fontFamily: FONT,
  WebkitTextStroke: "0.035em currentColor",
  paintOrder: "stroke fill",
  lineHeight: 1,
  whiteSpace: "pre",
} as const;

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// DESIGN.md §5 — fixed chrome
export const TitlePlaque: React.FC<{ title: string; gold?: string; accent: string }> = ({ title, gold, accent }) => (
  <div style={{ position: "absolute", top: 202, left: "50%", translate: "-50% 0", boxShadow: `${PX}px ${PX}px 0 rgba(0,0,0,0.5)` }}>
    <div style={{ height: 20, background: accent }} />
    <div
      style={{
        ...pixelText,
        position: "relative",
        height: 156,
        padding: "0 80px",
        display: "flex",
        alignItems: "center",
        background: T.plaque,
        color: T.ink,
        fontSize: 84,
      }}
    >
      {title}
      {gold ? <span style={{ color: T.inkGold }}> {gold}</span> : null}
      <div
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 12,
          height: 3,
          backgroundImage: `repeating-linear-gradient(90deg, ${T.plaqueDash} 0 6px, transparent 6px 12px)`,
        }}
      />
    </div>
  </div>
);

const HL: Record<string, string> = { "*": T.hlYellow, _: T.hlCyan };
// `*word*` → yellow, `_word_` → cyan
const rich = (line: string) =>
  line.split(/(\*[^*]+\*|_[^_]+_)/).map((s, i) =>
    HL[s[0]] && s.length > 2 && s.endsWith(s[0]) ? (
      <span key={i} style={{ color: HL[s[0]] }}>
        {s.slice(1, -1)}
      </span>
    ) : (
      s
    ),
  );

export const CaptionBars: React.FC<{ lines: string[] }> = ({ lines }) => (
  <div style={{ position: "absolute", top: 432, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
    {lines.map((l) => (
      <div key={l} style={{ ...pixelText, fontSize: 42, lineHeight: "66px", padding: "0 18px", background: T.captionBg, color: T.captionText }}>
        {rich(l)}
      </div>
    ))}
  </div>
);

export const FooterChip: React.FC<{ label: string; note: string }> = ({ label, note }) => (
  <div
    style={{
      ...pixelText,
      position: "absolute",
      top: 1773,
      left: "50%",
      translate: "-50% 0",
      fontSize: 27,
      lineHeight: "39px",
      padding: "0 9px",
      background: T.footerBg,
      color: T.footerText,
    }}
  >
    <span style={{ color: T.hlCyan }}>{label}</span> · {note}
  </div>
);

export const LabelChip: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <div style={{ ...pixelText, fontSize: 27, padding: "6px 12px", background: T.chipBg, color }}>{children}</div>
);

// DESIGN.md §8 — motion
export const Fade: React.FC<{ from: number; to?: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: Math.min(
          interpolate(frame, [from, from + 6], [0, 1], clamp),
          to === undefined ? 1 : interpolate(frame, [to - 6, to], [1, 0], clamp),
        ),
      }}
    >
      {children}
    </div>
  );
};

// Drops 90px in 6 frames with opacity 0.3→1 and no bounce; `bob` adds a 1-pixel idle bob every `bob` frames after landing.
export const Drop: React.FC<{ at: number; x: number; y: number; bob?: number; phase?: number; children: React.ReactNode }> = ({
  at,
  x,
  y,
  bob,
  phase = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const idle = bob && frame >= at + 6 && Math.floor(frame / bob + phase) % 2 ? -PX : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: interpolate(frame, [at, at + 6], [0.3, 1], clamp),
        translate: `0 ${q(interpolate(frame, [at, at + 6], [-90, 0], { ...clamp, easing: Easing.out(Easing.cubic) })) + idle}px`,
      }}
    >
      {children}
    </div>
  );
};
