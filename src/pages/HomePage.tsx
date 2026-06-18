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
import { useEffect, useState } from "react";
import { PinContainer, Pin } from "../components/ScrollPin";

// TODO clean section ordering here
const HomePage = () => {
  return (
    <div className="page">
      <PinContainer>
        <SafeFullPageScene />
        <div
        // style={{ pointerEvents: "all" }}
        // style={{ pointerEvents: "none" }}
        >
          <Pin id={0} />
          <Hero />
          <Pin id={0} />
          <Motto />
          <Pin id={1} />
          <Manifesto></Manifesto>
          <Pin id={2} />
          <div className="actualContent ">
            <Section height="50vh">
              <h1>OUR [ongoing] WORKS</h1>
              <div>J'ai déjà tué un homme. Bientôt, je tue un ours.</div>
            </Section>
            <Section height="50vh">
          <Pin id={3} />
              <h1>CONTACTS</h1>
              <div>
                C'est nous qui vous trouverons quand vous vous y attendrez le
                moins.
              </div>
              <Pin id={4} />
            </Section>
          <Pin id={5} />
          </div>
        </div>
        {/* <div
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
          Current Value: {lerpValue.toFixed(3)}
        </div> */}
      </PinContainer>
    </div>
  );
};

export default HomePage;
