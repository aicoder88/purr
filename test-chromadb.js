/**
 * ChromaDB Connection Test
 *
 * IMPORTANT: ChromaDB JavaScript client requires a running server.
 * This test checks if the server is available and tests basic functionality.
 *
 * Quick Start (when you need ChromaDB):
 *   docker run -p 8000:8000 chromadb/chroma
 *
 * Or add to docker-compose.yml:
 *   chroma:
 *     image: chromadb/chroma
 *     ports:
 *       - "8000:8000"
 */

const { ChromaClient } = require('chromadb');

// Lightweight custom embedding function (no ML dependencies)
class SimpleEmbeddingFunction {
  async generate(texts) {
    return texts.map(text => {
      const embedding = new Array(384).fill(0);
      const words = text.toLowerCase().split(/\s+/);

      words.forEach((word, idx) => {
        for (let i = 0; i < word.length; i++) {
          const pos = (word.charCodeAt(i) + idx * 37) % 384;
          embedding[pos] += 1 / (i + 1);
        }
      });

      const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
      return embedding.map(val => val / (magnitude || 1));
    });
  }
}

async function testChromaDB() {
  console.log('🧪 ChromaDB Connection Test\n');

  const client = new ChromaClient({
    path: 'http://localhost:8000'
  });

  try {
    // Test connection by getting heartbeat
    console.log('1️⃣ Testing connection to ChromaDB server...');
    await client.heartbeat();
    console.log('✅ ChromaDB server is running!\n');
  } catch (error) {
    console.log('❌ ChromaDB server is not running\n');
    console.log('To start ChromaDB server:');
    console.log('  docker run -p 8000:8000 chromadb/chroma');
    console.log('\nOr add to docker-compose.yml:\n');
    console.log('  chroma:');
    console.log('    image: chromadb/chroma');
    console.log('    ports:');
    console.log('      - "8000:8000"');
    console.log('\n💡 ChromaDB is installed but only runs when you need it.');
    console.log('   No performance impact when not in use!\n');
    process.exit(0);
  }

  try {
    // Create test collection
    console.log('2️⃣ Creating test collection...');
    const collectionName = 'test_collection';

    // Cleanup previous test
    try {
      await client.deleteCollection({ name: collectionName });
    } catch (error) {
      // Collection doesn't exist
    }

    const collection = await client.createCollection({
      name: collectionName,
      embeddingFunction: new SimpleEmbeddingFunction()
    });
    console.log(`✅ Collection "${collectionName}" created\n`);

    // Add test documents
    console.log('3️⃣ Adding test documents...');
    await collection.add({
      ids: ['doc1', 'doc2', 'doc3'],
      documents: [
        'Cats love to play with feather toys and laser pointers',
        'Dogs enjoy long walks in the park and playing fetch',
        'Cats are independent, curious, and excellent hunters'
      ],
      metadatas: [
        { category: 'cat-toys', type: 'behavior' },
        { category: 'dog-care', type: 'activity' },
        { category: 'cat-behavior', type: 'personality' }
      ]
    });
    console.log('✅ Added 3 test documents\n');

    // Query the collection
    console.log('4️⃣ Querying for cat-related content...');
    const results = await collection.query({
      queryTexts: ['feline pets and their behavior'],
      nResults: 2
    });

    console.log('📊 Query Results:');
    results.documents[0].forEach((doc, idx) => {
      console.log(`\n   ${idx + 1}. "${doc}"`);
      console.log(`      Category: ${results.metadatas[0][idx].category}`);
      console.log(`      Distance: ${results.distances[0][idx].toFixed(4)}`);
    });
    console.log('');

    // Get collection info
    console.log('5️⃣ Collection info...');
    const count = await collection.count();
    console.log(`✅ Collection contains ${count} documents\n`);

    // Cleanup
    console.log('6️⃣ Cleaning up...');
    await client.deleteCollection({ name: collectionName });
    console.log('✅ Test collection deleted\n');

    console.log('🎉 All tests passed successfully!');
    console.log('✨ ChromaDB is working correctly and ready to use.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the test
testChromaDB();
