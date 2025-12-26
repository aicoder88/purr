# Sentry Quick Reference Card

Quick copy-paste examples for common Sentry usage patterns in the Purrify application.

## Import Statement

Always import Sentry at the top of your file:

```typescript
import * as Sentry from "@sentry/nextjs";
```

## Logger Access

Get the logger instance:

```typescript
const { logger } = Sentry;
```

## Common Patterns

### 1. Exception Catching

```typescript
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  const { logger } = Sentry;
  logger.error("Operation failed", { error: error.message });
}
```

### 2. API Route with Tracing

```typescript
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return Sentry.startSpan(
    {
      op: "http.server",
      name: "POST /api/your-endpoint",
    },
    async (span) => {
      const { logger } = Sentry;

      try {
        logger.info("Processing request");
        span.setAttribute("userId", userId);

        // Your logic here

        logger.info("Request completed successfully");
        res.status(200).json({ success: true });
      } catch (error) {
        Sentry.captureException(error);
        logger.error("Request failed", { error: error.message });
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
}
```

### 3. Button Click Tracking

```typescript
const handleClick = () => {
  Sentry.startSpan(
    {
      op: "ui.click",
      name: "Button Click Name",
    },
    (span) => {
      const { logger } = Sentry;
      span.setAttribute("buttonId", buttonId);
      logger.info("Button clicked", { buttonId });

      // Your click logic here
    }
  );
};
```

### 4. Database Query Tracking

```typescript
async function fetchData() {
  return Sentry.startSpan(
    {
      op: "db.query",
      name: "Fetch User Data",
    },
    async (span) => {
      const { logger } = Sentry;
      span.setAttribute("userId", userId);

      logger.debug(logger.fmt`Fetching data for user: ${userId}`);
      const data = await prisma.user.findUnique({ where: { id: userId } });

      logger.info("Data fetched successfully", { userId });
      return data;
    }
  );
}
```

### 5. HTTP Client Request

```typescript
async function fetchExternal(url: string) {
  return Sentry.startSpan(
    {
      op: "http.client",
      name: `GET ${url}`,
    },
    async (span) => {
      const { logger } = Sentry;
      logger.debug(logger.fmt`Fetching URL: ${url}`);

      const response = await fetch(url);
      span.setAttribute("status", response.status);

      logger.info("Request completed", { status: response.status });
      return response.json();
    }
  );
}
```

## Logger Levels

```typescript
const { logger } = Sentry;

logger.trace("Starting connection", { database: "users" });
logger.debug(logger.fmt`Cache miss for: ${key}`);
logger.info("Operation successful", { id: 123 });
logger.warn("Rate limit approaching", { remaining: 10 });
logger.error("Operation failed", { error: error.message });
logger.fatal("Critical system failure", { service: "database" });
```

## Template Literals

Always use `logger.fmt` for template literals:

```typescript
// CORRECT
logger.debug(logger.fmt`Processing item ${itemId}`);

// INCORRECT
logger.debug(`Processing item ${itemId}`);
```

## Span Attributes

Add context to your spans:

```typescript
span.setAttribute("userId", userId);
span.setAttribute("productId", productId);
span.setAttribute("totalAmount", amount);
span.setAttribute("itemCount", items.length);
```

## Protected Route Example

```typescript
import * as Sentry from "@sentry/nextjs";
import { requireAuth } from "@/lib/auth/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return Sentry.startSpan(
    {
      op: "http.server",
      name: "POST /api/admin/action",
    },
    async (span) => {
      const { logger } = Sentry;

      const session = await requireAuth(req, res, ['admin']);
      if (!session) {
        logger.warn("Unauthorized access attempt");
        return;
      }

      span.setAttribute("userId", session.user.id);
      logger.info("Admin action requested", { userId: session.user.id });

      // Your protected logic here
    }
  );
}
```

## Common Operations

| Operation Type | `op` Value | Example |
|----------------|------------|---------|
| API Route | `http.server` | `POST /api/checkout` |
| External API | `http.client` | `GET /external/api` |
| Database Query | `db.query` | `Fetch Orders` |
| Button Click | `ui.click` | `Add to Cart Click` |
| AI Generation | `ai.generation` | `Generate Blog Post` |
| File Upload | `file.upload` | `Upload Image` |

## Configuration Files

- **Client**: `instrumentation-client.ts`
- **Server**: `sentry.server.config.ts`
- **Edge**: `sentry.edge.config.ts`

**Never re-initialize Sentry** in other files. Just import and use.

## See Full Examples

For detailed examples, see:
- [docs/SENTRY_INTEGRATION.md](/docs/SENTRY_INTEGRATION.md) - Complete integration guide
- [pages/api/create-checkout-session.ts](/pages/api/create-checkout-session.ts) - Real-world example
