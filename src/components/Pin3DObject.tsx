import "./Pin3DObject.css";

interface PinProps {
  targetId: string;
  top?: string;
  left?: string;
  children?;
}

export const Pin = (props: PinProps) => {
  return (
    <div
      id={props.targetId}
      className="meshtarget"
      style={{
        top: props.top ? props.top : "50%",
        left: props.left ? props.left : "50%",
      }}
    >
      {props.children}
    </div>
  );
};
