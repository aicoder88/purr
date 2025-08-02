import React from "react";

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  /**
   * Optional fallback component to render when an error occurs
   */
  fallback?:
    | React.ReactNode
    | ((props: {
        error: Error | null;
        errorInfo: React.ErrorInfo | null;
        resetErrorBoundary: () => void;
      }) => React.ReactNode);
  /**
   * Callback function to report errors to an error tracking service
   */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /**
   * Whether to show error details in development mode
   * @default true
   */
  showErrorInDev?: boolean;
  /**
   * Optional reset function to attempt recovery
   */
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  componentStack: string;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    showErrorInDev: true,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      componentStack: "",
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      componentStack: "",
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console in development
    if (process.env.NODE_ENV !== "production") {
      console.error("Error caught by boundary:", error, errorInfo);
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
      componentStack: errorInfo.componentStack || "",
    });

    // Report error to error tracking service if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else if (process.env.NODE_ENV === "production") {
      // TODO: Replace with your error reporting service (e.g., Sentry, LogRocket)
      // reportErrorToService(error, errorInfo);
    }
  }

  /**
   * Reset the error boundary to its initial state
   */
  resetErrorBoundary = () => {
    const { onReset } = this.props;

    if (onReset) {
      onReset();
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      componentStack: "",
    });
  };

  /**
   * Reload the entire application
   */
  reloadApplication = () => {
    window.location.reload();
  };

  render() {
    const { fallback, showErrorInDev } = this.props;
    const { hasError, error, errorInfo } = this.state;

    // If there's no error, render children as normal
    if (!hasError) {
      return <>{this.props.children}</>;
    }

    // If a custom fallback is provided, render it
    if (fallback) {
      return typeof fallback === "function"
        ? fallback({
            error,
            errorInfo,
            resetErrorBoundary: this.resetErrorBoundary,
          })
        : fallback;
    }

    // Default error UI
    return (
      <div className="min-h-[400px] flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-4">
            We apologize for the inconvenience. This error has been logged and
            we're working to fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={this.resetErrorBoundary}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
            <button
              onClick={this.reloadApplication}
              className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>

          {((showErrorInDev ?? true) ||
            process.env.NODE_ENV === "development") &&
            error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-red-700 dark:text-red-300 cursor-pointer hover:underline">
                  Show Error Details
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-2 rounded overflow-auto">
                  {error?.stack || "No stack trace available"}
                </pre>
                {errorInfo?.componentStack && (
                  <pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded overflow-auto">
                    {errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
        </div>
      </div>
    );
  }
}
