"use client";

import React, { createContext, useContext, useState, ReactNode, Component } from 'react';

type LoggedError = {
  message: string;
  stack?: string;
  timestamp: number;
};

type ErrorLogContextType = {
  errors: LoggedError[];
  logError: (error: Error) => void;
  clearErrors: () => void;
};

const ErrorLogContext = createContext<ErrorLogContextType | undefined>(undefined);

export function useErrorLog() {
  const context = useContext(ErrorLogContext);
  if (!context) {
    throw new Error('useErrorLog must be used within an ErrorLogProvider');
  }
  return context;
}

export function ErrorLogProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<LoggedError[]>([]);

  const logError = (error: Error) => {
    console.error("Logged to debug bar:", error);
    setErrors(prevErrors => [
      {
        message: error.message,
        stack: error.stack,
        timestamp: Date.now(),
      },
      ...prevErrors
    ]);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const value = { errors, logError, clearErrors };

  return (
    <ErrorLogContext.Provider value={value}>
      {children}
    </ErrorLogContext.Provider>
  );
}


// --- Error Boundary Component ---

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // We can log the error here using a global logger if needed,
        // but for now, we rely on the fact that something higher up will handle it.
        // In a real app, you might send this to a service like Sentry.
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="container mx-auto text-center py-20">
                    <h1 className="text-2xl font-bold text-destructive">Something went wrong.</h1>
                    <p className="text-muted-foreground mt-2">An error occurred in this section of the application.</p>
                     <p className="text-xs text-muted-foreground mt-4">Check the admin debug bar for details if available.</p>
                </div>
            );
        }

        return this.props.children;
    }
}
