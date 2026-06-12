import React, { Suspense, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "./Object3D.css";

import { Vector3 } from "three";
import { useCanvasContext } from "./CanvasContext";

export function Model({
  fbx_path,
  scale,
  objRef,
  format,
  // offset,
}: {
  fbx_path: string;
  scale: number;
  objRef: React.Ref;
  format: string;
  // offset: Vector3;
}) {
  let loaded_content;
  if (format === "gltf") {
    loaded_content = useLoader(GLTFLoader, fbx_path).scene;
    // console.log(loaded_content);
  } else {
    loaded_content = useLoader(FBXLoader, fbx_path);
  }

  loaded_content.traverse((child) => {
    if (child.isMesh) {
      // console.log(child);
    }
  });

  loaded_content.scale.set(scale, scale, scale);

  return <primitive object={loaded_content} ref={objRef}></primitive>;
}

export function RotatingObject({
  targetSelector,
  fbx_path,
  scale,
  format,
  outline = true,
  offset = new Vector3(0, 0, 0),
}) {
  const meshRef = useRef();

  const { register, unregister } = useCanvasContext();

  useEffect(() => {
    if (!outline || !meshRef.current) return;
    register(meshRef);
    return () => unregister(meshRef);
  }, [outline, register, unregister]);

  const { camera } = useThree();

  const targetPosition = useRef(new Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta / 6;
    }
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.lerp(targetPosition.current, 0.9);
    }
  });

  useEffect(() => {
    const updatePosition = () => {
      const targetDiv = document.querySelector(targetSelector);
      if (!targetDiv) {
        return;
      }

      const rect = targetDiv.getBoundingClientRect();
      const x = (rect.left / window.innerWidth) * 2 - 1;
      const y = -(rect.top / window.innerHeight) * 2 + 1;
      // console.log(y);
      // console.log(y,x)
      const position2D = new Vector3(x, y, 0);

      position2D.unproject(camera);
      const pospos = position2D.add(offset);

      targetPosition.current.copy(pospos);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [camera, targetSelector]);

  return (
    <Suspense fallback={null}>
      <Model
        objRef={meshRef}
        fbx_path={fbx_path}
        format={format}
        scale={scale}
        // offset={offset}
      />
    </Suspense>
  );
}
