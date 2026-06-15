import "./FullPage3DCanvas.css";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";

import { useThree } from "@react-three/fiber";

import { DAContext, DAProvider } from "./DAContext";
import { CanvasContext } from "./CanvasContext";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Camera, Color, Vector3 } from "three";
import { OrbitControls, useAnimations } from "@react-three/drei";
import { PostProcessingDA } from "./PostpProcessingDA";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
// import { logoBlockWidth } from "./Title";
// import { Children } from "react"

export const FullPageScene = (props) => {
  const state = useThree();

  const { currentDA, getStyleValue } = useContext(DAContext);

  let gltf;
  const map3Dobj = {};
  gltf = useLoader(GLTFLoader, import.meta.env.BASE_URL + "glb/Scene.glb");
  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });

  useEffect(() => {
    state.set({ camera: map3Dobj["Camera"] });
  }, [gltf.cameras, state.set]);

  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);

  const duration = useRef(0);
  const progress = 0;
  useEffect(() => {
    console.log(actions);
    actions["Cube.007"].reset().play().setLoop(THREE.LoopPingPong, Infinity);

    actions["Camera"].reset().play().setLoop(THREE.LoopPingPong, Infinity);
    actions["Camera"].paused = true;
    duration.current = actions["Camera"].getClip().duration;
  }, [actions]);

  useFrame(() => {
    const progress =
      window.pageYOffset / (document.body.scrollHeight - innerHeight);
    const time = progress * duration.current;
    actions["Camera"].time = progress;
  });


  setupLights();

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight
        intensity={currentDA() == "printedpress" ? 4 : 3}
        color={getStyleValue("--background-color")}
      />
      <primitive object={gltf.scene}></primitive>
    </>
  );

  function setupLights() {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    state.gl.shadowMap.enabled = true;

    map3Dobj["Sun005"].intensity = 7;
    map3Dobj["Sun005"].castShadow = true;
    map3Dobj["Point"].intensity = 7;
    map3Dobj["Point"].castShadow = true;

    map3Dobj["Sun005"].color = new Color(getStyleValue("--background-color"));
    map3Dobj["Point"].color = new Color(getStyleValue("--accent-color"));
  }
};

export function SafeFullPageScene() {
  return (
    <CanvasContext.Provider>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div role="alert" className="fullpagecanvas">
            <p>Something went wrong:</p>
            <pre>{getErrorMessage(error)}</pre>
          </div>
        )}
      >
        <Canvas
          className=" fullpagecanvas "
          style={{
            left: "0%",
            right: "0%",
            top: "0%",
            position: "fixed",
            pointerEvents: "all",
          }}
          // camera={{ fov: 30 }}
        >
          <FullPageScene />
        </Canvas>
      </ErrorBoundary>
    </CanvasContext.Provider>
  );
}
