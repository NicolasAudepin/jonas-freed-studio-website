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
    <div className="heroText parent">
      <Pin id="TitleO" left="50%"></Pin>
      <SpaceTaker height="3rem" />
      <div className="JONASFREED ">
        <div>JONAS</div>
        <div>FREED</div>
      </div>

      <div className="studio ">studio</div>

      <SpaceTaker height="3rem" />
      <div className="motto ">
        <TxtLoc
          texts={{
            EN: "Independent Interdisciplinary Timeless",
            FR: "Indépendant Interdisciplinaire Intemporel",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
