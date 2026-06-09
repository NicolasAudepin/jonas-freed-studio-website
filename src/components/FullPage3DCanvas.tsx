import "./FullPage3DCanvas.css";
import "../index.css";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useContext } from "react";
// import * as THREE from "three";
// import { Box } from "@react-three/drei";
// import {
//   Bloom,
//   DepthOfField,
//   EffectComposer,
//   Noise,
//   Vignette,
// } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";
import {
  DotScreen,
  EffectComposer,
  Pixelation,
  Glitch,
  ChromaticAberration,
  Outline,
} from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { DAContext } from "./DAContext";

// import { logoBlockWidth } from "./Title";
// import { Children } from "react"

function logoBlockWidth() {
  const blockWidth = Math.min(window.innerHeight / 4, window.innerWidth / 7);
  return blockWidth;
}

function CamFov() {
  const [fov, setFov] = useState(20);
  const { camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      const title_angle = Math.PI / 6;

      const cam_dist = (2 * logoBlockWidth()) / Math.tan(title_angle / 2);

      // const ratio =
      //   Math.tan(title_angle) +
      //   (window.innerHeight - 4 * logoBlockWidth()) / cam_dist;
      const ratio =
        Math.tan(title_angle) +
        (window.innerHeight / (4 * logoBlockWidth()) - 1) *
          2 *
          Math.tan(title_angle / 2) *
          3;

      const f = (Math.atan(ratio) * 180) / Math.PI;
      setFov(f);
      console.log(f);
      // console.log(ratio);
      camera.fov = f;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <></>;
}

const PostProcessingDA = () => {
  const { currentDA } = useContext(DAContext);
  return (
    <EffectComposer>
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
      {currentDA() == "wikiutopist" && <Pixelation granularity={20} />}

      <Outline />
    </EffectComposer>
  );
};

const FullPageCanvas = (props) => {
  const { currentDA } = useContext(DAContext);
  return (
    <Canvas
      className=" fullpagecanvas passthrough-total"
      style={{
        left: "0%",
        right: "0%",
        top: "0%",

        position: "fixed",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
      camera={{ fov: 30 }}
    >
      <PostProcessingDA />
      <CamFov />
      <ambientLight
        intensity={currentDA() == "printedpress" ? 2.5 : 1}
        color={"#ffffff"}
      />
      <directionalLight position={[0, -3, 1]} intensity={4} color={"#ff71e7"} />
      <directionalLight position={[-3, 1, 0]} intensity={5} color={"#00eeff"} />
      <directionalLight position={[3, 1, 0]} intensity={5} color={"#ff7300"} />

      {props.children}
    </Canvas>
  );
};

export default FullPageCanvas;
