const API_KEY = process.env.SYSTEME_API_KEY;
const EMAIL = 'wunwaka@gmail.com';
const FIRST_NAME = 'Test';
const LAST_NAME = 'User';
const PHONE = '+44 7700 000000';

if (!API_KEY) {
  console.error('Missing SYSTEME_API_KEY — create a .env file at the project root with SYSTEME_API_KEY=your_key');
  process.exit(1);
}

// Step 1: Create contact
console.log('--- POST /contacts ---');
const createRes = await fetch('https://api.systeme.io/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
  body: JSON.stringify({ email: EMAIL }),
});
const contact = await createRes.json();
console.log('Status:', createRes.status);
console.log('Response:', JSON.stringify(contact, null, 2));

if (!createRes.ok) process.exit(1);

// Step 2: Patch fields
console.log('\n--- PATCH /contacts/' + contact.id + ' ---');
const patchRes = await fetch(`https://api.systeme.io/api/contacts/${contact.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/merge-patch+json',
    'X-API-Key': API_KEY,
  },
  body: JSON.stringify({
    fields: [
      { slug: 'first_name', value: FIRST_NAME },
      { slug: 'surname', value: LAST_NAME },
      { slug: 'phone_number', value: PHONE },
    ],
  }),
});
const patchData = await patchRes.json();
console.log('Status:', patchRes.status);
console.log('Response:', JSON.stringify(patchData, null, 2));
