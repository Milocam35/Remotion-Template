import { Easing, interpolate, useCurrentFrame } from "remotion";
import { clamp, pixelText } from "../pixel/Chrome";
import { outlined, Paint, Sprite } from "../pixel/Sprite";
import { ART, PX, q, T } from "../pixel/theme";

// ---------- Bone buddy: 66×40 cells, knob on the left, jagged fracture on the right ----------
// Side "b" uses the complementary zigzag and is mirrored, so a b-buddy placed 55 cells right of an a-buddy interlocks with it.
const buddyPaint = (inverted: boolean, bandaid: boolean): Paint => {
  const fracture = (y: number) => {
    const z = Math.abs(((y - 12) % 6) - 3);
    return 58 + (inverted ? 3 - z : z);
  };
  const inBone = (x: number, y: number) => {
    const cx = x + 0.5;
    const cy = y + 0.5;
    const lobe = (ly: number) => (cx - 11) ** 2 + (cy - ly) ** 2 <= 100;
    return lobe(11) || lobe(29) || (cx >= 8 && y >= 12 && y <= 27 && x <= fracture(y));
  };
  const strip = (x: number, y: number, deg: number) => {
    const t = (deg * Math.PI) / 180;
    const dx = x + 0.5 - 49;
    const dy = y + 0.5 - 20;
    const u = dx * Math.cos(t) + dy * Math.sin(t);
    const v = -dx * Math.sin(t) + dy * Math.cos(t);
    if (Math.abs(u) > 8 || Math.abs(v) > 2.5) return null;
    return Math.abs(u) <= 2.5 ? ART.bandPad : ART.band;
  };
  const body = outlined(
    inBone,
    (x, y) => {
      const band = bandaid ? (strip(x, y, 40) ?? strip(x, y, -40)) : null;
      if (band) return band;
      if (y >= 12 && y <= 27 && x >= fracture(y) - 1) return ART.boneBreak;
      if (!inBone(x, y + 2)) return ART.boneShade;
      if (!inBone(x, y - 2)) return ART.boneLight;
      return ART.bone;
    },
    T.ink,
  );
  const leg = (x: number, y: number) =>
    (y >= 28 && y <= 37 && (x === 26 || x === 27 || x === 44 || x === 45)) ||
    (y >= 38 && ((x >= 26 && x <= 29) || (x >= 44 && x <= 47)));
  return (x, y) => body(x, y) ?? (leg(x, y) ? T.ink : null);
};
const PAINTS = {
  a: buddyPaint(false, true),
  b: buddyPaint(true, true),
  aBare: buddyPaint(false, false),
  bBare: buddyPaint(true, false),
};

export const BUDDY_W = 66 * PX;
export const BUDDY_H = 40 * PX;
export const JOIN = 55 * PX; // x offset of a b-buddy that touches an a-buddy

export const BoneBuddy: React.FC<{
  side: "a" | "b";
  bandaid?: boolean;
  hopAt?: number;
  lookAt?: number; // looks at the other buddy from this frame
  lookUpAt?: number;
  blinks?: number[];
}> = ({ side, bandaid = true, hopAt = -99, lookAt = Infinity, lookUpAt = Infinity, blinks = [] }) => {
  const frame = useCurrentFrame();
  const [lx, ly] = frame >= lookUpAt ? [0, -1] : frame >= lookAt ? [1, 0] : [0, 0];
  const blink = blinks.some((b) => frame >= b && frame < b + 4);
  return (
    <div
      style={{
        scale: side === "b" ? "-1 1" : "1 1",
        translate: `0 ${q(interpolate(frame, [hopAt, hopAt + 4, hopAt + 8], [0, -24, 0], clamp))}px`,
      }}
    >
      <Sprite w={66} h={40} paint={PAINTS[bandaid ? side : side === "a" ? "aBare" : "bBare"]}>
        {[25, 31].map((ex) => (
          <g key={ex}>
            <rect x={ex + lx} y={15 + ly + (blink ? 2 : 0)} width={2} height={blink ? 1 : 3} fill={T.ink} />
            {blink ? null : <rect x={ex + lx + 1} y={15 + ly} width={1} height={1} fill={ART.white} />}
          </g>
        ))}
        <rect x={23} y={19} width={2} height={1} fill={ART.blush} />
        <rect x={34} y={19} width={2} height={1} fill={ART.blush} />
        <rect x={26} y={20} width={1} height={1} fill={T.ink} />
        <rect x={27} y={21} width={5} height={1} fill={T.ink} />
        <rect x={32} y={20} width={1} height={1} fill={T.ink} />
      </Sprite>
    </div>
  );
};

const shadowPaint: Paint = (x, y) =>
  ((x + 0.5 - 30) / 30) ** 2 + ((y + 0.5 - 3) / 3) ** 2 <= 1 ? ART.pastelShadow : null;
export const FloorShadow: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <Sprite w={60} h={6} paint={shadowPaint} />
  </div>
);

