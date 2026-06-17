import type { ObjectMap } from "@react-three/fiber";
import type { GLTF } from "three/examples/jsm/Addons.js";

// import { logoBlockWidth } from "./Title";
// import { Children } from "react"
// Custom loading manager for download progress
export function cleanupGltf(gltf: GLTF & ObjectMap) {
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
