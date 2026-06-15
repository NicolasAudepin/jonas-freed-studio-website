import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  const { progress, isLoading } = useContext(LoadingContext);
  const progressPercent = progress * 100;
  if (!isLoading) {
    return <></>;
  }
  return (
    <div className="fullscreen loadingscreen">
      <div className="loading-grid">
        <div className="loading lr">{progressPercent}%</div>
        <div className="loading rl">{progressPercent}%</div>
        <div className="loading lr">{progressPercent}%</div>
        <div className="loading rl">{progressPercent}%</div>
      </div>
      <div className="loading-center">Loading </div>
      <div className="loading-button">I don't Care </div>
    </div>
  );
};

export default LoadingScreen;
