import React, { Component, PropsWithChildren } from "react";

import ErrorBoundaryFallback from "./ErrorBoundaryFallback";

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
