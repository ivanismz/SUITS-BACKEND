import { memo } from "react";

type Props = {
  direction?: "row" | "column";
  children?: any;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function UIFlexBox({
  direction = "row",
  children,
  className,
  style,
  onClick,
}: Props) {
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", flexDirection: direction }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default memo(UIFlexBox)
