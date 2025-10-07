import React, { ErrorInfo, Suspense } from "react";

import { ErrorPage } from "@/pages/ErrorPage";
import { Loader } from "@/shared/ui/Loader";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  //@ts-ignore
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      );
    }

    return children;
  }
}
