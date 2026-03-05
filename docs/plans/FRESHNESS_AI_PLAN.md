# Purrify Freshness AI - Implementation Plan

> **Goal**: An embedded conversational AI assistant that replaces the fragmented quiz/calculator/blog/checkout flow with a single guided conversation that diagnoses, recommends, educates, and converts.

## Architecture Overview

```
User clicks "Need help choosing?" pill (bottom-right)
        |
        v
  ChatWidget (client component, ~3-turn conversation)
        |
        v
  POST /api/chat (streaming API route)
        |
        v
  Anthropic SDK (claude-haiku-4-5 for speed/cost)
  - System prompt grounded with product catalog + quiz logic + blog excerpts
  - Tool-use for: recommend_product, add_to_cart, get_blog_article
        |
        v
  Response streams back to ChatWidget
        |
        v
  Inline product cards + "Add to Cart" buttons rendered in chat
```

## Why claude-haiku-4-5

- ~$0.001-0.003 per conversation (3 turns)
- Sub-second first-token latency for chat UX
- Tool-use capable (needed for structured product recommendations)
- Already have `@anthropic-ai/sdk` in package.json (^0.68.0)

---

## Implementation Steps

### Phase 1: Streaming API Route

**File**: `app/api/chat/route.ts`

**What it does**:
- Accepts `{ messages: Message[], locale: 'en' | 'fr' }`
- Validates with Zod (max 10 messages, max 500 chars per message)
- Rate-limits by IP using existing `checkRateLimit()` from `src/lib/rate-limit.ts` (use 'general' tier — generous limit since this is a sales tool)
- Calls Anthropic with streaming (`stream: true`)
- Returns a `ReadableStream` with SSE-formatted chunks

**System prompt structure**:
```
You are Purrify's Freshness Advisor — a friendly, concise cat odor expert.

ROLE: Help customers find the right Purrify product in 2-3 questions.
TONE: Warm, knowledgeable, never pushy. Like a helpful friend who knows about cat litter science.
LANGUAGE: Respond in {locale === 'fr' ? 'French' : 'English'}.

PRODUCT CATALOG:
{JSON of PRODUCTS array from src/lib/constants.ts — id, name, price, size, description}

RECOMMENDATION LOGIC (from smell quiz):
- 1 cat, mild odor, small space → Trial 12g ($4.76, shipping included)
- 1 cat, moderate odor → Goldilocks 50g ($14.99) or 50g Autoship ($31.99/quarter)
- 1-2 cats, noticeable odor → Family 120g ($29.99) or 120g Autoship ($49.99/quarter)
- 2+ cats or severe odor → Family 240g ($54.99) or 240g Autoship ($79.99/quarter)
- Always mention autoship saves money when recommending 50g+

KEY FACTS:
- Purrify is activated coconut carbon GRANULES (never say "powder")
- It adsorbs odor molecules (ammonia, mercaptans) — doesn't mask with fragrance
- Sprinkle on top of existing litter — works with any litter type
- Lasts 7+ days per application
- Baking soda saturates in hours; activated carbon works for days
- Safe for cats — food-grade coconut shell carbon

RULES:
- Ask at most 2-3 questions before recommending
- When ready to recommend, use the recommend_product tool
- If the user asks something off-topic, briefly redirect to odor/litter topics
- Never fabricate URLs, studies, or claims not listed above
- Never discuss competitor products by name negatively
- Keep responses under 50 words unless explaining science, then max 99
```

**Tools provided to the model**:

```typescript
tools: [
  {
    name: "recommend_product",
    description: "Recommend a specific Purrify product based on the conversation",
    input_schema: {
      type: "object",
      properties: {
        product_id: {
          type: "string",
          enum: ["purrify-12g", "purrify-50g", "purrify-50g-autoship", "purrify-120g", "purrify-120g-autoship", "purrify-240g", "purrify-240g-autoship"]
        },
        reason: {
          type: "string",
          description: "One-sentence reason for this recommendation"
        },
        suggest_autoship: {
          type: "boolean",
          description: "Whether to also suggest the autoship variant"
        }
      },
      required: ["product_id", "reason"]
    }
  },
  {
    name: "suggest_article",
    description: "Suggest a relevant blog article based on the user's concern",
    input_schema: {
      type: "object",
      properties: {
        article_slug: {
          type: "string",
          enum: [
            "why-does-my-cats-litter-box-smell-so-bad",
            "how-to-neutralize-ammonia-cat-litter",
            "activated-carbon-vs-baking-soda-comparison",
            "how-to-get-rid-of-cat-litter-smell-in-apartment",
            "best-cat-litter-multiple-cats-odor-control",
            "best-cat-litter-odor-control-2026"
          ]
        },
        reason: { type: "string" }
      },
      required: ["article_slug", "reason"]
    }
  }
]
```

