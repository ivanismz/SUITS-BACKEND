import React, { useCallback, useEffect, useRef } from "react";

type Props = {
  direction: "horizontal" | "vertical";
};

function UILineSeparator(props: Props) {
  const { direction } = props;

  return <div className={"ui-line-separator " + direction}></div>;
}

export default UILineSeparator;
