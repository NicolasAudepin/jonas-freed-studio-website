import { SpaceTaker } from "../components/SpaceTaker";
import { Pin } from "./Pin3DObject";
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
        <Pin id="TitleO" left="50%"></Pin>
        {/* <SpaceTaker height="3rem" /> */}
        <div className="JONASFREED ">
          <div>JONAS</div>
          <div>FREED</div>
        </div>

        <div className="studio ">studio</div>
      </div>
    </div>
  );
};

export default Hero;
