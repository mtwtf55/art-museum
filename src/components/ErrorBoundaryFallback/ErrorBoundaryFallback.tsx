import "./ErrorBoundaryFallback.scss";

import React from "react";

function ErrorBoundaryFallback() {
  return (
    <div className="error-boundary-fallback">
      <h2 className="error-boundary-fallback__text">
        Oops...Something went wrong :(
      </h2>
    </div>
  );
}

export default ErrorBoundaryFallback;
