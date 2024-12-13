import React from "react";
import "./ErrorBoundaryFallback.scss";

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
