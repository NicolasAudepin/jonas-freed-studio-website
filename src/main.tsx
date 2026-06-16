import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import { DAProvider } from "./components/DAContext.tsx";
import { LangProvider } from "./components/LanguageContext.tsx";
import { NavBar } from "./components/NavBar.tsx";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <DAProvider>
      <LangProvider>
        <HomePage />
        <NavBar />
        <HomePage />
      </LangProvider>
    </DAProvider>
  // </StrictMode>
  ,
);
