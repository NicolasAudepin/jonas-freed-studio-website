import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import { DAProvider } from "./components/DAContext.tsx";
import { LangProvider } from "./components/LanguageContext.tsx";
import { NavBar } from "./components/NavBar.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import { LerpDisplay, PinContainer } from "./components/ScrollPin.tsx";
import { SafeFullPageScene } from "./components/FullPage3dScene.tsx";
import { RouteChange } from "./components/RouteChange.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <DAProvider>
    <PinContainer>
      <SafeFullPageScene />

      <BrowserRouter>
        <LangProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
          <NavBar />
        </LangProvider>
        <RouteChange/>
      </BrowserRouter>
    </PinContainer>
  </DAProvider>,
  // </StrictMode>
);
