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
    n: 28000,
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

  const customUniforms = {
    uTime: { value: 0.0 },
  };
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    color: cp.color,
  });
  particlesMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = customUniforms.uTime;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>

        // transformed.y = 0.0;
        transformed.y = mod(uTime * 1.0 + transformed.y,100.0) ;
    `,
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `
        #include <common>
        uniform float uTime;
    `,
    );
  };

  const particles = new THREE.Points(particleGeo, particlesMaterial);

  const clock = new THREE.Clock();
  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    customUniforms.uTime.value = elapsedTime;
  });

  return <primitive object={particles} />;
}