**Streaming implementation pattern**:

```typescript
import Anthropic from '@anthropic-ai/sdk';

// In the POST handler:
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const stream = await anthropic.messages.stream({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 300,
  system: SYSTEM_PROMPT,
  tools: TOOLS,
  messages: validatedMessages,
});

// Convert to SSE ReadableStream
const encoder = new TextEncoder();
const readable = new ReadableStream({
  async start(controller) {
    for await (const event of stream) {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
      );
    }
    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
    controller.close();
  },
});

return new Response(readable, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  },
});
```

**Key decisions**:
- No database writes in Phase 1 — conversations are ephemeral (stateless API)
- No auth required — this is a public sales tool
- `max_tokens: 300` keeps responses concise and costs low
- Rate limit: 15 req/min per IP (generous, since it drives sales)

---

### Phase 2: ChatWidget Component

**File**: `src/components/chat/ChatWidget.tsx` (client component)

**Subcomponents** (all in `src/components/chat/`):

| File | Purpose |
|------|---------|
| `ChatWidget.tsx` | Main container: FAB button, panel open/close, message list, input |
| `ChatBubble.tsx` | Individual message bubble (user vs assistant styling) |
| `ProductCard.tsx` | Rendered when `recommend_product` tool is used — shows product image, name, price, "Add to Cart" button |
| `ArticleCard.tsx` | Rendered when `suggest_article` tool is used — blog title + link |
| `TypingIndicator.tsx` | Animated dots while streaming |
| `useChatStream.ts` | Custom hook: manages messages state, handles SSE parsing, exposes `sendMessage()` and `isStreaming` |

**ChatWidget behavior**:

1. **Closed state**: Small pill/FAB in bottom-right corner
   - Text: "Need help choosing?" (en) / "Besoin d'aide?" (fr)
   - Icon: sparkle or chat bubble
   - Subtle entrance animation (slide up after 5s on product/homepage, or 15s on other pages)
   - Respects `prefers-reduced-motion`
   - Position: `fixed bottom-4 right-4 z-50` (above MobileFloatingCTA if present — check for conflicts)

2. **Open state**: Panel slides up from bottom-right
   - Mobile: full-width bottom sheet (max-h-[70vh])
   - Desktop: 400px wide, 500px tall card with rounded corners
   - Header: "Purrify Freshness Advisor" + close button
   - Message area: scrollable, auto-scrolls on new messages
   - Input: single-line text input + send button
   - Initial greeting auto-sent by assistant (not an API call — hardcoded locally):
     - EN: "Hi! I help cat owners find the right Purrify size. How many cats do you have, and how's the litter smell situation?"
     - FR: "Bonjour! Je vous aide a trouver le bon format Purrify. Combien de chats avez-vous, et comment sont les odeurs?"

3. **Streaming**: Messages appear token-by-token. When a tool_use block is detected in the stream, render the appropriate card component inline after the text.

4. **Dark mode**: Full `dark:` variant support on every element (project rule).

5. **Accessibility**:
   - `aria-label` on FAB
   - `role="dialog"` on panel
   - Focus trap when open
   - Escape closes
   - All from translation keys (project rule: no hardcoded a11y strings)

**useChatStream hook** (`src/components/chat/useChatStream.ts`):

```typescript
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolUse?: {
    name: 'recommend_product' | 'suggest_article';
    input: Record<string, unknown>;
  }[];
};

function useChatStream(locale: 'en' | 'fr') {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  async function sendMessage(text: string) { ... }
  function reset() { ... }

  return { messages, isStreaming, sendMessage, reset };
}
```

**SSE parsing logic**:
- Accumulate `content_block_delta` events for text
- Detect `tool_use` content blocks and extract `name` + `input`
- On `message_stop`, finalize the message
- Handle errors gracefully (show "Something went wrong, please try again")

---

### Phase 3: Product Card with Add-to-Cart

**File**: `src/components/chat/ProductCard.tsx`

When the AI calls `recommend_product`, render an inline card:

```
+----------------------------------------+
| [Product Image]                        |
| Purrify Family Size 120g       $29.99  |
| "Perfect for your 2-cat setup"         |
|                                        |
| [  Shop Now  ]  [ Try Autoship ]       |
+----------------------------------------+
```

**"Shop Now" action**: Navigate to the product page with the product pre-selected.
- Link to `localizePath('/products', locale)` with `?select={productId}` query param
- OR link to `localizePath('/products/trial-size', locale)` for the 12g

