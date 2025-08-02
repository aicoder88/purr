import { FieldError } from 'react-hook-form';
import { useTranslation } from '../src/lib/translation-context';

interface FormFieldProps {
  label: string;
  name: string;
  error?: FieldError;
  children: React.ReactNode;
  required?: boolean;
  translationKey?: string;
}

export const FormField = ({
  label,
  name,
  error,
  children,
  required = false,
  translationKey,
}: FormFieldProps) => {
  const { t } = useTranslation();
  const translatedLabel = translationKey ? t.contact?.form?.[translationKey] || label : label;

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {translatedLabel}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1">
        {children}
        {error && (
          <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label: string;
  name: string;
  register: any;
  required?: boolean;
  translationKey?: string;
}

export const InputField = ({
  error,
  label,
  name,
  register,
  required = false,
  translationKey,
  ...props
}: InputFieldProps) => (
  <FormField
    label={label}
    name={name}
    error={error}
    required={required}
    translationKey={translationKey}
  >
    <input
      id={name}
      {...register(name)}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${name}-error` : undefined}
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500"
      {...props}
    />
  </FormField>
);

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  label: string;
  name: string;
  register: any;
  required?: boolean;
  translationKey?: string;
}

export const TextareaField = ({
  error,
  label,
  name,
  register,
  required = false,
  translationKey,
  ...props
}: TextareaFieldProps) => (
  <FormField
    label={label}
    name={name}
    error={error}
    required={required}
    translationKey={translationKey}
  >
    <textarea
      id={name}
      {...register(name)}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? `${name}-error` : undefined}
      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500"
      {...props}
    />
  </FormField>
);
