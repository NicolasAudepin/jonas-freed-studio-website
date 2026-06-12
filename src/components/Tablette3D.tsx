import { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Vector3 } from "three";
import { pinTo3DPosition } from "../modules/2Dto3D";

function Tablette({ targetSelector1, targetSelector2 }) {
  const meshRef = useRef(null);
  const fbx_path = "src/assets/glb/Tablettte.glb";

  const loaded_content = useLoader(GLTFLoader, fbx_path).scene;

  loaded_content.traverse((child) => {
    if (child.isMesh) {
      console.log(child);
      child.morphTargetInfluences = [1];
    }
  });
  loaded_content.scale.set(0.06, 0.06, 0.06);
  const { camera } = useThree();
  const targetPosition1 = useRef(new Vector3(0, 0, 0));
  const targetPosition2 = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(targetPosition1.current, 0.93);
      loaded_content.traverse((child) => {
        if (child.isMesh) {
          // console.log(child);
        }
      });
    }
  });

  function updatePosition() {
    // console.log(targetSelector1);
    if (camera) {
      const pos1: Vector3 = pinTo3DPosition(targetSelector1, camera, 4);
      const pos2: Vector3 = pinTo3DPosition(targetSelector2, camera, 4);
      // console.log(pos);
      targetPosition1.current.copy(pos1);
      targetPosition2.current.copy(pos2);
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
