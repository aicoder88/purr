/**
 * Apple-Inspired UX Optimization System
 * Combining Apple's design philosophy with performance and conversion optimization
 * "Simplicity is the ultimate sophistication" - Steve Jobs
 */

interface AppleUXConfig {
  animations: {
    duration: number;
    easing: string;
    reducedMotion: boolean;
  };
  gestures: {
    enableSwipeGestures: boolean;
    enablePinchZoom: boolean;
    enableHapticFeedback: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    voiceOver: boolean;
  };
}

interface MicroInteraction {
  trigger: string;
  animation: string;
  duration: number;
  feedback: 'visual' | 'haptic' | 'audio' | 'none';
}

export class AppleUXOptimizer {
  private config: AppleUXConfig;
  private activeAnimations: Map<string, Animation> = new Map();
  private touchStartTime: number = 0;
  private lastTouchPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    this.config = {
      animations: {
        duration: 300, // Apple's preferred 300ms
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Apple's material motion
        reducedMotion: this.prefersReducedMotion()
      },
      gestures: {
        enableSwipeGestures: 'ontouchstart' in window,
        enablePinchZoom: false, // Disabled for better control
        enableHapticFeedback: 'vibrate' in navigator
      },
      accessibility: {
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
        largeText: window.matchMedia('(prefers-font-size: large)').matches,
        voiceOver: this.detectScreenReader()
      }
    };

