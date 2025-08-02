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
  hasBeenReset: boolean;
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
      hasBeenReset: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      hasBeenReset: false,
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
      hasBeenReset: true,
    });
  };

  /**
   * Reload the entire application
   */
  reloadApplication = () => {
    window.location.reload();
  };

  render() {
    // If there's an error and we're not in the process of resetting
    if (this.state.hasError && !this.state.hasBeenReset) {
      const { fallback, showErrorInDev = true } = this.props;
      const { error, errorInfo, componentStack } = this.state;

      // If a custom fallback is provided, use it
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're sorry, but an unexpected error occurred. Our team has been
                notified.
              </p>

              {showErrorInDev && error && (
                <details className="w-full mb-6 text-left">
                  <summary className="text-sm font-medium text-red-600 dark:text-red-400 cursor-pointer mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-xs overflow-auto">
                    <code className="text-red-700 dark:text-red-300">
                      {error.toString()}
                      {componentStack &&
                        `\n                        \n                        Component Stack:\n                        ${componentStack}`}
                    </code>
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <button
                  onClick={this.resetErrorBoundary}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={this.reloadApplication}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Reload Application
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // This should never be reached due to the early return above
    return this.props.children;
  }
}
