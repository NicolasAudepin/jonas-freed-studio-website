import "./Pin3DObject.css";

interface PinProps {
  id: string;
  top?: string;
  left?: string;
  children?;
}

export const Pin = (props: PinProps) => {
  return (
    <div
      id={props.id}
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
