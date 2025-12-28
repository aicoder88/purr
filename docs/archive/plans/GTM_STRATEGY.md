# Google Tag Manager (GTM) Comprehensive Strategy for Purrify

## Current Implementation Status

### ✅ **Currently Implemented**
- **GTM Container**: `GTM-T8WZ5D7R` (properly installed)
- **Google Analytics 4**: `G-R5QTDLW7YR` (needs verification in GTM)
- **DataLayer**: Basic implementation ready

### 🔧 **Implementation Issues Found**
1. **Missing GA4 Integration**: The GA4 tag `G-R5QTDLW7YR` should be configured in GTM
2. **No Enhanced Ecommerce**: Missing detailed product tracking
3. **Limited Event Tracking**: No custom events for user interactions
4. **No Conversion Tracking**: Missing goal and conversion setup

---

## 🎯 **Recommended 50+ GTM Tags Strategy**

### **1. Analytics & Measurement (8 Tags)**

#### **Tag 1: Google Analytics 4 - Configuration**
- **Type**: Google Analytics: GA4 Configuration
- **Measurement ID**: `G-R5QTDLW7YR`
- **Trigger**: All Pages
- **Purpose**: Base GA4 tracking

#### **Tag 2: Google Analytics 4 - Enhanced Ecommerce**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: Dynamic (purchase, add_to_cart, etc.)
- **Trigger**: Custom events
- **Purpose**: Track all ecommerce interactions

#### **Tag 3: Universal Analytics (Legacy)**
- **Type**: Google Analytics: Universal Analytics
- **Tracking ID**: `UA-XXXXXXX-X` (if needed for historical data)
- **Trigger**: All Pages
- **Purpose**: Parallel tracking during transition

#### **Tag 4: Google Analytics 4 - Conversions**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: Conversion events
- **Trigger**: Purchase, Newsletter signup, Contact form
- **Purpose**: Track key conversions

#### **Tag 5: Enhanced Ecommerce - Purchase**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: purchase
- **Trigger**: Purchase confirmation page
- **Purpose**: Track completed purchases

#### **Tag 6: Enhanced Ecommerce - Add to Cart**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: add_to_cart
- **Trigger**: Add to cart button clicks
- **Purpose**: Track cart additions

#### **Tag 7: Enhanced Ecommerce - Begin Checkout**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: begin_checkout
- **Trigger**: Checkout page view
- **Purpose**: Track checkout starts

#### **Tag 8: Enhanced Ecommerce - View Item**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: view_item
- **Trigger**: Product page views
- **Purpose**: Track product interest

### **2. Advertising & Marketing (12 Tags)**

#### **Tag 9: Google Ads Conversion Tracking**
- **Type**: Google Ads Conversion Tracking
- **Conversion ID**: `AW-XXXXXXXXX`
- **Trigger**: Purchase completion
- **Purpose**: Track Google Ads ROI

#### **Tag 10: Google Ads Remarketing**
- **Type**: Google Ads Remarketing
- **Conversion ID**: `AW-XXXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Build remarketing audiences

#### **Tag 11: Facebook Pixel - Base Code**
- **Type**: Custom HTML
- **Pixel ID**: `XXXXXXXXXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Facebook advertising tracking

#### **Tag 12: Facebook Pixel - Purchase**
- **Type**: Custom HTML
- **Event**: Purchase
- **Trigger**: Purchase confirmation
- **Purpose**: Track Facebook ad conversions

#### **Tag 13: Facebook Pixel - Add to Cart**
- **Type**: Custom HTML
- **Event**: AddToCart
- **Trigger**: Add to cart clicks
- **Purpose**: Track cart additions for Facebook

#### **Tag 14: Facebook Pixel - Initiate Checkout**
- **Type**: Custom HTML
- **Event**: InitiateCheckout
- **Trigger**: Checkout page view
- **Purpose**: Track checkout starts for Facebook

#### **Tag 15: Microsoft Advertising (Bing) UET**
- **Type**: Custom HTML
- **UET Tag ID**: `XXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Microsoft Ads tracking

#### **Tag 16: LinkedIn Insight Tag**
- **Type**: Custom HTML
- **Partner ID**: `XXXXXXX`
- **Trigger**: All Pages
- **Purpose**: LinkedIn advertising tracking

#### **Tag 17: Twitter Pixel**
- **Type**: Custom HTML
- **Pixel ID**: `XXXXX-XXXXX`
- **Trigger**: All Pages
- **Purpose**: Twitter advertising tracking

#### **Tag 18: Pinterest Tag**
- **Type**: Custom HTML
- **Tag ID**: `XXXXXXXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Pinterest advertising tracking

