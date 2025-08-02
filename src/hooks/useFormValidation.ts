import { useForm, UseFormReturn, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { useCallback } from "react";

type UseFormValidationProps<T extends FieldValues> = {
  schema: ZodSchema<T>;
  defaultValues?: Partial<T>;
  mode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";
};

type FormValidationResult<T extends FieldValues> = {
  form: UseFormReturn<T>;
  handleSubmit: (
    onValid: (data: T) => void,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  resetForm: (values?: T) => void;
  setError: (name: keyof T, message: string) => void;
};

/**
 * A custom hook that handles form validation using react-hook-form and Zod schemas
 * @param schema - The Zod validation schema
 * @param defaultValues - Optional default values for the form
 * @param mode - The validation mode (default: 'onSubmit')
 * @returns Form utilities and handlers
 */
export function useFormValidation<T extends FieldValues>({
  schema,
  defaultValues,
  mode = "onSubmit",
}: UseFormValidationProps<T>): FormValidationResult<T> {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
    mode,
    criteriaMode: "all",
  });

  const handleSubmit = useCallback(
    (onValid: (data: T) => void) => {
      return form.handleSubmit(
        async (data) => {
          try {
            await onValid(data);
          } catch (error) {
            // Handle submission errors
            console.error("Form submission error:", error);

            // You can add more specific error handling here
            if (error instanceof Error) {
              form.setError("root.serverError", {
                type: "server",
                message:
                  error.message ||
                  "An error occurred while submitting the form",
              });
            }
          }
        },
        (errors) => {
          // Handle validation errors
          console.error("Form validation errors:", errors);
        },
      );
    },
    [form],
  );

  const resetForm = useCallback(
    (values?: T) => {
      form.reset(values || defaultValues);
    },
    [form, defaultValues],
  );

  const setError = useCallback(
    (name: keyof T, message: string) => {
      form.setError(name as string, {
        type: "manual",
        message,
      });
    },
    [form],
  );

  return {
    form,
    handleSubmit,
    resetForm,
    setError,
  };
}

/**
 * A helper function to create a form validation hook with a specific schema
 * @param schema - The Zod validation schema
 * @returns A pre-configured useFormValidation hook
 */
export function createFormValidation<T extends FieldValues>(
  schema: ZodSchema<T>,
) {
  return (props?: Omit<UseFormValidationProps<T>, "schema">) =>
    useFormValidation<T>({ schema, ...props });
}