// ---------- Ruler: 72×12 cells ----------
const rulerPaint = outlined(
  (x, y) => x >= 0 && x < 72 && y >= 0 && y < 12,
  (x, y) => {
    if (x % 3 === 0 && y <= (x % 15 === 0 ? 6 : 3)) return T.ink;
    return y === 1 ? ART.rulerLight : y === 10 ? ART.rulerShade : T.cat1;
  },
  T.ink,
);
export const Ruler: React.FC = () => <Sprite w={72} h={12} paint={rulerPaint} />;

// ---------- Thermometer: 20×56 cells, mercury rises, face on the bulb ----------
const inBulb = (x: number, y: number) => (x + 0.5 - 10) ** 2 + (y + 0.5 - 47) ** 2 <= 64;
const thermoBody = outlined(
  (x, y) => {
    const cx = x + 0.5;
    const cy = y + 0.5;
    return (cx >= 6 && cx <= 14 && cy >= 4 && cy <= 44) || (cx - 10) ** 2 + (cy - 4) ** 2 <= 16 || inBulb(x, y);
  },
  (x, y) => {
    if (inBulb(x, y) && y >= 40) return x === 6 && y === 43 ? ART.white : T.cat3;
    return x === 7 ? ART.white : ART.glass;
  },
  T.ink,
);
const thermoPaint: Paint = (x, y) =>
  thermoBody(x, y) ?? (x >= 15 && y >= 8 && y <= 40 && y % 4 === 0 && x <= (y % 8 === 0 ? 17 : 16) ? T.ink : null);

export const Thermometer: React.FC<{ fillAt: number; blinkAt: number }> = ({ fillAt, blinkAt }) => {
  const frame = useCurrentFrame();
  const level = Math.round(
    interpolate(frame, [fillAt, fillAt + 40], [37, 8], { ...clamp, easing: Easing.out(Easing.cubic) }),
  );
  const blink = frame >= blinkAt && frame < blinkAt + 4;
  return (
    <Sprite w={20} h={56} paint={thermoPaint}>
      <rect x={8} y={level} width={4} height={40 - level} fill={T.cat3} />
      {[6, 12].map((ex) => (
        <g key={ex}>
          <rect x={ex} y={blink ? 46 : 45} width={2} height={blink ? 1 : 2} fill={T.ink} />
          {blink ? null : <rect x={ex + 1} y={45} width={1} height={1} fill={ART.white} />}
        </g>
      ))}
      <rect x={7} y={49} width={1} height={1} fill={T.ink} />
      <rect x={8} y={50} width={5} height={1} fill={T.ink} />
      <rect x={13} y={49} width={1} height={1} fill={T.ink} />
    </Sprite>
  );
};

// ---------- Metal plate with a stern "rigid protection" face: 34×12 cells ----------
const SCREWS = [2, 6, 25, 29];
const FACE = new Set([
  "11,2", "12,2", "13,3", "20,3", "21,2", "22,2", // furrowed brows
  "12,4", "13,4", "12,5", "13,5", "20,4", "21,4", "20,5", "21,5", // eyes
  "14,8", "15,8", "16,8", "17,8", "18,8", "19,8", // straight mouth
]);
const platePaint = outlined(
  (x, y) => x >= 0 && x < 34 && y >= 0 && y < 12,
  (x, y) => {
    const screw = SCREWS.find((s) => x >= s && x <= s + 2 && y >= 4 && y <= 6);
    if (screw !== undefined) return x === screw + 1 && y === 5 ? T.ink : T.clipDark;
    if (FACE.has(`${x},${y}`)) return T.ink;
    return y === 1 ? T.clipLight : y === 10 ? T.clipDark : T.clip;
  },
  T.ink,
);
export const Plate: React.FC = () => <Sprite w={34} h={12} paint={platePaint} />;

// ---------- Colourful cast: 30×22 cells, diagonal candy stripes ----------
const CAST = [T.cat1, T.cardBody, T.cat2, T.cardBody, T.cat3, T.cardBody, T.cat4, T.cardBody];
const castPaint = outlined(
  (x, y) => x >= 0 && x < 30 && y >= 0 && y < 22,
  (x, y) => (y === 1 ? ART.white : CAST[Math.floor((x + y) / 2) % CAST.length]),
  T.ink,
);
export const Cast: React.FC = () => <Sprite w={30} h={22} paint={castPaint} />;

// ---------- "?" bubble ----------
export const Bubble: React.FC<{ at: number; to: number; x: number; y: number }> = ({ at, to, x, y }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...pixelText,
        position: "absolute",
        left: x,
        top: y,
        width: 72,
        height: 72,
        boxSizing: "border-box",
        border: `${PX}px solid ${T.ink}`,
        boxShadow: `${PX}px ${PX}px 0 rgba(0,0,0,0.35)`,
        background: T.plaque,
        color: T.ink,
        fontSize: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: Math.min(interpolate(frame, [at, at + 8], [0, 1], clamp), interpolate(frame, [to - 6, to], [1, 0], clamp)),
        scale: interpolate(frame, [at, at + 8], [0.9, 1], clamp),
      }}
    >
      ?
    </div>
  );
};
