import { EffectComposer } from "@react-three/postprocessing";
import { useContext } from "react";
import { DAContext } from "./DAContext";

export const PostProcessingDA = ({ refsOutlined }) => {
  const { currentDA } = useContext(DAContext);
  // console.log(refsOutlined);
  return (
    <EffectComposer autoClear>
      {currentDA() == "printedpress" && (
        <DotScreen
          angle={Math.PI * 0.5} // angle of the dot pattern
          scale={0.2} // scale of the dot pattern
        />
      )}
      {currentDA() == "printedpress" && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.02, 0.002]} // color offset
        />
      )}
      {currentDA() == "datagalore" && <Pixelation granularity={20} />}
    </EffectComposer>
  );
};
