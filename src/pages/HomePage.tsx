import FullPageCanvas from "../components/FullPage3DCanvas";
import Hero from "../components/Hero";
import { RotatingObject } from "../components/Object3D";
import { Pin } from "../components/Pin3DObject";
import { Vector3 } from "three";

import { TxtLoc } from "../components/LanguageContext";
import Tablette from "../components/Tablette3D";
import Section from "../components/Section";
import Manifesto from "../components/Manifesto";

// TODO clean section ordering here
const HomePage = () => {
  return (
    <div className="page">
      <FullPageCanvas>
        <RotatingObject
          targetSelector="#TitleO"
          fbx_path={import.meta.env.BASE_URL + "glb/Logo.glb"}
          scale={0.07}
          offset={new Vector3(0, -0.045, 0)}
          outline
          format="gltf"
        ></RotatingObject>
        <Tablette
          targetSelector1="manifesttop"
          targetSelector2="manifestbottom"
        />
      </FullPageCanvas>
      <div
        style={{ pointerEvents: "all" }}
        // style={{ pointerEvents: "none" }}
      >
        <Hero />
        <Manifesto></Manifesto>
        <div className="actualContent">
          <Section>
            <h1 className="fontPix">
              <TxtLoc
                texts={{
                  EN: "Independent Interdisciplinary, Timeless",
                  FR: "Indépendant Interdisciplinaire Intemporel.",
                }}
              />
            </h1>
            <h2 className="fontPix">
              <TxtLoc
                texts={{
                  EN: "We will técla your big mama.",
                  FR: "On va técla ta grand-mère.",
                }}
              />
            </h2>
            <h2 className="fontMono">
              <TxtLoc
                texts={{
                  EN: "And eat your chien.",
                  FR: "Et manger ton chien.",
                }}
              />
            </h2>
          </Section>
          <Section height="100vh">
            <h1>MANIFESTO</h1>
            <div>
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv
              Ww Xx Yy Zz Jonas Freed Studio c'est ce dont on a besoin pour
              réaliser nos projets. On veut tout faire mais il faut
              choisir.ojdrojsfojpmojefpmjofe
            </div>
          </Section>
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
