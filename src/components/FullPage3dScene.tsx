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

import GUI from "lil-gui";
import { useControls, Leva, folder } from "leva";

import { useThree } from "@react-three/fiber";

import { DAContext, DAProvider } from "./DAContext";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { OrbitControls, useAnimations } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import LoadingScreen from "./LoadingScreen";
import { cleanupGltf } from "../modules/cleanupGltf";
import { CameraGlb } from "./CameraGlb";
import { LightsGlb } from "./LightsGlb";
import { LerpDisplay } from "./ScrollPin";

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
  const { showStats } = useControls("Globals", {
    showStats: false,
  });

  const { has3DScene, isDebug } = useContext(DAContext);
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
          pointerEvents: isDebug ? "all" : "none",
          // visibility: "hidden",
        }}
      >
        <Suspense>
          {showStats ? <Perf position="bottom-left" /> : null}

          <CameraGlb />
          <LogoGlb />
          <LightsGlb />
          <StaticGlb path="glb/Scene1/archiV2.glb" />
          {/* <StaticGlb path="glb/Scene1/Basil.glb" /> */}
          <StaticGlb path="glb/Scene1/Trees_001.glb" />
          {children}
        </Suspense>
      </Canvas>
      {isDebug ? <Leva /> : null}

      {showStats ? <LerpDisplay /> : null}
    </ErrorBoundary>
  );
}
