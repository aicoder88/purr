# Sentry Integration Guide

This document provides examples and best practices for using Sentry in the Purrify application.

## Configuration Files

Sentry is configured in three separate files for different runtime environments:

- **`instrumentation-client.ts`** - Client-side (browser) initialization
- **`sentry.server.config.ts`** - Server-side (Node.js) initialization
- **`sentry.edge.config.ts`** - Edge runtime (middleware, edge routes) initialization

**IMPORTANT:** Initialization only needs to happen in these files. In other files, simply use `import * as Sentry from "@sentry/nextjs"` to reference Sentry functionality.

## Exception Catching

Use `Sentry.captureException(error)` to capture exceptions and log errors in Sentry.

### Example: API Route Error Handling

```typescript
import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { logger } = Sentry;
    logger.info("Processing payment request", { userId: req.body.userId });

    // Your payment logic here
    const result = await processPayment(req.body);

    logger.info("Payment processed successfully", {
      orderId: result.orderId,
      amount: result.amount
    });

    res.status(200).json(result);
  } catch (error) {
    // Capture the exception in Sentry
    Sentry.captureException(error);

    const { logger } = Sentry;
    logger.error("Payment processing failed", {
      userId: req.body.userId,
      error: error.message
    });

    res.status(500).json({
      error: "Payment processing failed",
      message: error.message
    });
  }
}
```

### Example: Component Error Handling

```typescript
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

function BlogEditor() {
  const handleSave = async () => {
    try {
      const { logger } = Sentry;
      logger.info("Saving blog post", { postId: post.id });

      await saveBlogPost(post);

      logger.info("Blog post saved successfully", { postId: post.id });
    } catch (error) {
      Sentry.captureException(error);

      const { logger } = Sentry;
      logger.error("Failed to save blog post", {
        postId: post.id,
        error: error.message
      });

      toast.error("Failed to save blog post");
    }
  };

  return (
    <button onClick={handleSave}>Save</button>
  );
}
```

## Tracing Examples

Spans should be created for meaningful actions like button clicks, API calls, and function calls.

### Custom Span Instrumentation in Component Actions

```typescript
import * as Sentry from "@sentry/nextjs";

function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Create a span to measure performance
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "Add to Cart Button Click",
      },
      (span) => {
        const { logger } = Sentry;

        // Attach attributes to the span
        span.setAttribute("productId", productId);
        span.setAttribute("timestamp", Date.now());

        logger.info("Adding product to cart", { productId });

        addToCart(productId);

        span.setAttribute("cartItemCount", cart.items.length);
        logger.info("Product added to cart successfully", {
          productId,
          cartTotal: cart.total
        });
      },
    );
  };

  return (
    <button type="button" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

### Custom Span Instrumentation in API Calls

```typescript
import * as Sentry from "@sentry/nextjs";

async function fetchBlogPosts(locale: string, page: number) {
  return Sentry.startSpan(
    {
      op: "http.client",
      name: `GET /api/blog-posts`,
    },
    async (span) => {
      const { logger } = Sentry;

      span.setAttribute("locale", locale);
      span.setAttribute("page", page);

      logger.debug(logger.fmt`Fetching blog posts: locale=${locale}, page=${page}`);

      const response = await fetch(`/api/blog-posts?locale=${locale}&page=${page}`);

      span.setAttribute("status", response.status);

      if (!response.ok) {
        logger.error("Failed to fetch blog posts", {
          status: response.status,
          locale,
          page
        });
        throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
      }

      const data = await response.json();

      span.setAttribute("postCount", data.posts.length);
      logger.info("Blog posts fetched successfully", {
        locale,
        page,
        postCount: data.posts.length
      });

      return data;
    },
  );
}
```

### Database Operations

```typescript
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";

async function createOrder(orderData: OrderData) {
  return Sentry.startSpan(
    {
      op: "db.query",
      name: "Create Order",
    },
    async (span) => {
      const { logger } = Sentry;

      span.setAttribute("userId", orderData.userId);
      span.setAttribute("amount", orderData.amount);

      logger.trace("Starting database connection", { database: "orders" });

      const order = await prisma.order.create({
        data: orderData,
        include: {
          items: true,
          user: true
        }
      });

      span.setAttribute("orderId", order.id);
      logger.info("Order created successfully", {
        orderId: order.id,
        userId: orderData.userId,
        amount: orderData.amount
      });

      return order;
    },
  );
}
```

## Structured Logging

Use Sentry's structured logging with the `logger` object. Always use `logger.fmt` as a template literal function to bring variables into structured logs.

### Logger Levels

```typescript
import * as Sentry from "@sentry/nextjs";

