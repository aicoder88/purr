import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// Mock the useContactForm hook first
const mockUseContactForm = jest.fn();
const mockInitializeEmailJS = jest.fn();

jest.mock('../../hooks/useContactForm', () => ({
  __esModule: true,
  useContactForm: () => mockUseContactForm(),
}));

// Import the component after setting up mocks
import ContactForm from '../../components/ContactForm';

// Mock next/router
const mockUseRouter = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => mockUseRouter(),
}));

// Mock the translation context
const mockUseTranslation = jest.fn();
jest.mock('../../../src/lib/translation-context', () => ({
  useTranslation: () => mockUseTranslation(),
}));

describe('ContactForm', () => {
  const defaultProps = {
    register: jest.fn(),
    handleSubmit: jest.fn((fn) => (e: React.FormEvent) => {
      e.preventDefault();
      return fn({ name: 'Test', email: 'test@example.com', message: 'Test message' });
    }),
    formState: { isSubmitting: false, errors: {} },
    onSubmit: jest.fn(),
    submitStatus: {},
    initializeEmailJS: mockInitializeEmailJS,
  };

  const mockT = {
    contact: {
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send Message',
      },
    },
    contactSection: {
      getInTouch: 'Contact Us',
    },
    freeGiveaway: {
      submitting: 'Submitting...',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    mockUseContactForm.mockReturnValue({
      ...defaultProps,
      register: jest.fn().mockImplementation((name) => ({
        name,
        required: true,
      })),
    });
    
    mockUseTranslation.mockReturnValue({ t: mockT });
    mockUseRouter.mockReturnValue({ locale: 'en' });
  });

  it('renders the contact form with all fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows loading state when submitting', () => {
    mockUseContactForm.mockReturnValue({
      ...defaultProps,
      formState: { isSubmitting: true, errors: {} },
    });
    
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Submitting...');
  });

  it('handles form submission', async () => {
    const mockOnSubmit = jest.fn();
    mockUseContactForm.mockReturnValue({
      ...defaultProps,
      onSubmit: mockOnSubmit,
    });
    
    render(<ContactForm />);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Test',
        email: 'test@example.com',
        message: 'Test message',
      });
    });
  });

  it('shows success message when submission is successful', () => {
    const successMessage = 'Your message has been sent successfully!';
    mockUseContactForm.mockReturnValue({
      ...defaultProps,
      submitStatus: { success: true, message: successMessage },
    });
    
    render(<ContactForm />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(successMessage);
    expect(alert).toHaveClass('bg-green-50 text-green-800');
  });

  it('shows error message when submission fails', () => {
    const errorMessage = 'Failed to send message. Please try again.';
    mockUseContactForm.mockReturnValue({
      ...defaultProps,
      submitStatus: { success: false, message: errorMessage },
    });
    
    render(<ContactForm />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(errorMessage);
    expect(alert).toHaveClass('bg-red-50 text-red-800');
  });
});
