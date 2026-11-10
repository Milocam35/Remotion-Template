import { Audio } from "@remotion/media";
import { staticFile, useVideoConfig } from "remotion";
import { CaptionBars, Drop, Fade, LabelChip } from "../pixel/Chrome";
import { T } from "../pixel/theme";
import { BoneBuddy, Bubble, BUDDY_H, FloorShadow, Ruler, Thermometer } from "./sprites";
import { cue, voiceFrames } from "./voice";
import { VOICEOVER } from "./voiceover.gen";

// Script 00:00–00:07 — two broken bone buddies look at each other; a ruler and a smiling thermometer appear above.
// Its voice-over runs to "…estabilidad mecánica tienen." (the ruler/thermometer beat), so it lasts as long as that line.
const LEAD = 12; // both buddies land before the voice starts
const TAIL = 10;
const FLOOR = 1500;
export const escena1Frames = (fps: number) => LEAD + voiceFrames("escena1", fps) + TAIL;

export const Escena1: React.FC = () => {
  const { fps } = useVideoConfig();
  const at = (word: string) => cue("escena1", word, fps, LEAD);
  const end = escena1Frames(fps);

  return (
    <>
      <Audio name="Voz escena 1" src={staticFile(VOICEOVER.escena1.file)} from={LEAD} />
      <Fade from={-6} to={end}>
        <Fade from={at("sabes") - 3} to={at("no")}>
          <CaptionBars lines={["¿SABES CÓMO CURA", "UN *HUESO ROTO*?"]} />
        </Fade>
        <Fade from={at("no")} to={at("todo")}>
          <CaptionBars lines={["NO SIEMPRE OCURRE", "DE LA MISMA MANERA"]} />
        </Fade>
        <Fade from={at("todo")}>
          <CaptionBars lines={["TODO DEPENDE DE 2 COSAS:", "*SEPARACIÓN* + _ESTABILIDAD_"]} />
        </Fade>

        {/* "qué tan juntos quedan los fragmentos" → ruler; "cuánta estabilidad" → thermometer */}
        <Fade from={at("fragmentos")}>
          <div style={{ position: "absolute", left: 300, top: 660, translate: "-50% 0" }}>
            <LabelChip color={T.chipYellow}>SEPARACIÓN</LabelChip>
          </div>
        </Fade>
        <Drop at={at("qué")} x={84} y={816} bob={20}>
          <Ruler />
        </Drop>
        <Fade from={at("estabilidad")}>
          <div style={{ position: "absolute", left: 780, top: 660, translate: "-50% 0" }}>
            <LabelChip color={T.chipCyan}>ESTABILIDAD</LabelChip>
          </div>
        </Fade>
        <Drop at={at("cuánta")} x={720} y={720} bob={20} phase={1}>
          <Thermometer fillAt={at("estabilidad")} blinkAt={at("tienen") + 6} />
        </Drop>

        <FloorShadow x={102} y={FLOOR - 18} />
        <FloorShadow x={618} y={FLOOR - 18} />
        <Drop at={0} x={84} y={FLOOR - BUDDY_H} bob={15}>
          <BoneBuddy side="a" hopAt={at("cura")} lookAt={at("cura")} lookUpAt={at("qué")} blinks={[at("manera")]} />
        </Drop>
        <Drop at={6} x={600} y={FLOOR - BUDDY_H} bob={15} phase={1}>
          <BoneBuddy side="b" hopAt={at("roto")} lookAt={at("cura")} lookUpAt={at("qué")} blinks={[at("manera")]} />
        </Drop>
        <Bubble at={at("cura")} to={at("no")} x={222} y={1224} />
        <Bubble at={at("roto")} to={at("no")} x={780} y={1224} />
      </Fade>
    </>
  );
};
