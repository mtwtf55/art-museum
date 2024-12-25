import "./ErrorBoundaryFallback.scss";

import React from "react";

export function ErrorBoundaryFallback() {
  return (
    <div className="error-boundary-fallback">
      <h2 className="error-boundary-fallback__text">
        Oops...Something went wrong :(
      </h2>
    </div>
  );
}
