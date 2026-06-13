import "./Manifesto.css";
import { Pin } from "./Pin3DObject";
import Section from "./Section";
import { SpaceTaker } from "./SpaceTaker";
import WidthActivated from "./WidthActivated";

const Manifesto = () => {
  return (
    <Section>
      <SpaceTaker height={"10rem"}></SpaceTaker>
      <WidthActivated max={799} className="manifestTitleSmall ">
        <div>MANIFESTO</div>
        <div style={{ rotate: "180deg" }}>MANIFESTO</div>
      </WidthActivated>
      <div className="actualContent manifestGrid ">
        <div className="manifestTitle ">
          <WidthActivated min={1000} className="manifestTitle ">
            <div style={{ writingMode: "sideways-lr" }}>MANIFESTO</div>
            <div style={{ writingMode: "sideways-rl" }}>MANIFESTO</div>
          </WidthActivated>
          <WidthActivated min={800} max={999} className="manifestTitle ">
            <div style={{ writingMode: "sideways-lr" }}>MANIFESTO</div>
          </WidthActivated>
        </div>
        <div className=" manifestText">
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
        </div>
        <div className="manifestStone">
          <div className="stikipin" style={{ top: "10%" }}>
            <Pin id="manifesttop">1</Pin>
          </div>
          <div className="stikipin" style={{ top: "83%" }}>
            <Pin id="manifestbottom">2</Pin>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Manifesto;
