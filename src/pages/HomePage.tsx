import FullPageCanvas from "../components/FullPage3DCanvas";
import Hero from "../components/Hero";
import { RotatingObject } from "../components/Object3D";
// import { Pin } from "../components/Pin3DObject";
import { Vector3 } from "three";

import { TxtLoc } from "../components/LanguageContext";
import Tablette from "../components/Tablette3D";
import Section from "../components/Section";
import Manifesto from "../components/Manifesto";
import { SafeFullPageScene } from "../components/FullPage3dScene";
import { Motto } from "../components/Motto";
import { useContext, useEffect, useState } from "react";
import { PinContainer, Pin, LerpDisplay } from "../components/ScrollPin";
import { SpaceTaker } from "../components/SpaceTaker";
import { DAContext } from "../components/DAContext";

// TODO clean section ordering here
const HomePage = () => {
  const { has3DScene, isDebug } = useContext(DAContext);
  return (
    <div
      className="page"
      style={{
        pointerEvents: isDebug?"none":"all",
        // visibility: "hidden",
      }}
    >
      <div
      // style={{ pointerEvents: "all" }}
      >
        <Hero />
        <Pin id={1} />
        <Motto />
        <Pin id={2} />
        <SpaceTaker height={has3DScene ? "45rem" : "10rem"} />

        <Manifesto></Manifesto>
        <SpaceTaker height={has3DScene ? "30rem" : "10rem"} />
        <Pin id={5} />
        <div className="actualContent ">
          <Section height="30vh">
            <h1>OUR [ongoing] WORKS</h1>
            <div>J'ai déjà tué un homme. Bientôt, je tue un ours.</div>
          </Section>
          <Pin id={6} />
          <SpaceTaker height={has3DScene ? "55vh" : "5vh"} />
          <Pin id={7} />
          <Section>
            <h1>CONTACTS</h1>
            <div>
              C'est nous qui vous trouverons quand vous vous y attendrez le
              moins.
            </div>
            <Pin id={8} />
          </Section>
          <SpaceTaker height={"55vh"} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
