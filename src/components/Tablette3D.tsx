import { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Vector3 } from "three";
import { pinTo3DPosition } from "../modules/2Dto3D";

function Tablette({ targetSelector1, targetSelector2 }) {
  const meshRef = useRef(null);

  const fbx_path = import.meta.env.BASE_URL + "glb/Tablette.glb";
  const loaded_content = useLoader(GLTFLoader, fbx_path).scene;
  const scale = 0.015;
  loaded_content.traverse((child) => {
    // console.log(child);
    if (child.name == "BoneTop") {
      child.scale.set(scale, scale, scale);
    }
    if (child.name == "BoneBottom") {
      child.scale.set(scale, scale, scale);
    }
  });
  const { camera } = useThree();
  const targetPosition1 = useRef(new Vector3(0, 0, 0));
  const targetPosition2 = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    updatePosition();
  });

  function updatePosition() {
    // console.log(targetSelector1);
    if (camera) {
      const pos1: Vector3 = pinTo3DPosition({
        targetId: targetSelector1,
        camera: camera,
        offsetY: -0.2,
      });
      const pos2: Vector3 = pinTo3DPosition({
        targetId: targetSelector2,
        camera: camera,
        offsetY: -0.2,
      });
      targetPosition1.current.copy(pos1);
      targetPosition2.current.copy(pos2);
    }

    loaded_content.traverse((child) => {
      if (child.name == "BoneTop") {
        child.position.lerp(targetPosition1.current, 0.93);
      }
      if (child.name == "BoneBottom") {
        child.position.lerp(targetPosition2.current, 0.93);
      }
    });
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
