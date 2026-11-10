import { AbsoluteFill, Series, useVideoConfig } from "remotion";
import { FooterChip, TitlePlaque } from "../pixel/Chrome";
import { ART, T } from "../pixel/theme";
import { Escena1, escena1Frames } from "./Escena1";
import { Escena2, escena2Frames } from "./Escena2";

export const huesoFrames = (fps: number) => escena1Frames(fps) + escena2Frames(fps);

// Bone-healing video: scenes in sequence under the fixed chrome (DESIGN.md §5).
export const HuesoVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: ART.pastel }}>
      <Series>
        <Series.Sequence name="Escena 1" durationInFrames={escena1Frames(fps)}>
          <Escena1 />
        </Series.Sequence>
        <Series.Sequence name="Escena 2" durationInFrames={escena2Frames(fps)}>
          <Escena2 />
        </Series.Sequence>
      </Series>
      <TitlePlaque title="CURA" gold="ÓSEA" accent={T.cat1} />
      <FooterChip label="CONSOLIDACIÓN ÓSEA" note="CONTENIDO EDUCATIVO" />
    </AbsoluteFill>
  );
};
