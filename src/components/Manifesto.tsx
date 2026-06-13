import "./Manifesto.css";
import { Pin } from "./Pin3DObject";
import Section from "./Section";

const Manifesto = () => {
  return (
    <Section>
      <div className="manifestGrid debug">
        <div className="manifestTitle">MANIFESTO</div>
        <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
        <div className="manifestStone">
          <Pin id="manifesttop" top="0%">
            *
          </Pin>
          <Pin id="manifestbottom" top="100%">
            *
          </Pin>
        </div>
      </div>
    </Section>
  );
};

export default Manifesto;
