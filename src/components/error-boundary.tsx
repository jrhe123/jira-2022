import React from "react";

type fallbackRender = (props: { error: Error | null }) => React.ReactElement;

/**
 * 1. props
 * children & fallbackRender
 *
 * 2. state
 * error
 */

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: fallbackRender }>,
  {
    error: Error | null;
  }
> {
  state = {
    error: null,
  };

  // while children throw exception, we set error into state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
