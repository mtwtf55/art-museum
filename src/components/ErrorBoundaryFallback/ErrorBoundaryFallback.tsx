import "./ErrorBoundaryFallback.scss";

import React from "react";

function ErrorBoundaryFallback() {
  return (
    <div className="error-boundary-fallback">
      <p className="error-boundary-fallback__text">
        Oops...Something went wrong :(
      </p>
    </div>
  );
}

export default ErrorBoundaryFallback;