#### **Tag 19: TikTok Pixel**
- **Type**: Custom HTML
- **Pixel ID**: `XXXXXXXXXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: TikTok advertising tracking

#### **Tag 20: Snapchat Pixel**
- **Type**: Custom HTML
- **Pixel ID**: `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Snapchat advertising tracking

### **3. User Experience & Behavior (10 Tags)**

#### **Tag 21: Scroll Depth Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: scroll
- **Trigger**: Scroll depth (25%, 50%, 75%, 100%)
- **Purpose**: Measure content engagement

#### **Tag 22: File Download Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: file_download
- **Trigger**: PDF, image, document downloads
- **Purpose**: Track resource downloads

#### **Tag 23: External Link Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: click
- **Trigger**: External link clicks
- **Purpose**: Track outbound traffic

#### **Tag 24: Form Abandonment Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: form_abandon
- **Trigger**: Form start without submission
- **Purpose**: Identify form optimization opportunities

#### **Tag 25: Video Engagement Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: video_start/video_complete
- **Trigger**: Video play/completion
- **Purpose**: Measure video content performance

#### **Tag 26: Search Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: search
- **Trigger**: Site search usage
- **Purpose**: Understand user search behavior

#### **Tag 27: 404 Error Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: page_not_found
- **Trigger**: 404 page views
- **Purpose**: Identify broken links and content gaps

#### **Tag 28: Mobile App Install Prompts**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: app_install_prompt
- **Trigger**: PWA install prompt shown/accepted
- **Purpose**: Track PWA adoption

#### **Tag 29: Language Switch Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: language_switch
- **Trigger**: EN/FR language toggle
- **Purpose**: Understand bilingual user behavior

#### **Tag 30: Dark Mode Toggle**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: theme_change
- **Trigger**: Dark/light mode switch
- **Purpose**: Track user preferences

### **4. Performance & Technical (8 Tags)**

#### **Tag 31: Core Web Vitals**
- **Type**: Custom HTML
- **Purpose**: Track LCP, FID, CLS metrics
- **Trigger**: All Pages
- **Integration**: web-vitals library

#### **Tag 32: Page Load Time**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: timing_complete
- **Trigger**: Page load completion
- **Purpose**: Monitor site performance

#### **Tag 33: JavaScript Error Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: exception
- **Trigger**: JavaScript errors
- **Purpose**: Identify technical issues

#### **Tag 34: API Error Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: api_error
- **Trigger**: Failed API calls
- **Purpose**: Monitor backend performance

#### **Tag 35: Browser Compatibility**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: browser_compatibility
- **Trigger**: Feature detection failures
- **Purpose**: Track browser support issues

#### **Tag 36: Network Connection Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: connection_type
- **Trigger**: Page load
- **Purpose**: Understand user connection quality

#### **Tag 37: Device Performance**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: device_performance
- **Trigger**: Performance metrics collection
- **Purpose**: Optimize for different devices

#### **Tag 38: Service Worker Events**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: service_worker
- **Trigger**: SW install/update/error
- **Purpose**: Monitor PWA functionality

### **5. Business Intelligence (8 Tags)**

#### **Tag 39: Customer Lifetime Value**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: customer_ltv
- **Trigger**: Purchase with customer data
- **Purpose**: Track customer value

#### **Tag 40: Product Performance**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: product_performance
- **Trigger**: Product interactions
- **Purpose**: Analyze product popularity

#### **Tag 41: Seasonal Campaign Tracking**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: campaign_interaction
- **Trigger**: Campaign-specific interactions
- **Purpose**: Measure campaign effectiveness

#### **Tag 42: Geographic Performance**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: geo_performance
- **Trigger**: Location-based interactions
- **Purpose**: Understand regional preferences

#### **Tag 43: Customer Support Interactions**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: support_interaction
- **Trigger**: Help/FAQ/Contact usage
- **Purpose**: Optimize customer support

#### **Tag 44: Referral Source Analysis**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: referral_source
- **Trigger**: Traffic from specific sources
- **Purpose**: Understand acquisition channels

