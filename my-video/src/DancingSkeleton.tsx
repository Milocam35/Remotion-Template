import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

const BONE = "#f4efe1";
const HOLE = "#160b26";
const BPM = 120;

type P = [number, number];

// Dog-bone shape between two points: a shaft plus two knobs at each end.
const Bone: React.FC<{ a: P; b: P; w: number }> = ({ a, b, w }) => {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const nx = (-(b[1] - a[1]) / len) * w * 0.45;
  const ny = ((b[0] - a[0]) / len) * w * 0.45;
  const r = w * 0.55;
  return (
    <g fill={BONE}>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={BONE} strokeWidth={w} />
      <circle cx={a[0] + nx} cy={a[1] + ny} r={r} />
      <circle cx={a[0] - nx} cy={a[1] - ny} r={r} />
      <circle cx={b[0] + nx} cy={b[1] + ny} r={r} />
      <circle cx={b[0] - nx} cy={b[1] - ny} r={r} />
    </g>
  );
};

// Two-bone IK: knee position that keeps the foot planted; knees bend outward (side s = -1 left, 1 right).
const knee = (hip: P, foot: P, s: number, thigh = 115, shin = 110): P => {
  const dx = foot[0] - hip[0];
  const dy = foot[1] - hip[1];
  const d = Math.min(Math.hypot(dx, dy), thigh + shin - 1);
  const alpha = Math.acos((thigh * thigh + d * d - shin * shin) / (2 * thigh * d));
  const theta = Math.atan2(dy, dx) - s * alpha;
  return [hip[0] + thigh * Math.cos(theta), hip[1] + thigh * Math.sin(theta)];
};

export const DancingSkeleton: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = (frame / fps) * (BPM / 60) * Math.PI; // one left/right cycle every 2 beats
  const hit = 1 - Math.abs(Math.sin(t)); // 1 on every beat, 0 between beats
  const pelvis: P = [30 * Math.sin(t / 2), -200 + 28 * hit];
  const tilt = -6 * Math.sin(t / 2);
  const headTilt = 9 * Math.sin(t);
  const jaw = 10 * (1 - hit); // jaw clacks shut on the beat

  const sides = [-1, 1];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #3b1f6b 0%, #12081f 70%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 35% 75% at 50% 15%, rgba(170,130,255,0.55), transparent 70%)",
          opacity: 0.35 + 0.65 * hit,
        }}
      />
      <svg
        viewBox="-320 -560 640 600"
        style={{ height: "92%", filter: "drop-shadow(0 0 16px rgba(170,140,255,0.6))" }}
      >
        <ellipse cx={pelvis[0]} cy={14} rx={140 + 30 * hit} ry={16} fill="black" opacity={0.45} />

        {sides.map((s) => {
          const lift = 40 * Math.max(0, Math.sin(t + (s > 0 ? Math.PI : 0)));
          const hip: P = [pelvis[0] + s * 36, pelvis[1] + 12];
          const ankle: P = [s * 80, -lift];
          const k = knee(hip, ankle, s);
          return (
            <g key={s}>
              <Bone a={hip} b={k} w={15} />
              <Bone a={k} b={ankle} w={13} />
              <Bone a={ankle} b={[ankle[0] + s * 34, ankle[1] + 4]} w={10} />
            </g>
          );
        })}

        <g transform={`translate(${pelvis[0]} ${pelvis[1]})`}>
          <path
            d="M -50 -8 Q -58 -34 -22 -26 Q 0 -38 22 -26 Q 58 -34 50 -8 Q 32 26 0 22 Q -32 26 -50 -8 Z"
            fill={BONE}
          />
          <ellipse cx={-20} cy={2} rx={9} ry={7} fill={HOLE} />
          <ellipse cx={20} cy={2} rx={9} ry={7} fill={HOLE} />

          <g transform={`rotate(${tilt})`}>
            {Array.from({ length: 9 }, (_, i) => (
              <rect key={i} x={-9} y={-36 - i * 15} width={18} height={11} rx={4} fill={BONE} />
            ))}
            {[44, 52, 54, 48].flatMap((w, i) =>
              sides.map((s) => {
                const y = -150 + i * 17;
                return (
                  <path
                    key={`${i}${s}`}
                    d={`M 0 ${y} C ${s * w * 0.9} ${y - 8}, ${s * w * 1.1} ${y + 18}, ${s * w * 0.55} ${y + 26}`}
                    stroke={BONE}
                    strokeWidth={7}
                    strokeLinecap="round"
                    fill="none"
                  />
                );
              }),
            )}
            <rect x={-6} y={-156} width={12} height={58} rx={5} fill={BONE} />

            {sides.map((s) => {
              // Arms pump in opposition: right arm up while the left foot lifts.
              const pump = s * Math.sin(t);
              const up = 1.35 + pump;
              const bend = 1.2 + 0.4 * pump;
              const sh: P = [s * 62, -158];
              const el: P = [sh[0] + s * 85 * Math.sin(up), sh[1] + 85 * Math.cos(up)];
              const hand: P = [el[0] + s * 80 * Math.sin(up + bend), el[1] + 80 * Math.cos(up + bend)];
              return (
                <g key={s}>
                  <Bone a={[s * 6, -166]} b={sh} w={8} />
                  <Bone a={sh} b={el} w={13} />
                  <Bone a={el} b={hand} w={11} />
                  <circle cx={hand[0]} cy={hand[1]} r={12} fill={BONE} />
                </g>
              );
            })}

            <rect x={-8} y={-182} width={16} height={10} rx={4} fill={BONE} />
            <rect x={-8} y={-196} width={16} height={10} rx={4} fill={BONE} />

            <g transform={`translate(0 -200) rotate(${headTilt})`}>
              <ellipse cx={0} cy={-62} rx={50} ry={52} fill={BONE} />
              <rect x={-34} y={-40} width={68} height={36} rx={14} fill={BONE} />
              {sides.map((s) => (
                <g key={s}>
                  <ellipse cx={s * 19} cy={-55} rx={14} ry={16} fill={HOLE} />
                  <circle cx={s * 19} cy={-53} r={3 + 2 * hit} fill="#5ef2ff" />
                </g>
              ))}
              <path d="M 0 -36 L -7 -24 L 7 -24 Z" fill={HOLE} />
              {[-18, -9, 0, 9, 18].map((x) => (
                <line key={x} x1={x} y1={-14} x2={x} y2={-4} stroke={HOLE} strokeWidth={2} />
              ))}
              <g transform={`translate(0 ${jaw})`}>
                <path d="M -30 -6 L 30 -6 L 26 10 Q 0 22 -26 10 Z" fill={BONE} />
                {[-18, -9, 0, 9, 18].map((x) => (
                  <line key={x} x1={x} y1={-6} x2={x} y2={3} stroke={HOLE} strokeWidth={2} />
                ))}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
