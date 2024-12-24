import "./LoadingPlaceholder.scss";

import { Spinner } from "@Components";
import React from "react";

function LoadingPlaceholder() {
  return (
    <div className="loading-placeholder">
      <Spinner />
    </div>
  );
}

export default LoadingPlaceholder;
