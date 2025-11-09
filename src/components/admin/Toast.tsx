import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'white',
          color: '#111827',
          border: '1px solid #E5E7EB'
        },
        className: 'sonner-toast',
        duration: 4000
      }}
    />
  );
}
