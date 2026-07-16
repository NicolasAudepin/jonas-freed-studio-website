import { useAnimations } from "@react-three/drei";
import { useThree, useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { cleanupGltf } from "../modules/cleanupGltf";
import { PinContext } from "./ScrollPin";
import { DAContext } from "./DAContext";
import { useControls } from "leva";

export const CameraGlb = () => {
  const { useDebugCam, orbitControl } = useControls("CAMERA", {
    useDebugCam: false,
    // orbitControl: false,
  });

  const state = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { valueRef, pins } = useContext(PinContext);

  const map3Dobj = {};
  // //this works
  const gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/CamgroupV2.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });
  // console.log("cam");
  // console.log(gltf);
  const camera = map3Dobj["Camera003"];
  const camhelp = new THREE.CameraHelper(camera);

  const debugCamera = new THREE.PerspectiveCamera();
  const debugControls = new OrbitControls(debugCamera, state.gl.domElement);
  debugCamera.position.set(0, 20, 100);
  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  useEffect(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    debugCamera.aspect = window.innerWidth / window.innerHeight;
    debugCamera.updateProjectionMatrix();
    state.set({ camera: useDebugCam ? debugCamera : camera });

    // state.set({ camera: map3Dobj["Camera"] });
  }, [gltf.cameras, state.set, useDebugCam]);

  const { actions } = useAnimations(gltf.animations, gltf.scene);
  const duration = useRef(0);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    // console.log(actions["CameraFollowPath"]);

    actions["CameraFollowPath"]
      .reset()
      .play()
      .setLoop(THREE.LoopPingPong, Infinity);

    actions["CameraFollowPath"].paused = true;
    duration.current = actions["CameraFollowPath"].getClip().duration;
  }, [actions]);

  useFrame(() => {
    const time = (valueRef.current / (pins.length - 1)) * duration.current;

    actions["CameraFollowPath"].time = time;
    // console.log(valueRef.current);
    if (orbitControl) {
      debugControls.update();
    }
  });

  return (
    <>
      <primitive object={gltf.scene} />
      {useDebugCam ? <primitive object={camhelp} /> : null}
    </>
  );
};
