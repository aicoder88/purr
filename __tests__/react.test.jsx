import React from 'react';
import { render, screen } from '@testing-library/react';

function HelloWorld() {
  return <div>Hello, World!</div>;
}

describe('React Component Test', () => {
  it('renders hello world', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
