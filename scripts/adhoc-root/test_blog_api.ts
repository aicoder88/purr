import fetch from 'node-fetch';

async function test() {
  try {
    const response = await fetch('http://localhost:3000/api/blog-posts?limit=2');
    if (response.ok) {
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('API Error:', response.status);
    }
  } catch (err) {
    console.log('Fetch failed (server probably not running):', err.message);
  }
}

test();
