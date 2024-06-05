interface ColoredCircleProps {
  color: string;
  onClick: () => void;
}

const ColoredCircle = ({ color, onClick }: ColoredCircleProps) => {
  // const {} = props;

  return (
    <span
      style={{ backgroundColor: color }}
      className="inline-block h-5 w-5 cursor-pointer rounded-full"
      onClick={onClick}
    />
  );
};

export default ColoredCircle;
