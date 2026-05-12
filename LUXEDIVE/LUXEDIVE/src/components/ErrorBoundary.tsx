import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-luxe-black text-luxe-white p-4">
          <h1 className="text-4xl font-serif text-luxe-gold mb-4">Something went wrong</h1>
          <p className="text-luxe-gray mb-8 text-center max-w-md">
            We apologize for the inconvenience. Our technical team has been notified.
            <br />
            <span className="text-xs text-red-400 mt-2 block font-mono bg-luxe-dark/50 p-2 rounded">
              {this.state.error?.message}
            </span>
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Return Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
