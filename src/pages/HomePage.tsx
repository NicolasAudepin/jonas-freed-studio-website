import FullPageCanvas from "../components/FullPage3DCanvas";
import { GLBModel } from "../components/GLBModel";
import Hero from "../components/Hero";
import RotatingObject from "../components/Object3D";
import Pin from "../components/Pin3DObject";
import { SpaceTaker } from "../components/SpaceTaker";
import { Vector3 } from "three";

const HomePage = () => {
  return (
    <div className="page">
      <FullPageCanvas>
        <RotatingObject
          targetSelector="#TitleO"
          fbx_path="src/assets/glb/Logo.glb"
          scale={0.06}
          offset={new Vector3(0, -0.045, 0)}
          format="gltf"
        ></RotatingObject>
      </FullPageCanvas>
      <Hero></Hero>

      <h1 className="fontPix">On va técla ta grand-mère.</h1>
      <h1 className="fontMono">Et manger ton chien.</h1>
      <div className="actualContent">
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
      </div>
    </div>
  );
};

export default HomePage;
