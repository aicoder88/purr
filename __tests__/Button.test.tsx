import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}

describe('Button Component', () => {
  it('renders children correctly', () => {
    const buttonText = 'Click me';
    render(<Button>{buttonText}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(buttonText);
  });
});
