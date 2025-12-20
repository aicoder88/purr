/**
 * Utility functions for dynamically loading JavaScript resources
 * to reduce initial page load time and improve performance
 */

/**
 * Dynamically load a script when a user interacts with an element
 * @param selector CSS selector for the element to watch
 * @param scriptLoader Function that loads the script when triggered
 * @param eventType Event type to listen for (default: 'click')
 * @param options Additional options for the event listener
 */
export function loadScriptOnInteraction(
  selector: string,
  scriptLoader: () => Promise<unknown>,
  eventType: string = 'click',
  options: AddEventListenerOptions = { once: true }
): void {
  // Only run in browser environment
  if (typeof globalThis.window === 'undefined') return;

  // Function to handle the interaction
  const handleInteraction = async () => {
    try {
      await scriptLoader();
    } catch (err) {
      console.error('Error loading script:', err);
    }
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupListeners);
  } else {
    setupListeners();
  }

  // Set up the event listeners
  function setupListeners() {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) {
      console.warn(`No elements found matching selector: ${selector}`);
      return;
    }
    
    elements.forEach(element => {
      element.addEventListener(eventType, handleInteraction, options);
    });
  }
}

/**
 * Dynamically load a script when an element becomes visible in the viewport
 * @param selector CSS selector for the element to watch
 * @param scriptLoader Function that loads the script when triggered
 * @param options IntersectionObserver options
 */
export function loadScriptOnVisible(
  selector: string,
  scriptLoader: () => Promise<unknown>,
  options: IntersectionObserverInit = { 
    rootMargin: '200px', 
    threshold: 0.1 
  }
): void {
  // Only run in browser environment
  if (typeof globalThis.window === 'undefined') return;
  
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    scriptLoader();
    return;
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    setupObserver();
  }

  // Set up the intersection observer
  function setupObserver() {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) {
      console.warn(`No elements found matching selector: ${selector}`);
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scriptLoader()
            .catch(err => console.error('Error loading script:', err))
            .finally(() => {
              // Disconnect the observer once the script is loaded
              observer.disconnect();
            });
        }
      });
    }, options);
    
    elements.forEach(element => {
      observer.observe(element);
    });
  }
}

/**
 * Dynamically import a module only when needed
 * @param importFn Function that imports the module
 * @returns A function that will load the module when called
 */
export function createDynamicImport<T>(importFn: () => Promise<{ default: T }>): () => Promise<T> {
  let modulePromise: Promise<T> | null = null;
  
  return () => {
    if (!modulePromise) {
      modulePromise = importFn().then(module => module.default);
    }
    return modulePromise;
  };
}
