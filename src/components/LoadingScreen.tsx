import "./LoadingScreen.css";
import { useProgress } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";

function useDelayedProgress(progress) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    let running = true;

    const animate = () => {
      if (!running) return;
      setValue((current) => {
        const next = current + (progress - current) * 0.08;
        return Math.abs(progress - next) < 0.5 ? progress : next;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, [progress]); //only request frames when progress is updated so this is not running forever I think

  return value;
}

const LoadingScreen = () => {
  const id = useRef(Math.random().toString(36).slice(2));
  // console.log("LoadingScreen render", id.current);

  const { progress, loaded, total } = useProgress();
  console.log(useProgress());
  const dlProgress = loaded;

  const delayedProgress = useDelayedProgress(progress);
  const ready = delayedProgress == 100;

  const [clicked, setClicked] = useState(false);

  const [rendered, setRendered] = useState(true);

  // if (progress == 100) return <></>;
  const handleClick = () => {
    setClicked(true);
  };

  // useEffect(() => {
  //   console.log("mounted", id.current);

  //   return () => {
  //     console.log("unmounted", id.current);
  //   };
  // }, []);

  useEffect(() => {
    if (ready || clicked) {
      setTimeout(() => {
        setRendered(false);
      }, 1000);
    }
  }, [ready, clicked]);

  const open = !ready && !clicked;

  if (!rendered) return <></>;
  return (
    <div className="fullscreen loadingscreen">
      <div className="loading-grid">
        <div
          className="loading lr"
          style={{ marginRight: open ? "0vw" : "52vw" }}
        >
          {dlProgress.toFixed(0)}/{total}
        </div>
        <div
          className="loading rl"
          style={{ marginLeft: open ? "0vw" : "52vw" }}
        >
          {delayedProgress.toFixed(0)}%
        </div>
        <div
          className="loading lr"
          style={{ marginRight: open ? "0vw" : "52vw" }}
        >
          {delayedProgress.toFixed(0)}%
        </div>
        <div
          className="loading rl"
          style={{ marginLeft: open ? "0vw" : "52vw" }}
        >
          {dlProgress.toFixed(0)}/{total}
        </div>
      </div>
      {open && (
        <>
          <div className="loading-center">Loading </div>
          <div className="loading-button" onClick={handleClick}>
            I don't Care
          </div>
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
