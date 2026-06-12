interface SpaceTakerProps {
  height?: string;
}

const SpaceTaker = (props: SpaceTakerProps) => {
  return (
    <div style={{ height: props.height ?? "1rem", backgroundColor: }}>
      AA
    </div>
  );
};

export default SpaceTaker;
