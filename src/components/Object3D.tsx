import * as THREE from "three";
import React, { Suspense, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "./Object3D.css";

import { Vector3 } from "three";
import { useCanvasContext } from "./CanvasContext";
import { Outlines } from "@react-three/drei";
import OutlineNode, {
  outline,
} from "three/examples/jsm/tsl/display/OutlineNode.js";

function css_to_ThreeHEX(color: string): string {
  if (color.startsWith("rgb")) {
    // Convert `rgb(r, g, b)` to hex
    const rgb = color.match(/\d+/g).map(Number);
    color = `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  } else if (color.length === 9 && color.startsWith("#")) {
    // Remove alpha channel from `#RRGGBBAA`
    color = color.slice(0, 7);
  }

  return color;
}

function matFactory(color: THREE.Color, wireframe: boolean) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color() }, // CSS color input
    },
    vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 color;
    varying vec3 vPosition;
    void main() {

      gl_FragColor = vec4(color,1.0);
      
    }
  `,
    side: THREE.DoubleSide,
    wireframe: wireframe,
  });
  material.uniforms.color.value.set(color);

  return material;
}

function random_pick(list) {
  const r = Math.floor(Math.random() * list.length);
  return list[r];
}

function Model({
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
  const txtcolor_HEX = css_to_ThreeHEX(
    getComputedStyle(document.body).getPropertyValue("--text-color"),
  );
  const accentcolor_HEX = css_to_ThreeHEX(
    getComputedStyle(document.body).getPropertyValue("--accent-color"),
  );
  const accent2color_HEX = css_to_ThreeHEX(
    getComputedStyle(document.body).getPropertyValue("--accent2-color"),
  );

  const txtThreeColor = new THREE.Color(txtcolor_HEX).convertLinearToSRGB();
  const accentThreeColor = new THREE.Color(
    accentcolor_HEX,
  ).convertLinearToSRGB();
  const accent2ThreeColor = new THREE.Color(
    accent2color_HEX,
  ).convertLinearToSRGB();

  const matMapping = {
    WIRE_ACCENT: matFactory(accentThreeColor, true),
    WIRE_ACCENT2: matFactory(accent2ThreeColor, true),
    WIRE_TEXT: matFactory(txtThreeColor, true),
    FULL_ACCENT: matFactory(accentThreeColor, false),
    FULL_ACCENT2: matFactory(accent2ThreeColor, false),
    FULL_TEXT: matFactory(txtThreeColor, false),
  };

  let loaded_content;
  if (format === "gltf") {
    loaded_content = useLoader(GLTFLoader, fbx_path).scene;
    // console.log(loaded_content);
  } else {
    loaded_content = useLoader(FBXLoader, fbx_path);
  }

  function setThreeMaterials(object: THREE.Mesh) {
    if ("material_names" in object.userData) {
      // console.log(object.userData["material_names"])
      object.material = matMapping[object.userData["material_names"][0]];
      if (object.userData["material_names"].length > 1) {
        for (let i = 0; i < object.userData["material_names"].length; i++) {
          // console.log(i, object.userData["material_names"][i])
          if (object.children[i].isMesh) {
            // console.log(i, object.children[i].isMesh)
            const mat = matMapping[object.userData["material_names"][i]];
            // console.log(i, mat)
            object.children[i].material = mat;
            object.children[i].userData["material_names"] = [
              object.userData["material_names"][i],
            ];
          }
        }
      }
    } else {
      object.material = random_pick(Object.values(matMapping));
    }
  }

  loaded_content.traverse((child) => {
    if (child.isMesh) {
      console.log(child);
    }
  });

  loaded_content.scale.set(scale, scale, scale);

  return (
    <primitive object={loaded_content} ref={objRef}></primitive>
    // <mesh castShadow receiveShadow ref={objRef}>
    //   <boxGeometry  />
    //   <meshStandardMaterial color="orange" />

    //   <>
    //     <Outlines thickness={0.06} color="aquamarine" />
    //     <Outlines thickness={0.12} color="#177e89" />
    //     <Outlines thickness={0.2} color="#ff9770" />
    //   </>
    // </mesh>
  );
}

function RotatingObject({
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
      meshRef.current.rotation.y += delta / 4;
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

export default RotatingObject;
