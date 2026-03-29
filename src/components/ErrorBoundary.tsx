'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-8 text-center">
            <p className="text-sm font-medium text-[#EF4444]">Something went wrong</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-3 rounded-lg bg-[#EF4444] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#dc2626]"
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
