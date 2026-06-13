import { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Vector3 } from "three";
import { pinTo3DPosition } from "../modules/2Dto3D";

function Tablette({ targetSelector1, targetSelector2 }) {
  const meshRef = useRef(null);

  const fbx_path = import.meta.env.BASE_URL + "glb/BoneTest.glb";
  const loaded_content = useLoader(GLTFLoader, fbx_path).scene;

  loaded_content.traverse((child) => {
    // console.log(child);
    if (child.name == "Bone") {
      child.scale.set(0.03, 0.03, 0.03);
    }
    if (child.name == "Bone001") {
      child.scale.set(0.03, 0.03, 0.03);
    }
  });
  const { camera } = useThree();
  const targetPosition1 = useRef(new Vector3(0, 0, 0));
  const targetPosition2 = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    // updatePosition();
  });

  function updatePosition() {
    // console.log(targetSelector1);
    if (camera) {
      const pos1: Vector3 = pinTo3DPosition({
        targetId: targetSelector1,
        camera: camera,
        offsetY: -0.18,
      });
      const pos2: Vector3 = pinTo3DPosition({
        targetId: targetSelector2,
        camera: camera,
      });
      targetPosition1.current.copy(pos1);
      targetPosition2.current.copy(pos2);
    }

    loaded_content.traverse((child) => {
      // if (child.name == "Torus001") {
      //   child.position.lerp(targetPosition1.current, 0.93);
      // }
      if (child.name == "Bone") {
        // child.position.lerp(new Vector3(0, 0, 0), 0.93);
        child.position.lerp(targetPosition1.current, 0.93);
      }
      if (child.name == "Bone001") {
        child.position.lerp(targetPosition2.current, 0.93);
        // child.position.lerp(new Vector3(0, 0, 0), 0.93);
      }
    });

    // console.log(loaded_content);
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
