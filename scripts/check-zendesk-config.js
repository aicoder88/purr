require('dotenv').config({ path: '.env.local' });

const email = process.env.ZENDESK_EMAIL;
const token = process.env.ZENDESK_API_TOKEN;
const subdomain = process.env.ZENDESK_SUBDOMAIN;

console.log('--- Zendesk Configuration Check ---');
console.log('Subdomain:', subdomain || '(not set, will default to purrifyca)');
console.log('Email:', email || '(not set, will default to hello@purrify.ca)');
console.log('API Token set:', !!token);
if (token) {
    console.log('API Token length:', token.length);
    console.log('API Token starts with:', token.substring(0, 4) + '...');
} else {
    console.log('ERROR: ZENDESK_API_TOKEN is missing!');
}
console.log('-----------------------------------');
