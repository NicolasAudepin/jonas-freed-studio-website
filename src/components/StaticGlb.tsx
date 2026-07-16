import { useControls } from "leva";
import { useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

import { cleanupGltf } from "../modules/cleanupGltf";
import { useLoader } from "@react-three/fiber";

const debugMaterial = new THREE.MeshLambertMaterial();

export const StaticGlb = ({ path }) => {
  const { allWhite } = useControls("MATERIAL", { allWhite: false });
  const gltf = useLoader(GLTFLoader, import.meta.env.BASE_URL + path);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      if (allWhite) {
        child.material = debugMaterial;
      }
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