const { logger } = Sentry;

// TRACE - Detailed debugging information
logger.trace("Starting database connection", { database: "users" });

// DEBUG - Diagnostic information for debugging
logger.debug(logger.fmt`Cache miss for user: ${userId}`);

// INFO - General informational messages
logger.info("Updated profile", { profileId: 345 });

// WARN - Warning messages for potentially problematic situations
logger.warn("Rate limit reached for endpoint", {
  endpoint: "/api/results/",
  isEnterprise: false,
});

// ERROR - Error messages for failures
logger.error("Failed to process payment", {
  orderId: "order_123",
  amount: 99.99,
});

// FATAL - Critical errors that cause application failure
logger.fatal("Database connection pool exhausted", {
  database: "users",
  activeConnections: 100,
});
```

### Example: Checkout Flow with Logging

```typescript
import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { logger } = Sentry;

  return Sentry.startSpan(
    {
      op: "http.server",
      name: "POST /api/create-checkout-session",
    },
    async (span) => {
      try {
        const { productId, quantity } = req.body;

        span.setAttribute("productId", productId);
        span.setAttribute("quantity", quantity);

        logger.info("Creating checkout session", { productId, quantity });

        // Validate product
        logger.debug(logger.fmt`Validating product: ${productId}`);
        const product = await validateProduct(productId);

        if (!product) {
          logger.warn("Invalid product requested", { productId });
          return res.status(400).json({ error: "Invalid product" });
        }

        // Create Stripe session
        logger.info("Creating Stripe session", {
          productId,
          quantity,
          amount: product.price * quantity
        });

        const session = await createStripeSession(product, quantity);

        span.setAttribute("sessionId", session.id);
        logger.info("Checkout session created successfully", {
          sessionId: session.id,
          productId,
          quantity,
          amount: product.price * quantity
        });

        res.status(200).json({ sessionId: session.id });
      } catch (error) {
        Sentry.captureException(error);

        logger.error("Failed to create checkout session", {
          error: error.message,
          stack: error.stack
        });

        res.status(500).json({ error: "Failed to create checkout session" });
      }
    },
  );
}
```

## Real-World Integration Examples

### 1. Blog Post Generation (AI)

```typescript
import * as Sentry from "@sentry/nextjs";
import { generateBlogContent } from "@/lib/blog/automated-content-generator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return Sentry.startSpan(
    {
      op: "ai.generation",
      name: "Generate Blog Post",
    },
    async (span) => {
      const { logger } = Sentry;

      try {
        const { topic, locale } = req.body;

        span.setAttribute("topic", topic);
        span.setAttribute("locale", locale);

        logger.info("Starting blog post generation", { topic, locale });

        const startTime = Date.now();
        const content = await generateBlogContent(topic, locale);
        const duration = Date.now() - startTime;

        span.setAttribute("generationTime", duration);
        span.setAttribute("contentLength", content.length);

        logger.info("Blog post generated successfully", {
          topic,
          locale,
          duration,
          contentLength: content.length
        });

        res.status(200).json({ content });
      } catch (error) {
        Sentry.captureException(error);

        logger.error("Blog post generation failed", {
          topic: req.body.topic,
          locale: req.body.locale,
          error: error.message
        });

        res.status(500).json({ error: "Generation failed" });
      }
    },
  );
}
```

### 2. Cart Operations with Tracing

```typescript
import * as Sentry from "@sentry/nextjs";
import { createContext, useContext, useState } from "react";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  const addToCart = (productId: string) => {
    Sentry.startSpan(
      {
        op: "cart.add",
        name: "Add Item to Cart",
      },
      (span) => {
        const { logger } = Sentry;

        span.setAttribute("productId", productId);
        span.setAttribute("previousItemCount", cart.items.length);

        logger.info("Adding item to cart", {
          productId,
          currentCartSize: cart.items.length
        });

        const updatedCart = {
          items: [...cart.items, { productId, quantity: 1 }],
          total: cart.total + getProductPrice(productId)
        };

        setCart(updatedCart);

        span.setAttribute("newItemCount", updatedCart.items.length);
        span.setAttribute("newTotal", updatedCart.total);

        logger.info("Item added to cart successfully", {
          productId,
          cartSize: updatedCart.items.length,
          cartTotal: updatedCart.total
        });
      },
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
```

### 3. Protected API Routes

```typescript
import * as Sentry from "@sentry/nextjs";
import { requireAuth } from "@/lib/auth/session";
import { withCSRFProtection } from "@/lib/security/csrf";
import { withRateLimit, RATE_LIMITS } from "@/lib/security/rate-limit";

export default withRateLimit(RATE_LIMITS.CREATE,
  withCSRFProtection(async (req, res) => {
    return Sentry.startSpan(
      {
        op: "http.server",
        name: "POST /api/admin/blog/posts",
      },
      async (span) => {
        const { logger } = Sentry;

        try {
          const session = await requireAuth(req, res, ['admin', 'editor']);
          if (!session) {
            logger.warn("Unauthorized access attempt", {
              endpoint: "/api/admin/blog/posts",
              ip: req.socket.remoteAddress
            });
            return;
          }

          span.setAttribute("userId", session.user.id);
          span.setAttribute("userRole", session.user.role);

          logger.info("Creating blog post", {
            userId: session.user.id,
            title: req.body.title
          });

          const post = await createBlogPost(req.body);

          span.setAttribute("postId", post.id);
          logger.info("Blog post created successfully", {
            postId: post.id,
            userId: session.user.id,
            title: post.title
          });

          res.status(201).json(post);
        } catch (error) {
          Sentry.captureException(error);

          logger.error("Failed to create blog post", {
            error: error.message,
            userId: session?.user?.id
          });

          res.status(500).json({ error: "Failed to create post" });
        }
      },
    );
  })
);
```

## Best Practices

### 1. Always Import Sentry Properly

```typescript
import * as Sentry from "@sentry/nextjs";
```

### 2. Use Structured Logging

```typescript
// GOOD - Structured data
const { logger } = Sentry;
logger.info("User logged in", { userId: user.id, email: user.email });

// BAD - String concatenation
logger.info("User " + user.id + " logged in");
```

### 3. Use logger.fmt for Template Literals

```typescript
// GOOD - Using logger.fmt
const { logger } = Sentry;
logger.debug(logger.fmt`Processing order ${orderId} for user ${userId}`);

// BAD - Regular template literal
logger.debug(`Processing order ${orderId} for user ${userId}`);
```

### 4. Add Meaningful Span Attributes

```typescript
// GOOD - Rich context
Sentry.startSpan(
  { op: "db.query", name: "Fetch Products" },
  (span) => {
    span.setAttribute("category", category);
    span.setAttribute("limit", limit);
    span.setAttribute("locale", locale);
    // ... query logic
  }
);

// BAD - No context
Sentry.startSpan(
  { op: "db.query", name: "Database Query" },
  (span) => {
    // ... query logic
  }
);
```

### 5. Capture Exceptions in Catch Blocks

```typescript
// GOOD
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  logger.error("Operation failed", { error: error.message });
}

// BAD - Silent failure
try {
  await riskyOperation();
} catch (error) {
  console.error(error); // Only logs locally, not to Sentry
}
```

### 6. Use Appropriate Logger Levels

- **trace**: Database connections, cache operations
- **debug**: Cache misses, detailed flow information
- **info**: Successful operations, state changes
- **warn**: Rate limits, deprecated features, soft failures
- **error**: Failed operations, exceptions
- **fatal**: Critical system failures

## Console Logging Integration

The `consoleLoggingIntegration` automatically captures console logs and sends them to Sentry:

```typescript
// These console calls are automatically captured by Sentry
console.log("User session started");
console.warn("API rate limit approaching");
console.error("Payment processing failed");
```

However, prefer using structured logging with `logger` for better context:

```typescript
const { logger } = Sentry;

// PREFERRED - Rich structured data
logger.info("User session started", { userId, sessionId });
logger.warn("API rate limit approaching", { endpoint, remaining: 10 });
logger.error("Payment processing failed", { orderId, error: error.message });
```

## Related Documentation

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Sentry Error Monitoring](https://docs.sentry.io/product/issues/)
