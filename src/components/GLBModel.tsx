import { useGLTF } from "@react-three/drei";

type GLBModelProps = {
  url: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export function GLBModel({
  url,
  scale = 1,
  position,
  rotation,
  castShadow = true,
  receiveShadow = true,
  ...props
}: GLBModelProps) {
  const { scene } = useGLTF(url, true);

  return (
    <group position={position} rotation={rotation} scale={scale} {...props}>
      <primitive
        object={scene}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      />
    </group>
  );
}

useGLTF.preload = (url: string) => {
  useGLTF.preload(url);
};
