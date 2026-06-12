import { createContext, useContext } from "react";
import { Object3D } from "three";
type RegisterFn = (ref: React.RefObject<Object3D>) => void;
type UnregisterFn = (ref: React.RefObject<Object3D>) => void;

export const CanvasContext = createContext<{
  register: RegisterFn;
  unregister: UnregisterFn;
} | null>(null);

export const useCanvasContext = () => {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("Missing provider");
  return ctx;
};
