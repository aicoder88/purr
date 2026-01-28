require('dotenv').config({ path: '.env.local' });
const https = require('https');

const ZENDESK_CONFIG = {
    subdomain: process.env.ZENDESK_SUBDOMAIN || 'purrifyca',
    email: process.env.ZENDESK_EMAIL || 'hello@purrify.ca',
    apiToken: process.env.ZENDESK_API_TOKEN || '',
};

console.log(`Testing auth for: ${ZENDESK_CONFIG.email} / ${ZENDESK_CONFIG.subdomain}`);

const credentials = `${ZENDESK_CONFIG.email}/token:${ZENDESK_CONFIG.apiToken}`;
const authHeader = `Basic ${Buffer.from(credentials).toString('base64')}`;

const options = {
    hostname: `${ZENDESK_CONFIG.subdomain}.zendesk.com`,
    path: '/api/v2/users/me.json',
    method: 'GET',
    headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log('Authentication Successful!');
            try {
                const user = JSON.parse(data).user;
                console.log(`Authenticated as: ${user.name} (${user.email})`);
            } catch (e) {
                console.log('Could not parse user data', e);
            }
        } else {
            console.log('Authentication Failed!');
            console.log('Response:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(e);
});
req.end();
