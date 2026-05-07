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

  // Step 1: create (or upsert) the contact
  const createRes = await fetch('https://api.systeme.io/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
    body: JSON.stringify({ email }),
  });

  const contact = await createRes.json();
  console.log('POST status:', createRes.status, JSON.stringify(contact));

  if (!createRes.ok) {
    return new Response(JSON.stringify(contact), {
      status: createRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Step 2: patch name + phone onto the contact we just got back
  const fields = [];
  if (phoneNumber) fields.push({ slug: 'phone_number', value: phoneNumber });

  const patchBody = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(fields.length && { fields }),
  };

  if (Object.keys(patchBody).length === 0) {
    return new Response(JSON.stringify(contact), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const patchRes = await fetch(`https://api.systeme.io/api/contacts/${contact.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/merge-patch+json',
      'X-API-Key': apiKey,
    },
    body: JSON.stringify(patchBody),
  });

  const patchData = await patchRes.json();
  console.log('PATCH status:', patchRes.status, JSON.stringify(patchData));

  return new Response(JSON.stringify(patchData), {
    status: patchRes.ok ? 200 : patchRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
