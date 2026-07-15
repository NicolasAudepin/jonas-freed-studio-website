import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";

import "./Pin3DObject.css";

// Linear interpolation function
const lerp = (a, b, t) => a + (b - a) * t;

// Context to expose the lerped value as a ref
export const PinContext = React.createContext();

// Pin component
export const Pin = ({ id }) => {
  const pinRef = useRef(null);
  const { registerPin } = React.useContext(PinContext);

  useEffect(() => {
    if (pinRef.current) {
      registerPin(id, pinRef);
    }
  }, [id, registerPin]);

  return (
    <div ref={pinRef} className="scroll-pin">
      {id}
    </div>
  );
};

// Parent component to manage pins and compute lerped value
export const PinContainer = ({ children, onValueChange }) => {
  const [pins, setPins] = useState([]);
  const valueRef = useRef(0);
  const cachedPinPositions = useRef([]);

  const registerPin = useCallback((id, ref) => {
    setPins((prevPins) => {
      const existingIndex = prevPins.findIndex((pin) => pin.id === id);
      if (existingIndex >= 0) {
        return prevPins.map((pin, index) =>
          index === existingIndex ? { id, ref } : pin,
        );
      }
      return [...prevPins, { id, ref }];
    });
  }, []);

  // Update cached pin positions on layout changes
  const updateCachedPositions = useCallback(() => {
    cachedPinPositions.current = pins
      .map((pin) => {
        if (!pin.ref.current) return null;
        const rect = pin.ref.current.getBoundingClientRect();
        return {
          id: pin.id,
          middle: rect.top + rect.height / 2 + window.scrollY,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.middle - b.middle);
  }, [pins]);

  // Compute lerped value on scroll (throttled with requestAnimationFrame)
  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const viewportMiddle = window.innerHeight / 2 + window.scrollY;

        // Use cached positions
        const sortedPins = cachedPinPositions.current;

        // Find the two closest pins
        let prevPin = null;
        let nextPin = null;

        for (const pin of sortedPins) {
          if (pin.middle <= viewportMiddle) {
            prevPin = pin;
          } else {
            nextPin = pin;
            break;
          }
        }

        // Compute lerped value
        if (prevPin && nextPin) {
          const t =
            (viewportMiddle - prevPin.middle) /
            (nextPin.middle - prevPin.middle);
          valueRef.current = lerp(prevPin.id, nextPin.id, t);
        } else if (prevPin) {
          valueRef.current = prevPin.id;
        } else if (nextPin) {
          valueRef.current = nextPin.id;
        }

        // Notify parent via callback
        if (onValueChange) {
          onValueChange(valueRef.current);
        }
      });
    };

    // Initial setup
    updateCachedPositions();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCachedPositions, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCachedPositions);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pins, updateCachedPositions, onValueChange]);

  return (
    <PinContext.Provider
      value={{ registerPin, valueRef, pins, updateCachedPositions }}
    >
      <div>{children}</div>
      <LerpDisplay />

    </PinContext.Provider>
  );
};

export const LerpDisplay = () => {
  const { valueRef, pins } = useContext(PinContext);
  const [lerp, setLerp] = useState(0);
  function handdleScroll(event) {
    setLerp(valueRef.current);
    // console.log(event);
  }

  

  useEffect(() => {
    window.addEventListener("scroll", handdleScroll);
    return () => window.removeEventListener("scroll", handdleScroll);
  }, [valueRef]);

  return (
    <div className="scroll-description" onScroll={handdleScroll}>
      <div>{lerp.toFixed(1)} lerp</div>
      <div>{pins.length} pins</div>
      <div>{((lerp / (pins.length - 1)) * 100).toFixed(1)} %</div>
    </div>
  );
};
