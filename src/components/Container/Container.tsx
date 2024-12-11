import React, { PropsWithChildren } from "react";
import "./Container.scss";

function Container({ children }: PropsWithChildren) {
  return <div className={"container"}>{children}</div>;
}

export default Container;
