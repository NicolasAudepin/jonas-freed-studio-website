import "./Manifesto.css";
import { Pin } from "./Pin3DObject";
import Section from "./Section";
import { SpaceTaker } from "./SpaceTaker";
import { SVG, SvgDisplay } from "./SVG";
import WidthActivated from "./WidthActivated";

const Manifesto = () => {
  return (
    <Section>
      <SpaceTaker height={"10rem"} />

      <div className="actualContent manifestGrid ">
        <div className="manifestTitle ">
          <WidthActivated min={801} className="manifestTitle ">
            <div style={{ writingMode: "sideways-lr" }}>MANIFESTO</div>
            {/* <div style={{ writingMode: "sideways-rl" }}>MANIFESTO</div> */}
          </WidthActivated>
        </div>

        <div className=" manifestText">
          <WidthActivated max={800} className="manifestTitleSmall ">
            <SpaceTaker height={"4rem"} />

            <div>MANIFESTO</div>
          </WidthActivated>
          <SVG
            path="../assets/svg/bevel.svg"
            padding="3rem"
            height="9rem"
            transform="rotate(-45)"
          />

          <div className="manifestParagraph">
            Déjà on arrive on mange un ours. Ensuite si t'es pas content bah
            c'est la vie. On est là pour faire des bails et fumer des daronnes.
            La suite c'est pas claire mais balec. On avait dit qu'on parlerais
            de l'image de la colone ici. On l'a pas encore fait. J'ai faim. je
            vais manger. A plus.
          </div>

          <div className="manifestParagraph">
            Déjà on arrive on mange un ours. Ensuite si t'es pas content bah
            c'est la vie. On est là pour faire des bails et fumer des daronnes.
            La suite c'est pas claire mais balec. On avait dit qu'on parlerais
            de l'image de la colone ici. On l'a pas encore fait. J'ai faim. je
            vais manger. A plus.
          </div>
          <div className="manifestParagraph">
            Déjà on arrive on mange un ours. Ensuite si t'es pas content bah
            c'est la vie. On est là pour faire des bails et fumer des daronnes.
            La suite c'est pas claire mais balec. On avait dit qu'on parlerais
            de l'image de la colone ici. On l'a pas encore fait. J'ai faim. je
            vais manger. A plus.
          </div>
          <div className="manifestParagraph">
            Déjà on arrive on mange un ours. Ensuite si t'es pas content bah
            c'est la vie. On est là pour faire des bails et fumer des daronnes.
            La suite c'est pas claire mais balec. On avait dit qu'on parlerais
            de l'image de la colone ici. On l'a pas encore fait. J'ai faim. je
            vais manger. A plus.
          </div>
          <div className="manifestParagraph">
            Déjà on arrive on mange un ours. Ensuite si t'es pas content bah
            c'est la vie. On est là pour faire des bails et fumer des daronnes.
            La suite c'est pas claire mais balec. On avait dit qu'on parlerais
            de l'image de la colone ici. On l'a pas encore fait. J'ai faim. je
            vais manger. A plus.
          </div>
          <SVG
            path="../assets/svg/bevel.svg"
            padding="3rem"
            height="9rem"
            transform="rotate(135)"
          />
          <WidthActivated max={800} className="manifestTitleSmall ">
            <div style={{ rotate: "180deg" }}>MANIFESTO</div>
            <SpaceTaker height={"4rem"} />
          </WidthActivated>
        </div>
        <div className="manifestTitle">
          <WidthActivated min={801} className="manifestTitle ">
            {/* <div style={{ writingMode: "sideways-lr" }}>MANIFESTO</div> */}
            <div style={{ writingMode: "sideways-rl" }}>MANIFESTO</div>
          </WidthActivated>

          {/* <div className="stikipin" style={{ top: "15vh" }}>
            <Pin id="manifesttop">1</Pin>
          </div>
          <div className="stikipin" style={{ top: "85%" }}>
            <Pin id="manifestbottom">2</Pin>
          </div> */}
        </div>
      </div>
    </Section>
  );
};

export default Manifesto;
