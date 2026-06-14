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
          transform: props.transform,
        }
      }
    >
      <svg className="svg-img">
        {/* <rect width={10} height={10} fill="red"></rect>
        <rect width={1} height={1} fill="blue"></rect> */}

        <g>
          <SvgDisplay name={props.path} />
        </g>
      </svg>

      {/* <img src={props.path} className="svg-img" /> */}
    </div>
  );
};
