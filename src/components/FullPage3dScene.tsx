import "./FullPage3DCanvas.css";
import { Canvas } from "@react-three/fiber";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  Suspense,
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
import { Perf } from "r3f-perf";
import LoadingScreen from "./LoadingScreen";
import { cleanupGltf } from "../modules/cleanupGltf";
import { CameraGlb } from "./CameraGlb";

const LightsGlb = () => {
  const state = useThree();

  const { currentDA, getStyleValue } = useContext(DAContext);

  const map3Dobj = {};
  // //this works
  let gltf;
  gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/Lights.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  function setupLights() {
    state.gl.shadowMap.enabled = true;
    state.gl.shadowMap.type = THREE.PCFShadowMap;

    map3Dobj["Sun005"].intensity = 7;
    map3Dobj["Sun005"].castShadow = true;

    map3Dobj["Sun005"].color.set(getStyleValue("--background-color"));
    // map3Dobj["Point"].color.set(getStyleValue("--accent-color"));
  }
  setupLights();

  return (
    <>
      <ambientLight
        intensity={currentDA() == "printedpress" ? 0 : 4}
        color={getStyleValue("--background-color")}
      />
      <primitive object={gltf.scene} />
    </>
  );
};
const StaticGlb = ({ path }) => {
  const gltf = useLoader(GLTFLoader, import.meta.env.BASE_URL + path);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

const LogoGlb = () => {
  const state = useThree();

  const map3Dobj = {};
  // //this works
  let gltf;
  gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/Logo.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  const { actions } = useAnimations(gltf.animations, gltf.scene);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    actions["Column.003Action"]
      .reset()
      .play()
      .setLoop(THREE.LoopRepeat, Infinity);
    // eslint-disable-next-line react-hooks/immutability
    actions["Column.003Action"].timeScale = 0.1;
  }, [actions]);

  return <primitive object={gltf.scene}></primitive>;
};

export function SafeFullPageScene({ children }) {
  const { has3DScene } = useContext(DAContext);
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert" className="fullpagecanvas">
          <p>Something went wrong:</p>
          <pre>{getErrorMessage(error)}</pre>
        </div>
      )}
    >
      <LoadingScreen />
      <Canvas
        className=" fullpagecanvas "
        style={{
          left: has3DScene ? "0%" : "100vw",
          // right: "0%",
          top: "0%",
          position: "fixed",
          pointerEvents: "all",
        }}
      >
        <Suspense>
          {/* <Perf position="bottom-left" /> */}
          <CameraGlb />
          <LogoGlb />
          <LightsGlb />
          <StaticGlb path="glb/Scene1/blocks.glb" />
          <StaticGlb path="glb/Scene1/Basil.glb" />
          <StaticGlb path="glb/Scene1/Trees.glb" />
          {children}
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
