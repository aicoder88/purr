const fetch = require('node-fetch');

async function test() {
  console.log('Starting API test...');
  try {
    const url = 'http://localhost:3000/api/blog-posts?limit=2';
    console.log('Fetching:', url);
    const response = await fetch(url);
    console.log('Response status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('Data received:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      const text = await response.text();
      console.log('API Error Body:', text);
    }
  } catch (err) {
    console.log('Fetch failed:', err.message);
    console.log('Note: This might be expected if the local dev server is not running.');
  }
}

test();
