import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PinContext } from "./ScrollPin";

export const RouteChange = () => {
  const location = useLocation();
  const { updateCachedPositions } = useContext(PinContext);

  useEffect(() => {
    console.log("Location changed", location);
    updateCachedPositions();
  }, [location]);
  return <></>;
};
