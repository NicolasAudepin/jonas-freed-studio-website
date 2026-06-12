import { SpaceTaker } from "../components/SpaceTaker";
import { Pin } from "./Pin3DObject";
import "../index.css";
import "./Hero.css";
import { useContext } from "react";
import { DAContext } from "./DAContext";

const Hero = () => {
  const { currentDA } = useContext(DAContext);
  return (
    <div className="heroText">
      <div className="JONASFREED">JONAS</div>
      <div className="JONASFREED">
        <Pin id="TitleO" left="50%"></Pin>
        FREED
      </div>

      <div className="studio">studio</div>
    </div>
  );
};

export default Hero;
