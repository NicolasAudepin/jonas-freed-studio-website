import "./FullPage3DCanvas.css";
import { Canvas, useFrame, type ObjectMap } from "@react-three/fiber";
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
  Suspense,
} from "react";

import { useThree } from "@react-three/fiber";

import { DAContext, DAProvider } from "./DAContext";
import { CanvasContext } from "./CanvasContext";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Camera, Color, Vector3 } from "three";
import { OrbitControls, useAnimations } from "@react-three/drei";
import { PostProcessingDA } from "./PostpProcessingDA";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import LoadingScreen from "./LoadingScreen";
// import { logoBlockWidth } from "./Title";
// import { Children } from "react"

// Custom loading manager for download progress

function cleanupGltf(gltf: GLTF & ObjectMap) {
  gltf.scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();

    if (obj.material) {
      const materials = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];

      materials.forEach((m) => {
        m.dispose();

        Object.values(m).forEach((v) => {
          if (v?.isTexture) v.dispose();
        });
      });
    }
  });
}

const CameraGlb = () => {
  const state = useThree();

  const map3Dobj = {};
  // //this works
  const gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/Camgroup.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  useEffect(() => {
    const camera = map3Dobj["Camera"];
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    state.set({ camera });

    // state.set({ camera: map3Dobj["Camera"] });
    
  }, [gltf.cameras, state.set]);

  const { actions } = useAnimations(gltf.animations, gltf.scene);
  const duration = useRef(0);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    actions["CameraAction"]
      .reset()
      .play()
      .setLoop(THREE.LoopPingPong, Infinity);
    actions["CameraAction"].paused = true;
    duration.current = actions["CameraAction"].getClip().duration;
  }, [actions]);

  useFrame(() => {
    const progress =
      window.pageYOffset / (document.body.scrollHeight - innerHeight);
    const time = progress * duration.current;
    actions["CameraAction"].time = time;
  });

  return <primitive object={gltf.scene} />;
};

const LightsGlb = () => {
  const state = useThree();

  const { currentDA, getStyleValue } = useContext(DAContext);

  const map3Dobj = {};
  // //this works
  let gltf;
  gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/Lights.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  function setupLights() {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    state.gl.shadowMap.enabled = true;

    map3Dobj["Sun005"].intensity = 7;
    map3Dobj["Sun005"].castShadow = true;
    map3Dobj["Point"].intensity = 7;
    map3Dobj["Point"].castShadow = true;

    map3Dobj["Sun005"].color.set(getStyleValue("--background-color"));
    map3Dobj["Point"].color.set(getStyleValue("--accent-color"));
  }
  setupLights();

  return (
    <>
      <ambientLight
        intensity={currentDA() == "printedpress" ? 0 : 5}
        color={getStyleValue("--background-color")}
      />
      <primitive object={gltf.scene} />
    </>
  );
};
const StaticGlb = ({ path }) => {
  const gltf = useLoader(GLTFLoader, import.meta.env.BASE_URL + path);

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

const LogoGlb = () => {
  const state = useThree();

  const map3Dobj = {};
  // //this works
  let gltf;
  gltf = useLoader(
    GLTFLoader,
    import.meta.env.BASE_URL + "glb/Scene1/Logo.glb",
  );

  gltf.scene.traverse((child) => {
    map3Dobj[child.name] = child;
  });

  useEffect(() => {
    return () => {
      cleanupGltf(gltf);
    };
  }, [gltf]);

  const { actions } = useAnimations(gltf.animations, gltf.scene);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    actions["Column.003Action"]
      .reset()
      .play()
      .setLoop(THREE.LoopRepeat, Infinity);
    // eslint-disable-next-line react-hooks/immutability
    actions["Column.003Action"].timeScale = 0.1;
  }, [actions]);

  return <primitive object={gltf.scene}></primitive>;
};

export function SafeFullPageScene() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert" className="fullpagecanvas">
          <p>Something went wrong:</p>
          <pre>{getErrorMessage(error)}</pre>
        </div>
      )}
    >
      <LoadingScreen />
      <Canvas
        className=" fullpagecanvas "
        style={{
          left: "0%",
          right: "0%",
          top: "0%",
          position: "fixed",
          pointerEvents: "all",
        }}
      >
        <Suspense>
          {/* <Perf position="bottom-left" /> */}
          <CameraGlb />
          <LogoGlb />
          <LightsGlb />
          <StaticGlb path="glb/Scene1/blocks.glb" />
          <StaticGlb path="glb/Scene1/Trees.glb" />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
