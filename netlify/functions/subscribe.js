export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let email, firstName, lastName, phoneNumber;
  try {
    ({ email, firstName, lastName, phoneNumber } = await req.json());
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.SYSTEME_API_KEY;

  const fields = [];
  if (firstName) fields.push({ slug: 'first_name', value: firstName });
  if (lastName) fields.push({ slug: 'surname', value: lastName });
  if (phoneNumber) fields.push({ slug: 'phone_number', value: phoneNumber });

  const createRes = await fetch('https://api.systeme.io/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ email, fields }),
  });

  const contact = await createRes.json();
  console.log('POST status:', createRes.status, JSON.stringify(contact));

  return new Response(JSON.stringify(contact), {
    status: createRes.ok ? 200 : createRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
