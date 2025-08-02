import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '../../../components/ContactForm';

// Simple test to verify the component renders
// We'll add more tests after we confirm this works
describe('ContactForm', () => {
  it('renders without crashing', () => {
    // Mock the useTranslation hook if needed
    jest.mock('../../../src/lib/translation-context', () => ({
      useTranslation: () => ({
        t: (key: string) => key, // Simple mock that returns the key
      }),
    }));

    render(<ContactForm />);
    
    // Verify the form is rendered
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
