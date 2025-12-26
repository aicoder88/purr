import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-sm z-50">
      <button
        onClick={() => setShowPrompt(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
        Install Purrify App
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Get faster access and offline support.
      </p>

      <div className="flex gap-2">
        <Button onClick={handleInstall} className="flex-1">
          Install
        </Button>
        <Button variant="outline" onClick={() => setShowPrompt(false)} className="flex-1">
          Not Now
        </Button>
      </div>
    </div>
  );
};
