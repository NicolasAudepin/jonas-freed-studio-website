import { Suspense, useEffect, useRef } from "react";
import { Model } from "./Object3D";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Vector3 } from "three";
import { pinTo3DPosition } from "../modules/2Dto3D";

function Tablette({ targetSelector1, targetSelector2 }) {
  const meshRef = useRef();
  const fbx_path = "src/assets/glb/Tablettte.glb";
  let loaded_content;

  loaded_content = useLoader(GLTFLoader, fbx_path).scene;

  loaded_content.traverse((child) => {
    if (child.isMesh) {
      console.log(child);
      child.morphTargetInfluences = [1];
    }
  });
  loaded_content.scale.set(0.06, 0.06, 0.06);
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3(0, 0, 0));
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(targetPosition.current, 0.93);
    }
  });

  function updatePosition() {
    console.log(targetSelector1);
    if (camera) {
      const pos: Vector3 = pinTo3DPosition(targetSelector1, camera, 4);
      console.log(pos);
      targetPosition.current.copy(pos);
    }
  }

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [camera]);

  return (
    <Suspense fallback={null}>
      <primitive object={loaded_content} ref={meshRef}></primitive>
    </Suspense>
  );
}

export default Tablette;