#### **Tag 45: User Journey Mapping**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: user_journey
- **Trigger**: Key page sequences
- **Purpose**: Optimize conversion paths

#### **Tag 46: Inventory Alerts**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: inventory_alert
- **Trigger**: Low stock interactions
- **Purpose**: Monitor inventory impact

### **6. Specialized Tracking (6 Tags)**

#### **Tag 47: Heatmap Integration (Hotjar)**
- **Type**: Custom HTML
- **Site ID**: `XXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Visual user behavior analysis

#### **Tag 48: A/B Testing (Optimizely/VWO)**
- **Type**: Custom HTML
- **Account ID**: `XXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Experiment tracking

#### **Tag 49: Customer Feedback (Typeform/Survicate)**
- **Type**: Custom HTML
- **Widget ID**: `XXXXXXXX`
- **Trigger**: Specific pages
- **Purpose**: Collect user feedback

#### **Tag 50: Live Chat Integration (Intercom/Zendesk)**
- **Type**: Custom HTML
- **App ID**: `XXXXXXXX`
- **Trigger**: All Pages
- **Purpose**: Customer support tracking

#### **Tag 51: Email Marketing (Mailchimp/Klaviyo)**
- **Type**: Custom HTML
- **List ID**: `XXXXXXXX`
- **Trigger**: Newsletter signups
- **Purpose**: Email marketing integration

#### **Tag 52: Review Platform Integration**
- **Type**: Google Analytics: GA4 Event
- **Event Name**: review_interaction
- **Trigger**: Review widget interactions
- **Purpose**: Track review engagement

---

## 🚀 **Implementation Priority**

### **Phase 1: Essential (Immediate)**
1. Verify GA4 configuration (G-R5QTDLW7YR)
2. Enhanced Ecommerce setup
3. Basic conversion tracking
4. Google Ads integration

### **Phase 2: Marketing (Week 1)**
5. Facebook Pixel
6. Microsoft Advertising
7. Remarketing tags
8. Campaign tracking

### **Phase 3: UX & Performance (Week 2)**
9. Scroll depth tracking
10. Form tracking
11. Core Web Vitals
12. Error tracking

### **Phase 4: Advanced (Month 1)**
13. Heatmap integration
14. A/B testing setup
15. Customer journey mapping
16. Advanced segmentation

---

## 📊 **Key Variables to Set Up**

### **DataLayer Variables**
- `page_type` (homepage, product, checkout, etc.)
- `user_type` (new, returning, customer)
- `product_id`, `product_name`, `product_category`
- `transaction_id`, `transaction_value`
- `user_language` (en, fr)
- `cart_value`, `cart_items`

### **Built-in Variables**
- Page URL, Page Path, Page Title
- Referrer, Click URL, Click Text
- Form ID, Form Classes
- Video Title, Video Duration
- Scroll Depth Threshold

### **Custom Variables**
- Customer ID (for logged-in users)
- Session ID
- Experiment ID (for A/B tests)
- Geographic region
- Device type (mobile, tablet, desktop)

---

## 🎯 **Conversion Goals to Track**

### **Primary Conversions**
1. **Purchase** - Product sales
2. **Newsletter Signup** - Email subscriptions
3. **Contact Form** - Lead generation
4. **Trial Request** - Product trials

### **Secondary Conversions**
5. **FAQ Engagement** - Support efficiency
6. **Video Completion** - Content engagement
7. **Store Locator Usage** - Offline attribution
8. **Social Sharing** - Brand advocacy

### **Micro Conversions**
9. **Product Page Views** - Interest indicators
10. **Add to Cart** - Purchase intent
11. **Checkout Start** - Conversion funnel
12. **Download Brochure** - Information requests

---

## 🔧 **Next Steps**

1. **Audit Current Setup**: Verify G-R5QTDLW7YR is properly configured
2. **Implement DataLayer Events**: Use the provided gtm-events.ts file
3. **Set Up Enhanced Ecommerce**: Configure product and purchase tracking
4. **Create Custom Dimensions**: Set up user and session-level data
5. **Test Implementation**: Use GTM Preview mode and GA4 DebugView
6. **Set Up Alerts**: Monitor for data anomalies
7. **Create Dashboards**: Build reporting for key metrics

This comprehensive GTM strategy will provide deep insights into user behavior, marketing performance, and business growth opportunities for Purrify.
