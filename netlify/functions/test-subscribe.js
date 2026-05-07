const API_KEY = process.env.SYSTEME_API_KEY;
const EMAIL = 'joseph1234@gmail.com';
const FIRST_NAME = 'Test';
const LAST_NAME = 'User';
const PHONE = '+44 7700 000000';

if (!API_KEY) {
  console.error('Missing SYSTEME_API_KEY — create a .env file at the project root with SYSTEME_API_KEY=your_key');
  process.exit(1);
}

console.log('--- POST /contacts (all fields in one call) ---');
const res = await fetch('https://api.systeme.io/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
  body: JSON.stringify({
    email: EMAIL,
    fields: [
      { slug: 'first_name', value: FIRST_NAME },
      { slug: 'surname', value: LAST_NAME },
      { slug: 'phone_number', value: PHONE },
    ],
  }),
});

const data = await res.json();
console.log('Status:', res.status);
console.log('Response:', JSON.stringify(data, null, 2));
