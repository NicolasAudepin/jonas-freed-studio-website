import { useAnimations } from "@react-three/drei";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { cleanupGltf } from "../modules/cleanupGltf";
import { PinContext } from "./ScrollPin";

export const CameraGlb = () => {
  const state = useThree();
  const { valueRef } = useContext(PinContext);

  const map3Dobj = {};
  // //this works
  const gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/Camgroup.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });
  console.log("cam");

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  useEffect(() => {
    const camera = map3Dobj["Camera001_1"];
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    state.set({ camera });

    // state.set({ camera: map3Dobj["Camera"] });
  }, [gltf.cameras, state.set]);

  const { actions } = useAnimations(gltf.animations, gltf.scene);
  const duration = useRef(0);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    console.log("action");

    actions["Camera.001Action"]
      .reset()
      .play()
      .setLoop(THREE.LoopPingPong, Infinity);

    actions["Camera.001Action"].paused = true;
    duration.current = actions["Camera.001Action"].getClip().duration;
  }, [actions]);

  useFrame(() => {
    // const progress =
    //   window.pageYOffset / (document.body.scrollHeight - innerHeight);
    // const time = progress * duration.current;
    const time = (valueRef.current / 5) * duration.current;

    actions["Camera.001Action"].time = time;
    // console.log(valueRef.current);
  });

  return <primitive object={gltf.scene} />;
};