**"Try Autoship" action** (shown when `suggest_autoship: true`):
- Link to the same product page with `?select={autoshipId}`

**Note**: The project currently does NOT have a cart context/provider (confirmed: `CartContext`/`useCart` grep returned zero results). The checkout flow goes: product page -> create order -> Stripe checkout. So the ProductCard should link to the product page rather than trying to add to a cart that doesn't exist.

---

### Phase 4: i18n Translation Keys

**Files to edit**: `src/translations/en.ts`, `src/translations/fr.ts`, `src/translations/types.ts`

Add a new `chat` namespace:

```typescript
chat: {
  fabLabel: string;           // "Need help choosing?" / "Besoin d'aide?"
  fabAriaLabel: string;       // "Open chat assistant" / "Ouvrir l'assistant"
  panelTitle: string;         // "Freshness Advisor" / "Conseiller Fraicheur"
  closeAriaLabel: string;     // "Close chat" / "Fermer le chat"
  inputPlaceholder: string;   // "Ask about odor control..." / "Posez votre question..."
  sendAriaLabel: string;      // "Send message" / "Envoyer"
  greeting: string;           // Initial assistant message
  errorMessage: string;       // "Something went wrong. Please try again."
  shopNow: string;            // "Shop Now" / "Voir le produit"
  tryAutoship: string;        // "Try Autoship" / "Essayer l'abonnement"
  readArticle: string;        // "Read Article" / "Lire l'article"
  poweredBy: string;          // "Powered by AI" / "Propulse par IA"
  typingLabel: string;        // "Advisor is typing..." / "Le conseiller ecrit..."
}
```

---

### Phase 5: Mount in Layout

**File to edit**: `app/layout.tsx`

