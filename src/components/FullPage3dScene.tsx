import "./FullPage3DCanvas.css";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
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
import { LoadingContext } from "./LoadingContext";
import LoadingScreen from "./LoadingScreen";
// import { logoBlockWidth } from "./Title";
// import { Children } from "react"

export const FullPageScene = (props) => {
  const state = useThree();

  const { currentDA, getStyleValue } = useContext(DAContext);
  // const { setIsLoading, setProgress, setset } = useContext(LoadingContext);
  // function onProgress(event: ProgressEvent<EventTarget>) {
  //   if (event.lengthComputable) {
  //     const progress = event.loaded / event.total;
  //     // setProgress(progress);
  //     setset(progress);
  //     console.log(progress);
  //   }
  // }
  let gltf;
  const map3Dobj = {};
  gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene3.glb",
    null,
    // onProgress,
  );
  console.log(gltf);
  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });
  // setIsLoading(false);

  useEffect(() => {
    return () => {
      cleanupGltf();
    };
  }, [gltf]);

  useEffect(() => {
    state.set({ camera: map3Dobj["Camera"] });
  }, [gltf.cameras, state.set]);

  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);
  const duration = useRef(0);
  const progress = 0;

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    // console.log(actions);
    actions["Column.003Action"]
      .reset()
      .play()
      .setLoop(THREE.LoopRepeat, Infinity);
    // eslint-disable-next-line react-hooks/immutability
    actions["Column.003Action"].timeScale = 0.1;

    actions["CameraAction"]
      .reset()
      .play()
      .setLoop(THREE.LoopPingPong, Infinity);
    actions["CameraAction"].paused = true;
    duration.current = actions["CameraAction"].getClip().duration;
    // console.log(actions["CameraAction"].getClip().duration);
  }, [actions]);

  useFrame(() => {
    const progress =
      window.pageYOffset / (document.body.scrollHeight - innerHeight);
    const time = progress * duration.current;
    actions["CameraAction"].time = time;
  });

  setupLights();

  return (
    <>
      {/* <OrbitControls /> */}
      <ambientLight
        intensity={currentDA() == "printedpress" ? 0 : 5}
        color={getStyleValue("--background-color")}
      />
      <primitive object={gltf.scene}></primitive>
    </>
  );

  function cleanupGltf() {
    gltf.scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();

      if (obj.material) {
        const materials = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];

        materials.forEach((m) => {
          m.dispose();

          Object.values(m).forEach((v) => {
            if (v?.isTexture) v.dispose();
          });
        });
      }
    });
  }
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

    map3Dobj["Sun005"].color.set(getStyleValue("--background-color"));
    map3Dobj["Point"].color.set(getStyleValue("--accent-color"));
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
        <LoadingScreen />
        <Canvas
          className=" fullpagecanvas "
          style={{
            left: "0%",
            right: "0%",
            top: "0%",
            position: "fixed",
            pointerEvents: "all",
          }}
        >
          <Suspense>
            {/* <Perf position="bottom-left" /> */}
            <FullPageScene />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </CanvasContext.Provider>
  );
}
