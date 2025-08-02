// Simple React test without JSX
const React = require('react');
const { render, screen } = require('@testing-library/react');

function HelloWorld() {
  return React.createElement('div', null, 'Hello, World!');
}

describe('React Component Test', () => {
  it('renders hello world', () => {
    render(React.createElement(HelloWorld));
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
