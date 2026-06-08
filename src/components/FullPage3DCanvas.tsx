import "./FullPage3DCanvas.css";
import "../index.css";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
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
import { LightProbe } from "three";

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

const FullPageCanvas = (props) => {
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
      <CamFov />
      <ambientLight intensity={1} color={"#ffffff"} />
      <directionalLight position={[0, -3, 1]} intensity={3} color={"#ff87eb"} />
      <directionalLight position={[-3, 1, 0]} intensity={5} color={"#24ffff"} />
      <directionalLight position={[3, 1, 0]} intensity={5} color={"#ffa024"} />

      {props.children}
    </Canvas>
  );
};

export default FullPageCanvas;
