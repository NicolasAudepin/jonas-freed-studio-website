import FullPageCanvas from "../components/FullPage3DCanvas";
import Hero from "../components/Hero";
import { RotatingObject } from "../components/Object3D";
import { Pin } from "../components/Pin3DObject";
import { SpaceTaker } from "../components/SpaceTaker";
import { Vector3 } from "three";
import { DAButton } from "../components/DAContext";

import { LangSelect, TxtLoc } from "../components/LanguageContext";
import { Outlines } from "@react-three/drei";
import Tablette from "../components/Tablette3D";
// TODO clean section ordering here
const HomePage = () => {
  return (
    <div className="page">
      <FullPageCanvas>
        <RotatingObject
          targetSelector="#TitleO"
          fbx_path="src/assets/glb/Logo.glb"
          scale={0.06}
          offset={new Vector3(0, -0.045, 0)}
          outline
          format="gltf"
        ></RotatingObject>
        <Tablette
          targetSelector1="manifesttop"
          targetSelector2="manifestbottom"
        />
      </FullPageCanvas>
      <div className="actualContent">
        <Hero />
        <DAButton />
        <LangSelect />
        <h1 className="fontPix">
          <TxtLoc
            texts={{
              EN: "We will técla your big mama.",
              FR: "On va técla ta grand-mère.",
            }}
          />
        </h1>
        <h1 className="fontMono">
          <TxtLoc
            texts={{
              EN: "And eat your chien.",
              FR: "Et manger ton chien.",
            }}
          />
        </h1>
        <div className="actualContent">
          <Pin id="manifesttop" top="0%">
            X
          </Pin>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <h2>
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </h2>
          <div className="fontPix">Hahaha</div>
          <div className="">Hahaha</div>
          <div className="fontPix">Hahaha</div>
          <Pin id="manifestbottom" top="100%">
            x
          </Pin>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
