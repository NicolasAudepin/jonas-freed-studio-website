interface PinProps {
  targetId: string;
}

const Pin = (props: PinProps) => {
  return (
    <div
      id={props.targetId}
      className="meshtarget"
      style={{ top: "50%" }}
    ></div>
  );
};

export default Pin;
