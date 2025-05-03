interface HorizontalProps {
  width?: string;
  height?: string;
}

const Horizontal: React.FC<HorizontalProps> = ({ width, height }) => {
  return <hr className={`w-${width ? width : "[30%]"} my-2`} />;
};

export default Horizontal;
