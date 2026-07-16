import "./FullPage3DCanvas.css";
import { Canvas } from "@react-three/fiber";
import { useEffect, useContext, Suspense } from "react";

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
import { PostProcessingDA } from "./PostpProcessingDA";
import { StaticGlb } from "./StaticGlb";

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
  const { showStats, axis } = useControls("Globals", {
    showStats: false,
    axis: false,
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
          {axis ? <axesHelper scale={10} /> : null}
          {children}
          <PostProcessingDA />
        </Suspense>
      </Canvas>
      {isDebug ? <Leva /> : null}

      {showStats ? <LerpDisplay /> : null}
    </ErrorBoundary>
  );
}
