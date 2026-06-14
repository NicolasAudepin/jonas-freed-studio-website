import React from "react";
import "./SVG.css";

const svgMap = import.meta.glob("../assets/svg/*.svg", {
  query: "?react",
  // import: "default",
});

type SvgDisplayProps = {
  name: string;
};

export function SvgDisplay({ name }: SvgDisplayProps) {
  const [Svg, setSvg] = React.useState<any>(null);
  // console.log(svgMap);
  // console.log(Svg);

  React.useEffect(() => {
    svgMap[name]?.().then((mod) => {
      setSvg(() => mod.default);
    });
  }, [name]);

  return Svg ? <Svg /> : null;
}

interface SVGProps {
  path: string;
  style?: React.CSSProperties;
  height?: string;
  width?: string;
  padding?: string;
  transform?: string;
}

export const SVG = (props: SVGProps) => {
  return (
    <div
      className="svg-container "
      style={
        props.style ?? {
          height: props.height,
          width: props.width,
          padding: props.padding,
        }
      }
    >
      <svg className="svg-img" transform={props.transform}>
        <SvgDisplay name={props.path} />
      </svg>

      {/* <img src={props.path} className="svg-img" /> */}
    </div>
  );
};
