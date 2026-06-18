import React, { useState, useEffect, useRef, useCallback } from "react";

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
    <div
      ref={pinRef}
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: "var(--text-color)",
        color: "var(--background-color)",
        borderRadius: "50%",
        position:"absolute",
        // display: "inline-block",
        margin: "0 10px",
        textAlign:"center"
      }}
    >
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
    <PinContext.Provider value={{ registerPin, valueRef }}>
      <div>{children}</div>
    </PinContext.Provider>
  );
};

// Example usage with 3D scene integration
const App = () => {
  const [lerpValue, setLerpValue] = useState(0);

  // Example: Use the lerpValue in your 3D scene
  React.useEffect(() => {
    // Simulate your useFrame logic
    const animate = () => {
      // Replace this with your actual 3D scene logic
      console.log("Current lerp value:", lerpValue);
      requestAnimationFrame(animate);
    };
    animate();
  }, [lerpValue]);

  return (
    <PinContainer onValueChange={setLerpValue}>
      <div style={{ height: "100vh", padding: "20px" }}>
        <h1>Section 1</h1>
        <p>Some content here...</p>
        <Pin id={1} />
      </div>
      <div style={{ height: "100vh", padding: "20px" }}>
        <h1>Section 2</h1>
        <p>More content here...</p>
        <Pin id={2} />
      </div>
      <div style={{ height: "100vh", padding: "20px" }}>
        <h1>Section 3</h1>
        <p>Even more content here...</p>
        <Pin id={4} />
      </div>
      <div style={{ height: "100vh", padding: "20px" }}>
        <h1>Section 4</h1>
        <p>Final content here...</p>
        <Pin id={5} />
      </div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "48px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        Current Value: {lerpValue.toFixed(1)}
      </div>
    </PinContainer>
  );
};
