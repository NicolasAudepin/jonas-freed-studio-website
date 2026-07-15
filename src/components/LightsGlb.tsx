import "./FullPage3DCanvas.css";
import { useState, useEffect, useContext, useCallback } from "react";

import { useThree } from "@react-three/fiber";

import { DAContext, DAProvider } from "./DAContext";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { cleanupGltf } from "../modules/cleanupGltf";

function debugStuff(map3Dobj) {
  const sunName = "Sun001";
  const sun = map3Dobj[sunName];
  const debugShadow = new THREE.CameraHelper(sun.shadow.camera);
  return debugShadow;
}

export const LightsGlb = () => {
  const state = useThree();

  const { currentDA, getStyleValue, isDebug } = useContext(DAContext);

  const map3Dobj = {};
  // //this works
  let gltf;
  gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/LightsV2.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });

  const debugShadow = debugStuff(map3Dobj);

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  function setupLights() {
    state.gl.shadowMap.enabled = true;
    state.gl.shadowMap.type = THREE.PCFSoftShadowMap;
    try {
      const sunName = "Sun001";
      const sun = map3Dobj[sunName];

      sun.intensity = 20;
      sun.castShadow = true;

      sun.shadow.mapSize.width = 2 ** 10;
      sun.shadow.mapSize.height = 2 ** 10;

      // Configure the orthographic shadow camera frustum
      sun.shadow.camera.near = 0.1; // Default: 0.5
      sun.shadow.camera.far = 50; // Default: 500 (adjust to scene scale)
      sun.shadow.camera.left = -15; // Default: -5
      sun.shadow.camera.right = 15; // Default: 5
      sun.shadow.camera.top = 15; // Default: 5
      sun.shadow.camera.bottom = -15; // Default: -5

      // Optional: Reduce shadow acne (self-shadowing artifacts)
      sun.shadow.bias = -0.01;

      sun.color.set(getStyleValue("--background-color"));
      map3Dobj["Point"].color.set(getStyleValue("--accent-color"));
      map3Dobj["Point"].intensity = 5;
      // map3Dobj["Point"].castShadow = true;
      // console.log(map3Dobj);
    } catch (error) {
      console.error(error);
    }
  }
  setupLights();

  return (
    <>
      <ambientLight
        intensity={currentDA() == "printedpress" ? 0 : 0.4}
        color={getStyleValue("--background-color")}
      />
      {/* <cameraHelper camera={sun?.shadow.camera}></cameraHelper> */}
      <primitive object={gltf.scene} />
      {isDebug ? <primitive object={debugShadow} /> : null}
    </>
  );
};
