# ChromaDB Setup Guide

ChromaDB is installed in this project but doesn't run automatically - **zero performance impact** when not in use.

## Quick Test

```bash
node test-chromadb.js
```

This will check if ChromaDB server is running and test basic functionality.

## Starting ChromaDB (When You Need It)

### Option 1: Docker (Recommended)

**One-time command:**
```bash
docker run -p 8000:8000 chromadb/chroma
```

**Or add to docker-compose.yml:**
```yaml
services:
  chroma:
    image: chromadb/chroma
    ports:
      - "8000:8000"
    volumes:
      - ./chroma_data:/chroma/chroma
```

Then:
```bash
docker-compose up chroma
```

### Option 2: npm Script

Add to `package.json`:
```json
"scripts": {
  "chroma:start": "docker run -p 8000:8000 chromadb/chroma",
  "chroma:test": "node test-chromadb.js"
}
```

Then:
```bash
pnpm chroma:start  # In one terminal
pnpm chroma:test   # In another terminal
```

## What is ChromaDB Used For?

ChromaDB is a vector database perfect for:
- **Semantic search** - Find similar content based on meaning, not just keywords
- **AI embeddings** - Store and query text embeddings from AI models
- **RAG (Retrieval Augmented Generation)** - Provide context to AI models
- **Document similarity** - Find related blog posts, products, or content

## Example Use Cases for Purrify

1. **Blog Search** - "Find blog posts similar to this topic"
2. **Product Recommendations** - "Customers who liked this also viewed..."
3. **Support Search** - "Find relevant help articles based on customer question"
4. **Content Clustering** - Automatically group related content

## API Example

```javascript
const { ChromaClient } = require('chromadb');

const client = new ChromaClient({
  path: 'http://localhost:8000'
});

// Create collection
const collection = await client.createCollection({
  name: 'blog_posts'
});

// Add documents
await collection.add({
  ids: ['post-1', 'post-2'],
  documents: [
    'Best cat litter for odor control...',
    'How to train your cat...'
  ],
  metadatas: [
    { category: 'products', tags: ['litter', 'odor'] },
    { category: 'training', tags: ['behavior', 'cats'] }
  ]
});

// Search
const results = await collection.query({
  queryTexts: ['smell control for litter box'],
  nResults: 5
});
```

## Performance Notes

- **Not running:** Zero impact on system performance
- **Running:** ~50-100MB RAM, negligible CPU when idle
- **Data storage:** Stored in `./chroma_data` directory (gitignored)

## Troubleshooting

### "Connection refused"
ChromaDB server isn't running. Start it with:
```bash
docker run -p 8000:8000 chromadb/chroma
```

### "Port 8000 already in use"
Another service is using port 8000. Either:
- Stop that service
- Use a different port: `-p 8001:8000`

### "Docker not found"
Install Docker Desktop: https://www.docker.com/products/docker-desktop
