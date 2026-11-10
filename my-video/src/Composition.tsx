import { CalculateMetadataFunction, Composition } from "remotion";
import { DancingSkeleton } from "./DancingSkeleton";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="DancingSkeleton"
      component={DancingSkeleton}
      durationInFrames={240}
      fps={30}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  );
};
