import { Suspense, useEffect, useRef } from "react";
import { Model } from "./Object3D";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function Tablette({ targetSelector1, targetSelector2 }) {
  const meshRef = useRef();
  const fbx_path = "src/assets/glb/Tablettte.glb";
  let loaded_content;

  useEffect(() => {
    // console.log(meshRef.current);
  }, [meshRef, targetSelector1, targetSelector2]);

  loaded_content = useLoader(GLTFLoader, fbx_path).scene;

  loaded_content.traverse((child) => {
    if (child.isMesh) {
      console.log(child);
      child.morphTargetInfluences = [1];
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive object={loaded_content} ref={meshRef}></primitive>
    </Suspense>
  );
}

export default Tablette;
