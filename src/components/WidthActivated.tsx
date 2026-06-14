import React, { useEffect, useState } from "react";

type WidthActivatedProps = {
  min?: number; // inclusive minimum width in px
  max?: number; // inclusive maximum width in px
  children?: React.ReactNode;
  fallback?: React.ReactNode; // shown when not active
  className?: string;
};

const within = (width: number, min?: number, max?: number) => {
  if (min != null && width < min) return false;
  if (max != null && width > max) return false;
  return true;
};

const WidthActivated: React.FC<WidthActivatedProps> = ({
  min,
  max,
  children,
  fallback = null,
  className,
}) => {
  const getInitial = () =>
    typeof window === "undefined"
      ? false
      : within(document.documentElement.clientWidth, min, max);
  const [active, setActive] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () =>
      setActive(within(document.documentElement.clientWidth, min, max));
    window.addEventListener("resize", check);
    check();
    return () => window.removeEventListener("resize", check);
  }, [min, max]);

  if (!active) return <>{fallback}</>;
  return <div className={className}>{children}</div>;
};

export default WidthActivated;
