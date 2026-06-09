import { SpaceTaker } from "../components/SpaceTaker";
import Pin from "./Pin3DObject";
import "../index.css";
import "./Hero.css";
import { useContext } from "react";
import { DAContext } from "./DAContext";

const Hero = () => {
  const { currentDA } = useContext(DAContext);
  return (
    <div>
      <div className="heroText fullpage">
        <div className="JONASFREED">JONAS</div>
        <div className="JONASFREED">
          FREED <Pin targetId="TitleO"></Pin>
        </div>

        <div className="studio">studio</div>
      </div>
    </div>
  );
};

export default Hero;
