import { Vector3, Camera } from "three";

export function pinTo3DPosition(targetId: string, camera: Camera, z = 0) {
  const targetDiv = document.getElementById(targetId);
  if (!targetDiv) {
    return new Vector3(0, 0, 0);
  }

  const rect = targetDiv.getBoundingClientRect();
  const x = (rect.left / window.innerWidth) * 2 - 1;
  const y = -(rect.top / window.innerHeight) * 2 + 1;

  const position = new Vector3(x, y, 0);

  position.unproject(camera);
  // position.setZ(z);
  return position;
}
