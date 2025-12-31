import React, { useEffect } from 'react';
import Script from 'next/script';

interface HeatmapIntegrationProps {
  hotjarId?: string;
  microsoftClarityId?: string;
  fullstoryOrgId?: string;
  enabled?: boolean;
  environment?: 'development' | 'staging' | 'production';
}

export const HeatmapIntegration: React.FC<HeatmapIntegrationProps> = ({
  hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID,
  microsoftClarityId = process.env.NEXT_PUBLIC_CLARITY_ID,
  fullstoryOrgId = process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID,
  enabled = true,
  environment = 'production'
}) => {
  // Only load in production or when explicitly enabled
  const shouldLoad = enabled && (environment === 'production' || process.env.NODE_ENV === 'development');

  useEffect(() => {
    if (!shouldLoad) return;

    // Store references for cleanup
    const cleanupHandlers: Array<{ element: Element; handler: EventListener }> = [];

    // Shared click handler factory
    const createClickHandler = (selector: string): EventListener => {
      return () => {
        if (typeof globalThis.window !== 'undefined') {
          // Hotjar event
          if (window.hj) {
            window.hj('event', 'critical_interaction');
          }

          // Microsoft Clarity event
          if (window.clarity) {
            window.clarity('set', 'critical_interaction', selector);
          }

          // FullStory event
          if (window.FS) {
            window.FS.event('Critical Interaction', {
              element: selector,
              page: window.location.pathname
            });
          }
        }
      };
    };

    // Initialize heatmap tracking events
    const trackHeatmapEvents = () => {
      // Track critical user interactions for heatmap analysis
      const criticalElements = [
        '[data-heatmap="cta-button"]',
        '[data-heatmap="product-card"]',
        '[data-heatmap="navigation"]',
        '[data-heatmap="form-field"]',
        '[data-heatmap="social-proof"]'
      ];

      criticalElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const handler = createClickHandler(selector);
          element.addEventListener('click', handler);
          cleanupHandlers.push({ element, handler });
        });
      });
    };

    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackHeatmapEvents);
    } else {
      trackHeatmapEvents();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', trackHeatmapEvents);
      // Clean up all click listeners
      cleanupHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <>
      {/* Hotjar Tracking Code */}
      {hotjarId && (
        <Script
          id="hotjar-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
          }}
        />
      )}

      {/* Microsoft Clarity */}
      {microsoftClarityId && (
        <Script
          id="clarity-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${microsoftClarityId}");
            `
          }}
        />
      )}

      {/* FullStory */}
      {fullstoryOrgId && (
        <Script
          id="fullstory-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window['_fs_debug'] = false;
              window['_fs_host'] = 'fullstory.com';
              window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
              window['_fs_org'] = '${fullstoryOrgId}';
              window['_fs_namespace'] = 'FS';
              (function(m,n,e,t,l,o,g,y){
                if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); } return;}
                g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
                o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
                y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
                g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
                g.anonymize=function(){g.identify(!!0)};
                g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
                g.log = function(a,b){g("log",[a,b])};
                g.consent=function(a){g("consent",!arguments.length||a)};
                g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
                g.clearUserCookie=function(){};
                g.setVars=function(n, p){g('setVars',[n,p]);};
                g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
                if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
                g._v="1.3.0";
              })(window,document,window['_fs_namespace'],'script','user');
            `
          }}
        />
      )}
    </>
  );
};

// Helper component to mark elements for heatmap tracking
export const HeatmapTracker: React.FC<{
  type: 'cta-button' | 'product-card' | 'navigation' | 'form-field' | 'social-proof';
  children: React.ReactNode;
  className?: string;
}> = ({ type, children, className = '' }) => {
  return (
    <div data-heatmap={type} className={className}>
      {children}
    </div>
  );
};

// Hook for programmatic heatmap events
export const useHeatmapTracking = () => {
  const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof globalThis.window === 'undefined') return;

    // Hotjar
    if (window.hj) {
      window.hj('event', eventName);
    }

    // Microsoft Clarity
    if (window.clarity) {
      window.clarity('set', eventName, properties || {});
    }

    // FullStory
    if (window.FS) {
      window.FS.event(eventName, properties || {});
    }
  };

  const identifyUser = (userId: string, userProperties?: Record<string, unknown>) => {
    if (typeof globalThis.window === 'undefined') return;

    // Hotjar
    if (window.hj) {
      window.hj('identify', userId, userProperties || {});
    }

    // FullStory
    if (window.FS) {
      window.FS.identify(userId, userProperties || {});
    }
  };

  const setUserProperties = (properties: Record<string, unknown>) => {
    if (typeof globalThis.window === 'undefined') return;

    // Microsoft Clarity
    if (window.clarity) {
      const clarity = window.clarity;
      Object.entries(properties).forEach(([key, value]) => {
        clarity('set', key, value);
      });
    }

    // FullStory
    if (window.FS) {
      window.FS.setUserVars(properties);
    }
  };

  return {
    trackEvent,
    identifyUser,
    setUserProperties
  };
};

export default HeatmapIntegration;
