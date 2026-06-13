import { Vector3, Camera } from "three";

interface PinProps {
  targetId: string;
  camera: Camera;
  offsetW?: Vector3;
  offsetX?: number;
  offsetY?: number;
  offsetZ?: number;
}

export function pinTo3DPosition(props: PinProps): Vector3 {
  //Gives the 3D position of an html element according to the given camera. 
  // considers the upper left of the html element.
  // Offset X & Y are normalised screenspace offsets
  // offsetZ is the distance between the 3D point and the camera (in camera space)  
  // Offset W is a 3d offset in 3D world space.

  const targetDiv = document.getElementById(props.targetId);
  const zero = new Vector3(0, 0, 0);
  if (!targetDiv) {
    return new Vector3(0, 0, 0);
  }

  const rect = targetDiv.getBoundingClientRect();
  const x = (rect.left / window.innerWidth) * 2 - 1;
  const y = -(rect.top / window.innerHeight) * 2 + 1;

  const position = new Vector3(x, y, 0);
  const offsetC = new Vector3(props.offsetX ?? 0, props.offsetY ?? 0, 0);
  // position.unproject(camera);
  position
    .add(offsetC)
    .applyMatrix4(props.camera.projectionMatrixInverse)
    // .normalize()
    .multiplyScalar(props.offsetZ ?? 1)
    .applyMatrix4(props.camera.matrixWorld)
    .add(props.offsetW ?? zero);

  return position;
}
