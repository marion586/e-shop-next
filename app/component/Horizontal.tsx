interface HorizontalProps {
  width?: string;
  height?: string;
  color?: string;
}

const Horizontal: React.FC<HorizontalProps> = ({ width, height, color }) => {
  return (
    <hr
      className={`w-${width ? width : "[30%]"} ${
        height ? height : "0.5px"
      } my-2 ${color ? color : "bg-slate-300"}`}
    />
  );
};

export default Horizontal;
