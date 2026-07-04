import "./FullPage3DCanvas.css";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useContext, useCallback } from "react";

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

export const LightsGlb = () => {
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

    map3Dobj["Sun005"].intensity = 20;
    map3Dobj["Sun005"].castShadow = true;

    map3Dobj["Sun005"].color.set(getStyleValue("--background-color"));
    // map3Dobj["Point"].color.set(getStyleValue("--accent-color"));
  }
  setupLights();

  return (
    <>
      <ambientLight
        intensity={currentDA() == "printedpress" ? 0 : 1.5}
        color={getStyleValue("--background-color")}
      />
      <primitive object={gltf.scene} />
    </>
  );
};
