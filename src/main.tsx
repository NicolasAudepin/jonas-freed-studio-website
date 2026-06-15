import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import { DAProvider } from "./components/DAContext.tsx";
import { LangProvider } from "./components/LanguageContext.tsx";
import { NavBar } from "./components/NavBar.tsx";
import { LoadingProvider } from "./components/LoadingContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DAProvider>
      <LangProvider>
        <LoadingProvider>
          <HomePage />
        </LoadingProvider>
        <NavBar />
        <HomePage />
      </LangProvider>
    </DAProvider>
  </StrictMode>,
);
