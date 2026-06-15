import React from "react";
import { createContext } from "react";

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {},
  progress: 0,
  setProgress: (progress: number) => {},
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        progress,
        setProgress,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