Add `<ChatWidget />` inside the providers, after the main content but inside the locale/translation context. It should be:
- Lazy-loaded with `next/dynamic` + `ssr: false` (it's purely interactive, no SEO value)
- Only rendered on public-facing pages (exclude `/admin/*`, `/retailer/*`, `/affiliate/*`)

```typescript
const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), {
  ssr: false,
});
```

Check the existing layout to see where MobileFloatingCTA is mounted — ChatWidget should coordinate with it (z-index, positioning).

---

### Phase 6: Conversation Logging (Lightweight)

**New Prisma model** (optional, can defer):

```prisma
model ChatConversation {
  id          String   @id @default(cuid())
  sessionId   String   // anonymous session ID (from cookie or generated)
  locale      String   @default("en")
  messages    Json     // array of {role, content} — no PII unless user volunteers
  toolCalls   Json?    // array of tool names + inputs used
  productRec  String?  // product_id if recommendation was made
  converted   Boolean  @default(false) // updated by checkout webhook if session matches
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([sessionId])
  @@index([createdAt])
  @@index([productRec])
}
```

**Why**: To measure conversion lift and understand what questions people ask. This informs blog content strategy and product positioning.

**Privacy**: No email/name stored unless user volunteers it in chat. Session ID is an anonymous UUID. Add a small "Powered by AI" label with a tooltip explaining data usage.

**Defer this to Phase 6** — the widget works without it. Ship the widget first, add logging after validating it works.

---

## File Inventory (New Files)

| File | Type | Purpose |
|------|------|---------|
| `app/api/chat/route.ts` | API Route | Streaming chat endpoint |
| `src/components/chat/ChatWidget.tsx` | Client Component | Main widget (FAB + panel) |
| `src/components/chat/ChatBubble.tsx` | Client Component | Message bubble |
| `src/components/chat/ProductCard.tsx` | Client Component | Inline product recommendation card |
| `src/components/chat/ArticleCard.tsx` | Client Component | Inline blog article link card |
| `src/components/chat/TypingIndicator.tsx` | Client Component | Streaming dots animation |
| `src/components/chat/useChatStream.ts` | Hook | SSE stream management |
| `src/lib/chat/system-prompt.ts` | Utility | Builds system prompt from product catalog + locale |
| `src/lib/chat/tools.ts` | Utility | Tool definitions for Anthropic API |

## Files to Edit

| File | Change |
|------|--------|
| `src/translations/en.ts` | Add `chat` namespace |
| `src/translations/fr.ts` | Add `chat` namespace |
| `src/translations/types.ts` | Add `chat` type definitions |
| `app/layout.tsx` | Mount `<ChatWidget />` with dynamic import |

## Files NOT to Touch

- No Prisma migration in Phase 1-5 (logging is Phase 6)
- No changes to existing checkout flow
- No changes to existing product pages
- No changes to smell quiz or calculator (they stay as-is; the AI just knows their logic)

---

## Existing Code to Reuse

| What | Where | How |
|------|-------|-----|
| Product catalog | `src/lib/constants.ts` → `PRODUCTS` | Import into system-prompt builder |
| Rate limiting | `src/lib/rate-limit.ts` → `checkRateLimit()` | Use in API route |
| Locale detection | `useLocale()` from `next-intl` | Pass to hook and API |
| Path localization | `src/lib/i18n/locale-path.ts` → `localizePath()` | Product/article links in cards |
| Button component | `src/components/ui/button.tsx` | Reuse in cards and input |
| Container component | `src/components/ui/container.tsx` | Not needed (widget is fixed-position) |
| Anthropic SDK | `@anthropic-ai/sdk` (already installed) | API route |
| Blog article data | Hardcode the 6 article slugs from SmellQuizContent's LEARNING_ARTICLES | In tool enum |
| Quiz logic | SmellQuizContent's `calculateResult()` weights | Encode into system prompt as recommendation rules |
| GTM events | `src/lib/gtm-events.ts` | Fire events: `chat_open`, `chat_message_sent`, `chat_product_recommended`, `chat_product_clicked` |

---

## Implementation Order

```
1. src/lib/chat/tools.ts              (tool definitions — pure data)
2. src/lib/chat/system-prompt.ts      (prompt builder — pure function)
3. app/api/chat/route.ts              (streaming endpoint)
4. src/components/chat/useChatStream.ts (SSE hook)
5. src/components/chat/TypingIndicator.tsx
6. src/components/chat/ChatBubble.tsx
7. src/components/chat/ProductCard.tsx
8. src/components/chat/ArticleCard.tsx
9. src/translations/types.ts          (add chat type)
10. src/translations/en.ts            (add chat translations)
11. src/translations/fr.ts            (add chat translations)
12. src/components/chat/ChatWidget.tsx (main component, composes all above)
13. app/layout.tsx                     (mount widget)
```

Steps 1-3 are backend. Steps 4-8 are independent UI components. Steps 9-11 are i18n. Step 12 composes everything. Step 13 ships it.

---

## Validation Checklist (before commit)

- [ ] `pnpm check-types` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm validate-i18n:hardcoded` passes (no hardcoded UI strings)
- [ ] `pnpm validate-dark-mode` passes (all elements have dark: variants)
- [ ] `pnpm validate-hydration` passes (no conditional null returns)
- [ ] `pnpm build` succeeds
- [ ] Manual test: widget appears on homepage, opens, accepts input, streams response
- [ ] Manual test: product card renders with correct link
- [ ] Manual test: works in both en and fr
- [ ] Manual test: dark mode looks correct
- [ ] Manual test: mobile layout (bottom sheet) works
- [ ] Manual test: doesn't appear on /admin/* routes

---

## Cost Estimate

| Metric | Value |
|--------|-------|
| claude-haiku-4-5 input | ~$0.80/M tokens |
| claude-haiku-4-5 output | ~$4/M tokens |
| Avg conversation | ~800 input + 300 output tokens |
| Cost per conversation | ~$0.002 |
| 1000 conversations/month | ~$2/month |
| Break-even | 1 extra sale per month ($14.99+) pays for 7,500 conversations |

---

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| AI says something wrong about product | System prompt is tightly constrained; `max_tokens: 300` limits rambling; tool-use forces structured recs |
| API key exposed | Key stays server-side in API route; never sent to client |
| Cost spikes from abuse | Rate limiting (20 req/min/IP); max 10 messages per conversation; short max_tokens |
| Slow response | Haiku is fast (~500ms TTFT); streaming means user sees text immediately |
| Widget conflicts with MobileFloatingCTA | Check z-index layering; hide FAB when MobileFloatingCTA is visible, or offset position |
| Hallucinated URLs | Tool-use with enum constraints means only real product IDs and article slugs can be returned |
| ANTHROPIC_API_KEY not set | Gracefully hide the widget if env var is missing (check in layout before rendering) |

---

## Environment Variable

Add to `.env.local`:
```
# Already exists (used by blog AI):
ANTHROPIC_API_KEY=sk-ant-...
```

No new env vars needed. The existing `ANTHROPIC_API_KEY` is reused.

---

## Future Enhancements (NOT in scope now)

- Phase 6: Conversation logging (Prisma model + migration)
- A/B test widget vs no widget (conversion lift measurement)
- Proactive triggers: "I noticed you've been on this page for 30s — can I help?"
- Conversation handoff to email if user provides it
- "Send my recommendation to email" button
- Integration with abandoned cart: if user had a chat recommendation, reference it in recovery email
