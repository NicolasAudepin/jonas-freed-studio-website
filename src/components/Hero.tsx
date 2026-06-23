import { SpaceTaker } from "../components/SpaceTaker";
import { Pin } from "./ScrollPin";
import "../index.css";
import "./Hero.css";
import { useContext } from "react";
import { DAContext } from "./DAContext";
import { TxtLoc } from "./LanguageContext";

const Hero = () => {
  const { currentDA } = useContext(DAContext);
  return (
    <div className="hero-section ">
      <div className="vmin-square ">
        {/* <SpaceTaker height="3rem" /> */}
        <div className="JONASFREED ">
          <div>JONAS</div>
          <Pin id={0} />
          <div>FREED</div>
        </div>

        <div className="studio ">studio</div>
      </div>
    </div>
  );
};

export default Hero;
