import { DAButton } from "./DAContext";
import { LangSelect } from "./LanguageContext";
import "./NavBar.css";

interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
  return (
    <div className="navbar">
      NAV BAR NAV BAR NAV BAR
      <DAButton />
      <LangSelect />
    </div>
  );
};
