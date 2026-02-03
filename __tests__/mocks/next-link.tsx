import React from 'react';

interface MockLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

export default function MockLink({
  href,
  children,
  className,
  onClick,
  'aria-label': ariaLabel,
}: MockLinkProps) {
  return (
    <a href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
