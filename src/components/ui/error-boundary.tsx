import React from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

// Default fallback component
function DefaultErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  const errorId = React.useMemo(() => 
    Math.random().toString(36).substring(2, 15), []
  );

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center shadow-lg">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-3">
          Something went wrong
        </h2>
        
        <p className="text-red-600 dark:text-red-300 mb-6 leading-relaxed">
          We apologize for the inconvenience. Our team has been notified and is working to resolve this issue.
        </p>
        
        <div className="space-y-3 mb-6">
          <button
            onClick={retry}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white dark:text-white dark:text-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            
            <button
              onClick={() => window.location.href = '/support/contact'}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Support
            </button>
          </div>
        </div>
        
        <div className="text-xs text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg">
          Error ID: {errorId}
        </div>
        
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-red-700 dark:text-red-300 cursor-pointer hover:text-red-800 dark:hover:text-red-200">
              Developer Details
            </summary>
            <div className="mt-3 text-xs bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
              <div className="mb-2 font-semibold text-red-800 dark:text-red-200">
                {error.name}: {error.message}
              </div>
              <pre className="text-red-600 dark:text-red-400 overflow-auto whitespace-pre-wrap break-words">
                {error.stack}
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: Math.random().toString(36).substring(2, 15)
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for monitoring in production
    const errorReport = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo: {
        componentStack: errorInfo.componentStack,
      },
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      errorId: this.state.errorId,
    };

    // Console log for development
    console.error('Error caught by boundary:', errorReport);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.reportToErrorService(errorReport);
    }
  }

  private reportToErrorService = async (errorReport: Record<string, unknown>) => {
    try {
      // Send to error reporting service (e.g., Sentry, LogRocket, etc.)
      await fetch('/api/error-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  private retry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// Hook for handling async errors in functional components
export function useErrorHandler() {
  return React.useCallback((error: Error) => {
    // Throw error to be caught by error boundary
    throw error;
  }, []);
}