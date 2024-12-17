import "./Container.scss";

import React, { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return <div className={"container"}>{children}</div>;
}

export default Container;
