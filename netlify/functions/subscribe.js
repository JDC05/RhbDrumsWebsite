export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let email, firstName, feedback;
  try {
    ({ email, firstName, feedback } = await req.json());
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

  const body = { email };
  if (firstName) body.firstName = firstName;
  if (feedback) body.fields = [{ slug: 'feedback', value: feedback }];

  const res = await fetch('https://api.systeme.io/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.SYSTEME_API_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log('Systeme.io status:', res.status);
  console.log('Systeme.io response:', JSON.stringify(data));

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
};

