import "./FullPage3DCanvas.css";
import "../index.css";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useContext, useCallback, useRef } from "react";

import { useThree } from "@react-three/fiber";
import {
  DotScreen,
  EffectComposer,
  Pixelation,
  ChromaticAberration,
  Outline,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { DAContext } from "./DAContext";
import { CanvasContext } from "./CanvasContext";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Camera, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";

// import { logoBlockWidth } from "./Title";
// import { Children } from "react"

function logoBlockWidth() {
  const blockWidth = Math.min(window.innerHeight / 4, window.innerWidth / 7);
  return blockWidth;
}

// TODO clean fov code
function CamFov() {
  const { camera } = useThree();

  const handleResize = () => {
    const title_angle = Math.PI / 6;

    const ratio =
      Math.tan(title_angle) +
      (window.innerHeight / (4 * logoBlockWidth()) - 1) *
        2 *
        Math.tan(title_angle / 2) *
        3;

    const f = (Math.atan(ratio) * 180) / Math.PI;
    // setFov(f);
    // console.log(f);

    // console.log(ratio);
    camera.fov = f;
    return f;
  };
  handleResize();
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <></>;
}

const PostProcessingDA = ({ refsOutlined }) => {
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

      {/* {refsOutlined.current && (
        <Outline
          // blendFunction={THREE.}
          selection={refsOutlined.current}
          width={100}
          visibleEdgeColor={"#AABBFF"}

        />
      )} */}
    </EffectComposer>
  );
};

const FullPageCanvas = (props) => {
  const refsOutlined = useRef<React.RefObject<THREE.Object3D>[]>([]);
  const ref = useRef(null);
  const register = useCallback((ref) => {
    if (!refsOutlined.current.includes(ref)) {
      refsOutlined.current.push(ref);
    }
    // console.log(refsOutlined);
  }, []);

  const unregister = useCallback((ref) => {
    refsOutlined.current = refsOutlined.current.filter((r) => r !== ref);
  }, []);
  const camDebug = new Camera();

  const { currentDA } = useContext(DAContext);
  return (
    <CanvasContext.Provider value={{ register, unregister }}>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div
            role="alert"
            // className="fullpagecanvas passthrough-total"
            style={{
              left: "0%",
              right: "0%",
              top: "0%",

              position: "fixed",
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              // pointerEvents: "none",
            }}
          >
            <p>Something went wrong:</p>
            <pre>{getErrorMessage(error)}</pre>
          </div>
        )}
      >
        <Canvas
          // className=" fullpagecanvas passthrough-total"
          style={{
            left: "0%",
            right: "0%",
            top: "0%",

            position: "fixed",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            // pointerEvents: "none",
          }}
          camera={{ fov: 30 }}
        >
          <PostProcessingDA refsOutlined={[ref]} />
          <CamFov />
          <OrbitControls />

          <ambientLight
            intensity={currentDA() == "printedpress" ? 4 : 1}
            color={"#ffffff"}
          />
          <directionalLight
            position={[0, -3, 1]}
            intensity={4}
            color={"#ff71e7"}
          />
          <directionalLight
            position={[-3, 1, 0]}
            intensity={5}
            color={"#00eeff"}
          />
          <directionalLight
            position={[3, 1, 0]}
            intensity={5}
            color={"#ff7300"}
          />
          {/* <gridHelper position={new Vector3(0, 0, 0)} /> */}
          <gridHelper position={new Vector3(0, 1, 0)} />
          <gridHelper position={new Vector3(0, -1, 0)} />
          <gridHelper
            position={new Vector3(1, 0, 0)}
            rotation={[0, 0, Math.PI / 2]}
          />
          <gridHelper
            position={new Vector3(-1, 0, 0)}
            rotation={[0, 0, Math.PI / 2]}
          />
          <gridHelper
            color2="red"
            color1="red"
            // args={color}:
            position={new Vector3(0, 0, -1)}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <cameraHelper args={[camDebug]}></cameraHelper>
          {/* <axesHelper /> */}

          {props.children}
        </Canvas>
      </ErrorBoundary>
    </CanvasContext.Provider>
  );
};

export default FullPageCanvas;
