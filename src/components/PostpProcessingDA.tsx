import { useContext } from "react";
import { DAContext } from "./DAContext";
import {
  DotScreen,
  EffectComposer,
  Pixelation,
  ChromaticAberration,
  Outline,
  SSAO,
  Bloom,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export const PostProcessingDA = () => {
  const { currentDA } = useContext(DAContext);
  return (
    <EffectComposer autoClear enableNormalPass>
      {/* <SSAO
        blendFunction={BlendFunction.MULTIPLY} // blend mode
        samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
        rings={4} // amount of rings in the occlusion sampling pattern
        bias={-0.4} // occlusion bias
        resolutionScale={0.5}
      /> */}
      <Bloom opacity={0.1}/>
    </EffectComposer>
  );
};
