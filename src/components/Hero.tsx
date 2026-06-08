import { SpaceTaker } from "../components/SpaceTaker";
import Pin from "./Pin3DObject";
import "./Hero.css";

const Hero = () => {
  return (
    <div>
      <SpaceTaker height={"8vh"} />
      <div className="heroText fullpage">
        <div className="JONASFREED">JONAS</div>
        <div className="JONASFREED">
          FREED <Pin targetId="TitleO"></Pin>
        </div>

        <div className="studio">studio</div>
      </div>
      {/* <SpaceTaker height={"15vh"} /> */}
    </div>
  );
};

export default Hero;
