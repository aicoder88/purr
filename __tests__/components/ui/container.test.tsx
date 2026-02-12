/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { Container } from '@/components/ui/container';
import Link from 'next/link';

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default container styles', () => {
    const { container } = render(<Container>Test</Container>);
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('mx-auto');
    expect(div).toHaveClass('w-full');
    expect(div).toHaveClass('max-w-7xl');
  });

  it('applies responsive padding classes', () => {
    const { container } = render(<Container>Test</Container>);
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('px-4');
    expect(div).toHaveClass('sm:px-6');
    expect(div).toHaveClass('lg:px-8');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        Test
      </Container>
    );
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('custom-class');
    expect(div).toHaveClass('mx-auto'); // Still has default classes
  });

  it('forwards additional HTML attributes', () => {
    const { container } = render(
      <Container data-testid="container" id="main-container">
        Test
      </Container>
    );
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveAttribute('id', 'main-container');
    expect(div).toHaveAttribute('data-testid', 'container');
  });

  it('renders complex children', () => {
    render(
      <Container>
        <header>
          <h1>Title</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
      </Container>
    );

    expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Container>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </Container>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('forwards refs', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Container ref={ref}>
        <div>Test</div>
      </Container>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles aria attributes', () => {
    const { container } = render(
      <Container role="main" aria-label="Main content">
        Test
      </Container>
    );
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveAttribute('role', 'main');
    expect(div).toHaveAttribute('aria-label', 'Main content');
  });
});
