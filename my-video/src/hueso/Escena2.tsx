import { Audio } from "@remotion/media";
import { interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionBars, clamp, Drop, Fade, LabelChip } from "../pixel/Chrome";
import { PX, T } from "../pixel/theme";
import { BoneBuddy, BUDDY_H, Cast, FloorShadow, JOIN, Plate } from "./sprites";
import { cue, voiceFrames } from "./voice";
import { VOICEOVER } from "./voiceover.gen";

// Script 00:07–00:15 — split screen: primary healing (rigid plate) vs secondary healing (colourful cast that wiggles).
// Stacked top/bottom instead of left/right so each bone keeps its full size on a 9:16 screen.
const LEAD = 4;
const TAIL = 45; // hold the comparison after the line ends
const X = 180; // left edge of each bone pair
export const escena2Frames = (fps: number) => LEAD + voiceFrames("escena2", fps) + TAIL;

// Halves start apart and are squeezed together when the plate lands — then nothing moves.
const RigidPair: React.FC<{ y: number; squeezeAt: number; blinkAt: number }> = ({ y, squeezeAt, blinkAt }) => {
  const frame = useCurrentFrame();
  const gap = interpolate(frame, [squeezeAt, squeezeAt + 4], [4 * PX, 0], clamp);
  return (
    <>
      <div style={{ position: "absolute", left: X - gap, top: y }}>
        <BoneBuddy side="a" bandaid={false} lookAt={0} blinks={[blinkAt]} />
      </div>
      <div style={{ position: "absolute", left: X + JOIN + gap, top: y }}>
        <BoneBuddy side="b" bandaid={false} lookAt={0} blinks={[blinkAt]} />
      </div>
    </>
  );
};

// A small gap under the cast; the halves jiggle against each other (relative stability).
const FlexiblePair: React.FC<{ y: number; blinkAt: number }> = ({ y, blinkAt }) => {
  const frame = useCurrentFrame();
  const jiggle = Math.floor(frame / 6) % 2 ? PX : 0;
  return (
    <>
      <div style={{ position: "absolute", left: X, top: y + jiggle }}>
        <BoneBuddy side="a" bandaid={false} lookAt={0} blinks={[blinkAt]} />
      </div>
      <div style={{ position: "absolute", left: X + JOIN + 2 * PX, top: y + PX - jiggle }}>
        <BoneBuddy side="b" bandaid={false} lookAt={0} blinks={[blinkAt]} />
      </div>
      {/* wiggle marks above the cast */}
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 474 + i * 102,
            top: y + 30 + (Math.floor(frame / 6 + i) % 2) * PX,
            width: 3 * PX,
            height: PX,
            background: T.ink,
          }}
        />
      ))}
    </>
  );
};

export const Escena2: React.FC = () => {
  const { fps } = useVideoConfig();
  const at = (word: string) => cue("escena2", word, fps, LEAD);
  const end = escena2Frames(fps);
  const TOP = 720;
  const BOTTOM = 1210;

  return (
    <>
      <Audio name="Voz escena 2" src={staticFile(VOICEOVER.escena2.file)} from={LEAD} />
      <Fade from={0} to={end}>
        <Fade from={at("esto") - 3}>
          <CaptionBars lines={["ESTO DECIDE SI SERÁ", "*PRIMARIA* O _SECUNDARIA_"]} />
        </Fade>

        {/* divider between the two halves */}
        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 1080,
            height: PX,
            backgroundImage: `repeating-linear-gradient(90deg, ${T.ink} 0 18px, transparent 18px 30px)`,
            opacity: 0.5,
          }}
        />

        {/* Top: primary — rigid plate, zero movement */}
        <Fade from={at("decide")}>
          <div style={{ position: "absolute", left: 540, top: 640, translate: "-50% 0" }}>
            <LabelChip color={T.chipYellow}>PRIMARIA · RÍGIDA</LabelChip>
          </div>
          <FloorShadow x={X + 18} y={TOP + BUDDY_H - 18} />
          <FloorShadow x={X + JOIN + 18} y={TOP + BUDDY_H - 18} />
          <RigidPair y={TOP} squeezeAt={at("primaria") + 6} blinkAt={end - 20} />
        </Fade>
        <Drop at={at("primaria")} x={432} y={TOP + 14 * PX}>
          <Plate />
        </Drop>

        {/* Bottom: secondary — colourful cast, a little movement */}
        <Fade from={at("secundaria") - 6}>
          <div style={{ position: "absolute", left: 540, top: 1130, translate: "-50% 0" }}>
            <LabelChip color={T.chipCyan}>SECUNDARIA · FLEXIBLE</LabelChip>
          </div>
          <FloorShadow x={X + 18} y={BOTTOM + BUDDY_H - 18} />
          <FloorShadow x={X + JOIN + 30} y={BOTTOM + BUDDY_H - 18} />
          <FlexiblePair y={BOTTOM} blinkAt={end - 30} />
        </Fade>
        <Drop at={at("secundaria")} x={456} y={BOTTOM + 10 * PX}>
          <Cast />
        </Drop>
      </Fade>
    </>
  );
};
