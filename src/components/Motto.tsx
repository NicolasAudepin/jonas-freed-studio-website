import { TxtLoc } from "./LanguageContext";
import "./Motto.css";
import { SVG } from "./SVG";
export const Motto = () => {
  return (
    <div className="actualContent no-overflow">
      <div className="motto-grid ">
        <div className="grid1"> Independent</div>
        <div className="grid2 bg-blur"> INTERDICIPLINARY</div>
        <div className="grid3 bg-blur-weak">
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          <div>Timeless</div>
          {/* <div
            style={{
              display:,
              justifyContent: "center",
              // alignContent: "center",
              // justifyItems: "center",
              width: "50%",
            }}
          >
            <SVG
              path="../assets/svg/bevel.svg"
              padding="0rem"
              height="4rem"
              transform="rotate(-135deg)"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
