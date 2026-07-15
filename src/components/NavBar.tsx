import { NavLink } from "react-router-dom";
import { DAButton, DebugButton, ThreeDButton } from "./DAContext";
import { LangSelect } from "./LanguageContext";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <NavLink className={"navbutton"} to={"/"}>
          Home
        </NavLink>
        <NavLink className={"navbutton"} to={"/projects"}>
          Projects
        </NavLink>
      </div>
      <div>
        <DAButton />
        <LangSelect />
        <ThreeDButton />
        <DebugButton />
      </div>
    </div>
  );
};