    this.initializeAppleUX();
  }

  /**
   * Initialize Apple-style UX enhancements
   */
  private initializeAppleUX() {
    if (typeof window === 'undefined') return;

    // Initialize smooth animations
    this.initializeSmoothAnimations();
    
    // Setup Apple-style touch interactions
    this.initializeTouchInteractions();
    
    // Create micro-interactions
    this.initializeMicroInteractions();
    
    // Setup accessibility enhancements
    this.initializeAccessibilityFeatures();
    
    // Add Apple-style loading states
    this.initializeLoadingStates();
    
    // Setup gesture recognition
    this.initializeGestureRecognition();
    
    // Montreal-specific UX optimizations
    this.initializeMontrealOptimizations();
  }

  /**
   * Apple's signature smooth animations
   */
  private initializeSmoothAnimations() {
    // Ensure all animations respect user preferences
    if (this.config.animations.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0ms');
      return;
    }

    // Add CSS custom properties for consistent timing
    document.documentElement.style.setProperty('--animation-duration', `${this.config.animations.duration}ms`);
    document.documentElement.style.setProperty('--animation-easing', this.config.animations.easing);

    // Smooth page transitions
    this.addSmoothPageTransitions();
    
    // Smooth scroll with momentum
    this.addMomentumScrolling();
    
    // Parallax effects (subtle, Apple-style)
    this.addSubtleParallax();
  }

  /**
   * Apple-style touch interactions
   */
  private initializeTouchInteractions() {
    // Add touch feedback to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    interactiveElements.forEach(element => {
      this.addAppleTouchFeedback(element as HTMLElement);
    });

    // Add swipe gestures for product carousels
    this.addSwipeGestures();
    
    // Add long press interactions
    this.addLongPressInteractions();
  }

  /**
   * Micro-interactions that delight users
   */
  private initializeMicroInteractions() {
    const microInteractions: MicroInteraction[] = [
      {
        trigger: 'button:hover',
        animation: 'scale(1.02) translateY(-1px)',
        duration: 200,
        feedback: 'visual'
      },
      {
        trigger: 'button:active',
        animation: 'scale(0.98)',
        duration: 100,
        feedback: 'haptic'
      },
      {
        trigger: 'card:hover',
        animation: 'translateY(-4px) scale(1.01)',
        duration: 300,
        feedback: 'visual'
      },
      {
        trigger: 'image:load',
        animation: 'opacity(0) to opacity(1)',
        duration: 400,
        feedback: 'none'
      },
      {
        trigger: 'form:success',
        animation: 'bounceIn',
        duration: 500,
        feedback: 'visual'
      }
    ];

    microInteractions.forEach(interaction => {
      this.implementMicroInteraction(interaction);
    });
  }

  /**
   * Apple-level accessibility features
   */
  private initializeAccessibilityFeatures() {
    // Dynamic text sizing
    if (this.config.accessibility.largeText) {
      document.documentElement.style.fontSize = '1.2em';
    }

    // High contrast mode
    if (this.config.accessibility.highContrast) {
      document.documentElement.classList.add('high-contrast');
    }

    // VoiceOver/screen reader optimizations
    if (this.config.accessibility.voiceOver) {
      this.optimizeForScreenReaders();
    }

    // Keyboard navigation enhancements
    this.enhanceKeyboardNavigation();
    
    // Focus management
    this.addFocusManagement();
  }

  /**
   * Apple-style loading states
   */
  private initializeLoadingStates() {
    // Skeleton loaders for content
    this.addSkeletonLoaders();
    
    // Progressive image loading
    this.addProgressiveImageLoading();
    
    // Smart loading indicators
    this.addSmartLoadingIndicators();
  }

  /**
   * Advanced gesture recognition
   */
  private initializeGestureRecognition() {
    if (!this.config.gestures.enableSwipeGestures) return;

    let startX = 0, startY = 0, endX = 0, endY = 0;

    document.addEventListener('touchstart', (e) => {
      this.touchStartTime = Date.now();
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      this.lastTouchPosition = { x: startX, y: startY };
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - this.touchStartTime;
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      // Detect swipe gestures
      this.detectSwipeGesture(startX, startY, endX, endY, touchDuration);
      
      // Detect tap vs long press
      this.detectTapGesture(touchDuration);
    }, { passive: true });
  }

  /**
   * Montreal-specific UX optimizations
   */
  private initializeMontrealOptimizations() {
    // Bilingual interface enhancements
    this.addBilingualUXFeatures();
    
    // Winter mode UI (darker, easier on eyes during long winter days)
    this.addSeasonalOptimizations();
    
    // Mobile-first optimizations (high mobile usage in Montreal)
    this.addMobileFirstOptimizations();
    
    // Local cultural adaptations
    this.addCulturalAdaptations();
  }

  /**
   * Add Apple-style touch feedback to elements
   */
  private addAppleTouchFeedback(element: HTMLElement) {

    const startFeedback = () => {
      // Visual feedback
      element.style.transform = 'scale(0.95)';
      element.style.transition = 'transform 0.1s cubic-bezier(0.4, 0.0, 0.2, 1)';
      
      // Haptic feedback (if supported)
      if (this.config.gestures.enableHapticFeedback) {
        navigator.vibrate?.(10); // Subtle vibration
      }
    };

    const endFeedback = () => {
      // Spring-back animation
      element.style.transform = 'scale(1)';
      element.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      // Remove transition after animation
      setTimeout(() => {
        element.style.transition = '';
      }, 200);
    };

    // Touch events
    element.addEventListener('touchstart', startFeedback, { passive: true });
    element.addEventListener('touchend', endFeedback, { passive: true });
    element.addEventListener('touchcancel', endFeedback, { passive: true });

    // Mouse events for desktop
    element.addEventListener('mousedown', startFeedback);
    element.addEventListener('mouseup', endFeedback);
    element.addEventListener('mouseleave', endFeedback);
  }

  /**
   * Add smooth page transitions
   */
  private addSmoothPageTransitions() {
    // Intercept navigation for smooth transitions
    const handleNavigation = (href: string) => {
      // Fade out current content
      document.body.style.opacity = '0';
      document.body.style.transition = `opacity ${this.config.animations.duration}ms ${this.config.animations.easing}`;
      
      setTimeout(() => {
        window.location.href = href;
      }, this.config.animations.duration / 2);
    };

    // Apply to all internal links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hostname === window.location.hostname && !link.hasAttribute('data-no-transition')) {
        e.preventDefault();
        handleNavigation(link.href);
      }
    });

    // Fade in on page load
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
      document.body.style.transition = `opacity ${this.config.animations.duration}ms ${this.config.animations.easing}`;
    });
  }

  /**
   * Add momentum scrolling (iOS-style)
   */
  private addMomentumScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add momentum to scrollable elements
    const scrollableElements = document.querySelectorAll('[data-scrollable]');
    scrollableElements.forEach(element => {
      (element as HTMLElement).style.webkitOverflowScrolling = 'touch';
      (element as HTMLElement).style.scrollBehavior = 'smooth';
    });
  }

  /**
   * Add subtle parallax effects
   */
  private addSubtleParallax() {
    if (this.config.animations.reducedMotion) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const updateParallax = () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat((element as HTMLElement).dataset.parallax || '0.5');
        const yPos = -(scrollY * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Add swipe gestures for carousels
   */
  private addSwipeGestures() {
    const carousels = document.querySelectorAll('[data-carousel]');
    
    carousels.forEach(carousel => {
      let startX = 0;
      let scrollLeft = 0;
      
      carousel.addEventListener('touchstart', (e: Event) => {
        const touchEvent = e as TouchEvent;
        startX = touchEvent.touches[0].pageX - carousel.getBoundingClientRect().left;
        scrollLeft = carousel.scrollLeft;
      }, { passive: true });
      
      carousel.addEventListener('touchmove', (e: Event) => {
        const touchEvent = e as TouchEvent;
        const x = touchEvent.touches[0].pageX - carousel.getBoundingClientRect().left;
        const walk = (x - startX) * 2; // Scroll speed
        carousel.scrollLeft = scrollLeft - walk;
      }, { passive: false });
    });
  }

  /**
   * Implement a specific micro-interaction
   */
  private implementMicroInteraction(interaction: MicroInteraction) {
    const [selector, event] = interaction.trigger.split(':');
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      element.addEventListener(event, () => {
        this.playMicroInteraction(element as HTMLElement, interaction);
      });
    });
  }

  /**
   * Play a micro-interaction animation
   */
  private playMicroInteraction(element: HTMLElement, interaction: MicroInteraction) {
    // Cancel any existing animation
    const existingAnimation = this.activeAnimations.get(element.id || element.tagName);
    if (existingAnimation) {
      existingAnimation.cancel();
    }

    // Apply the animation
    const animation = element.animate(
      this.parseAnimationKeyframes(interaction.animation),
      {
        duration: interaction.duration,
        easing: this.config.animations.easing,
        fill: 'forwards'
      }
    );

    this.activeAnimations.set(element.id || element.tagName, animation);

    // Haptic feedback
    if (interaction.feedback === 'haptic' && this.config.gestures.enableHapticFeedback) {
      navigator.vibrate?.(5);
    }

    // Clean up after animation
    animation.addEventListener('finish', () => {
      this.activeAnimations.delete(element.id || element.tagName);
    });
  }

  /**
   * Add skeleton loaders for better perceived performance
   */
  private addSkeletonLoaders() {
    const skeletonCSS = `
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      .skeleton-text {
        height: 1em;
        margin-bottom: 0.5em;
        border-radius: 4px;
      }
      
      .skeleton-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    `;

    // Add skeleton CSS to head
    const style = document.createElement('style');
    style.textContent = skeletonCSS;
    document.head.appendChild(style);
  }

  /**
   * Bilingual UX enhancements for Montreal
   */
  private addBilingualUXFeatures() {
    // Language toggle with smooth animation
    const languageToggle = document.querySelector('[data-language-toggle]');
    if (languageToggle) {
      languageToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.animateLanguageSwitch();
      });
    }

    // Auto-detect preferred language based on browser/location
    this.detectPreferredLanguage();
    
    // Smooth transitions between language versions
    this.addLanguageTransitions();
  }

  /**
   * Animate language switching
   */
  private animateLanguageSwitch() {
    const content = document.querySelector('main');
    if (!content) return;

    // Fade out
    content.style.opacity = '0';
    content.style.transform = 'translateY(10px)';
    content.style.transition = `all ${this.config.animations.duration}ms ${this.config.animations.easing}`;

    // Switch language and fade in
    setTimeout(() => {
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
    }, this.config.animations.duration);
  }

  /**
   * Seasonal optimizations for Montreal climate
   */
  private addSeasonalOptimizations() {
    const now = new Date();
    const month = now.getMonth();
    
    // Winter months (darker UI, easier on eyes)
    if (month >= 10 || month <= 2) {
      document.documentElement.classList.add('winter-mode');
      
      // Add winter-specific styles
      const winterCSS = `
        .winter-mode {
          --bg-primary: #1a1a1a;
          --text-primary: #f0f0f0;
          --accent-color: #FF5555;
        }
      `;
      
      const style = document.createElement('style');
      style.textContent = winterCSS;
      document.head.appendChild(style);
    }
  }

  // Helper methods
  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private detectScreenReader(): boolean {
    return window.speechSynthesis !== undefined || 
           navigator.userAgent.includes('NVDA') ||
           navigator.userAgent.includes('JAWS');
  }

  private parseAnimationKeyframes(animation: string): Keyframe[] {
    // Parse animation string into keyframes
    // This is a simplified version - would need more robust parsing
    if (animation.includes('scale')) {
      const scaleMatch = animation.match(/scale\(([\d.]+)\)/);
      const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
      return [{ transform: 'scale(1)' }, { transform: `scale(${scale})` }];
    }
    
    return [{ opacity: '0' }, { opacity: '1' }];
  }

  private detectSwipeGesture(startX: number, startY: number, endX: number, endY: number, duration: number) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Must be fast swipe with sufficient distance
    if (duration < 300 && distance > 50) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        const direction = deltaX > 0 ? 'right' : 'left';
        this.handleSwipeGesture(direction);
      }
    }
  }

  private detectTapGesture(duration: number) {
    if (duration < 200) {
      // Quick tap
      this.handleTapGesture();
    } else if (duration > 500) {
      // Long press
      this.handleLongPressGesture();
    }
  }

  private handleSwipeGesture(direction: 'left' | 'right') {
    // Handle swipe gestures (e.g., carousel navigation)
    document.dispatchEvent(new CustomEvent('swipe', { detail: { direction } }));
  }

  private handleTapGesture() {
    // Handle tap gestures
  }

  private handleLongPressGesture() {
    // Handle long press gestures
    if (this.config.gestures.enableHapticFeedback) {
      navigator.vibrate?.(50); // Longer vibration for long press
    }
  }

  private optimizeForScreenReaders() {
    // Add ARIA labels where missing
    // Improve focus management
    // Add screen reader specific content
  }

  private enhanceKeyboardNavigation() {
    // Improve tab order
    // Add keyboard shortcuts
    // Ensure all interactive elements are keyboard accessible
  }

  private addFocusManagement() {
    // Manage focus for modal dialogs
    // Skip links for main content
    // Focus indicators
  }

  private addProgressiveImageLoading() {
    // Implement progressive JPEG loading
    // Low-quality image placeholders
    // Smooth transitions when images load
  }

  private addSmartLoadingIndicators() {
    // Context-aware loading states
    // Progress indicators for long operations
    // Skeleton screens for predictable layouts
  }

  private addLongPressInteractions() {
    // Long press for additional options
    // Context menus
    // Enhanced touch interactions
  }

  private detectPreferredLanguage() {
    // Detect user's preferred language
    // Store preference
    // Apply appropriate language
  }

  private addLanguageTransitions() {
    // Smooth transitions between languages
    // Maintain scroll position
    // Preserve form data
  }

  private addMobileFirstOptimizations() {
    // Touch-friendly sizing
    // Gesture navigation
    // Mobile-specific UI patterns
  }

  private addCulturalAdaptations() {
    // Montreal/Quebec cultural elements
    // Local imagery and references
    // Culturally appropriate colors and fonts
  }
}

// Export singleton instance
export const appleUXOptimizer = new AppleUXOptimizer();

// Montreal-specific UX configuration
export const MONTREAL_UX_CONFIG = {
  // Bilingual interface settings
  bilingual: {
    defaultLanguage: 'fr', // French first in Quebec
    languageTogglePosition: 'top-right',
    smoothTransitions: true,
    preserveState: true
  },
  
  // Seasonal adaptations
  seasonal: {
    winterMode: true, // Darker UI for long winter days
    summerBrightness: true, // Higher contrast for sunny days
    autoDetect: true
  },
  
  // Mobile optimizations (high mobile usage in Montreal)
  mobile: {
    touchTargetSize: 44, // 44px minimum (Apple guideline)
    swipeGestures: true,
    hapticFeedback: true,
    winterGloves: true // Larger touch targets in winter
  },
  
  // Cultural preferences
  cultural: {
    colorPreferences: ['#0072CE', '#FF3131', '#FFFFFF'], // Quebec flag colors
    fontPreferences: ['Inter', 'Helvetica Neue', 'Arial'],
    iconStyle: 'outline' // Clean, minimal icons
  }
};
