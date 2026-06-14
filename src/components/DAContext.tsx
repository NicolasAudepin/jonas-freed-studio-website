import {
  useState,
  useEffect,
  createContext,
  useContext,
  useLayoutEffect,
} from "react";
import { useLocation } from "react-router-dom";

const DAContext = createContext(null);

const DAs = ["mortouvif", "wikiutopist", "datagalore", "printedpress"];

const DAProvider = ({ children }) => {
  const [DAId, setDAId] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [computedStyle, setComputedStyle] = useState();

  function rotateDAId() {
    setDAId((DAId + 1) % DAs.length);
    // setUpdating(true);
    // setTimeout(() => {
    //   setUpdating(false);
    // }, 500);
  }

  function currentDA() {
    return DAs[DAId];
  }

  function getStyleValue(property: string) {
    return computedStyle?computedStyle.getPropertyValue(property):null;
  }

  function refreshCss() {
    const selectedDA = DAs[DAId];

    for (let daName of DAs) {
      if (daName == selectedDA) {
        document.body.classList.toggle(daName, true);
      } else {
        document.body.classList.toggle(daName, false);
      }
    }
  }

  useLayoutEffect(() => {
    setComputedStyle(window.getComputedStyle(document.body));
  }, [DAId]);

  useEffect(() => {
    refreshCss();
  }, [DAId]);

  return (
    <DAContext.Provider
      value={{
        rotateDAId,
        setDAId,
        DAId,
        currentDA,
        updating,
        getStyleValue,
      }}
    >
      {children}
    </DAContext.Provider>
  );
};

const DAButton = () => {
  const { rotateDAId, currentDA } = useContext(DAContext);
  return (
    <button
      onClick={() => {
        rotateDAId();
        // console.log(currentDA());
      }}
    >
      DA : {currentDA()}
    </button>
  );
};

export { DAContext, DAProvider, DAButton };
