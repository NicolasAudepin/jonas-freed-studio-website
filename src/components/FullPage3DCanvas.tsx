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
import { PostProcessingDA } from "./PostpProcessingDA";

// import { logoBlockWidth } from "./Title";
// import { Children } from "react"

// TODO clean fov code
function CamFov() {
  const { camera } = useThree();
  const factor = 1;

  const handleResize = () => {
    // const f = Math.atan(window.innerHeight / factor) * (180 / Math.PI);
    const f = window.innerHeight / 15;

    camera.fov = f;
    console.log(f);
    return f;
  };
  handleResize();
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <></>;
}

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
            className="fullpagecanvas passthrough-total"
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
          // camera={{ fov: 30 }}
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
          {/* <gridHelper position={new Vector3(0, 1, 0)} />
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
          <axesHelper /> */}

          {props.children}
        </Canvas>
      </ErrorBoundary>
    </CanvasContext.Provider>
  );
};

export default FullPageCanvas;
