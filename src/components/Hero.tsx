import { SpaceTaker } from "../components/SpaceTaker";
import Pin from "./Pin3DObject";
import "./Hero.css";

const Hero = () => {
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
