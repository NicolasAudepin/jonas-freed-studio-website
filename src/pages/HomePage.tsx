import FullPageCanvas from "../components/FullPage3DCanvas";
import Hero from "../components/Hero";
import { RotatingObject } from "../components/Object3D";
import { Pin } from "../components/Pin3DObject";
import { Vector3 } from "three";

import { TxtLoc } from "../components/LanguageContext";
import Tablette from "../components/Tablette3D";
import Section from "../components/Section";
import Manifesto from "../components/Manifesto";
import { SafeFullPageScene } from "../components/FullPage3dScene";
import LoadingScreen from "../components/LoadingScreen";

// TODO clean section ordering here
const HomePage = () => {
  return (
    <div className="page">
      {/* <FullPageCanvas>
        <RotatingObject
          targetSelector="#TitleO"
          fbx_path={import.meta.env.BASE_URL + "glb/Logo.glb"}
          scale={0.07}
          offset={new Vector3(0, -0.045, 0)}
          outline
          format="gltf"
        ></RotatingObject>
 
      </FullPageCanvas> */}
      <SafeFullPageScene />
      <LoadingScreen />
      <div
        // style={{ pointerEvents: "all" }}
        style={{ pointerEvents: "none" }}
      >
        <Hero />
        <Manifesto></Manifesto>
        <div className="actualContent ">
          <Section height="50vh">
            <h1>OUR [ongoing] WORKS</h1>
            <div>J'ai déjà tué un homme. Bientôt, je tue un ours.</div>
          </Section>
          <Section height="50vh">
            <h1>CONTACTS</h1>
            <div>
              C'est nous qui vous trouverons quand vous vous y attendrez le
              moins.
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
