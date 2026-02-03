/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

describe('Card', () => {
  it('renders Card with children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default Card styles', () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveClass('shadow');
  });

  it('applies custom className to Card', () => {
    const { container } = render(<Card className="custom-card">Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-card');
  });

  it('forwards ref to Card', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref}>Ref Test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('renders CardHeader with children', () => {
    render(
      <Card>
        <CardHeader>Header content</CardHeader>
      </Card>
    );
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies default CardHeader styles', () => {
    const { container } = render(
      <Card>
        <CardHeader>Test</CardHeader>
      </Card>
    );
    const header = container.querySelector('[class*="flex flex-col"]');
    expect(header).toHaveClass('p-6');
    expect(header).toHaveClass('space-y-1.5');
  });

  it('applies custom className to CardHeader', () => {
    render(
      <Card>
        <CardHeader className="custom-header">Test</CardHeader>
      </Card>
    );
    expect(screen.getByText('Test')).toHaveClass('custom-header');
  });
});

describe('CardTitle', () => {
  it('renders CardTitle as h3 element', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
      </Card>
    );
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Card Title');
  });

  it('applies default CardTitle styles', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('tracking-tight');
  });

  it('applies custom className to CardTitle', () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);
    expect(screen.getByRole('heading')).toHaveClass('custom-title');
  });
});

describe('CardDescription', () => {
  it('renders CardDescription as paragraph', () => {
    render(<CardDescription>Description text</CardDescription>);
    const desc = screen.getByText('Description text');
    expect(desc.tagName).toBe('P');
  });

  it('applies default CardDescription styles', () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText('Description');
    expect(desc).toHaveClass('text-sm');
    expect(desc).toHaveClass('text-muted-foreground');
  });

  it('applies custom className to CardDescription', () => {
    render(<CardDescription className="custom-desc">Description</CardDescription>);
    expect(screen.getByText('Description')).toHaveClass('custom-desc');
  });
});

describe('CardContent', () => {
  it('renders CardContent with children', () => {
    render(
      <Card>
        <CardContent>Content goes here</CardContent>
      </Card>
    );
    expect(screen.getByText('Content goes here')).toBeInTheDocument();
  });

  it('applies default CardContent styles', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    const content = container.firstChild as HTMLElement;
    expect(content).toHaveClass('p-6');
    expect(content).toHaveClass('pt-0');
  });

  it('applies custom className to CardContent', () => {
    render(<CardContent className="custom-content">Content</CardContent>);
    expect(screen.getByText('Content')).toHaveClass('custom-content');
  });
});

describe('CardFooter', () => {
  it('renders CardFooter with children', () => {
    render(
      <Card>
        <CardFooter>Footer content</CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies default CardFooter styles', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    const footer = container.firstChild as HTMLElement;
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('pt-0');
  });

  it('applies custom className to CardFooter', () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
  });
});

describe('Complete Card composition', () => {
  it('renders a complete card with all subcomponents', () => {
    render(
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content area</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole('heading', { name: /card title/i })).toBeInTheDocument();
    expect(screen.getByText('Card description text')).toBeInTheDocument();
    expect(screen.getByText('Main content area')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });
});
