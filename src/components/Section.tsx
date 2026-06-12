import "./Section.css";

interface SectionProps {
  height?: string;
  children?: React.ReactNode;
}

const Section = (props: SectionProps) => {
  return (
    <div className="section" style={{ height: props.height }}>
      {props.children}
    </div>
  );
};

export default Section;
