import "./LoadingPlaceholder.scss";

import { Spinner } from "@Components/Spinner/Spinner";
import React from "react";

export function LoadingPlaceholder() {
  return (
    <div className="loading-placeholder">
      <Spinner />
    </div>
  );
}
