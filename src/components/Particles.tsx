import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
// import { PointsNodeMaterial } from "three/webgpu";
import {
  uniform,
  time,
  sin,
  cos,
  positionLocal,
  normalLocal,
  vec3,
} from "three/tsl";
// import { MeshStandardNodeMaterial } from "three/webgpu";

// import galaxyVertexShader from "./galaxy/vertex.glsl";
// import galaxyFragShader from "./galaxy/fragment.glsl";

export function Particles() {
  const cp = useControls("Particles", {
    n: 8000,
    min: [-50, -50, -50],
    max: [50, 50, 50],
    color: "#FF0000",
  });
  // const { gl } = useThree();
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(cp.n * 3);
  for (let i = 0; i < cp.n * 3; i++) {
    const min = cp.min[i % 3];
    const max = cp.max[i % 3];
    positions[i] = Math.random() * (max - min) + min;
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const uAmp = uniform(10.25);
  const uFreq = uniform(3.0);
  const uTime = uniform(0);

  // uTime, positionLocal, normalLocal are built-in TSL nodes
  const wave = sin(positionLocal.x.mul(uFreq).add(uTime));
  const displaced = positionLocal.add(wave.mul(uAmp));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    color: cp.color,
    // fragmentNode: displaced,
  });

  const particles = new THREE.Points(particleGeo, particlesMaterial);
  // const particles = new THREE.Points(
  //   new THREE.SphereGeometry(30, 10, 10),
  //   particlesMaterial,
  // );

  const clock = new THREE.Clock();
  // useFrame(() => {
  //   const elapsedTime = clock.getElapsedTime();

  //   uTime.value = elapsedTime;
  // });

  return <primitive object={particles} />;
}
