import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";

const LangContext = createContext(null);

const Languages = ["FR", "EN"];

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("FR");

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

const LangSelect = () => {
  const { lang, setLang } = useContext(LangContext);
  return (
    <select onChange={(e) => setLang(e.target.value)} defaultValue={lang}>
      {Languages.map((lang) => (
        <option>{lang}</option>
      ))}
    </select>
  );
};

type Props = {
  texts: Partial<Record<string, ReactNode>>;
  fallback?: string;
};
const TxtLoc = ({ texts, fallback = "en" }: Props) => {
  const { lang } = useContext(LangContext);

  return <>{texts[lang] ?? texts[fallback] ?? null}</>;
};

export { LangContext, LangProvider, Languages, LangSelect, TxtLoc };
