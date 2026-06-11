import { Vector3, Camera } from "three";

export function pinTo3DPosition(targetId: string, camera: Camera) {
  const targetDiv = document.querySelector(targetId);
  if (!targetDiv) {
    return;
  }

  const rect = targetDiv.getBoundingClientRect();
  const x = (rect.left / window.innerWidth) * 2 - 1;
  const y = -(rect.top / window.innerHeight) * 2 + 1;

  const position = new Vector3(x, y, 0);

  position.unproject(camera);
  return position;
}
