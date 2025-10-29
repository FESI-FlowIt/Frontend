'use client';
import React from 'react';

export default class RQErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    const status = error?.statusCode ?? error?.status ?? error?.response?.status;

    if (typeof status === 'number') {
      if (status >= 500) {
        window.location.replace('/error/500error');
      } else if (status >= 400) {
        window.location.replace('/error/400error');
      }
    }
  }

  render() {
    if (this.state.hasError) return null;

    return this.props.children;
  }
}
