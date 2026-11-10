import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { HuesoVideo, huesoFrames } from "./hueso/Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="Hueso"
        component={HuesoVideo}
        durationInFrames={huesoFrames(30)}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
