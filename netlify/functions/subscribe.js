export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ detail: 'Method not allowed.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let email, firstName, lastName, phoneNumber;
  try {
    ({ email, firstName, lastName, phoneNumber } = await req.json());
  } catch {
    return new Response(JSON.stringify({ detail: 'Invalid request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Trim all fields
  email = email?.trim();
  firstName = firstName?.trim();
  lastName = lastName?.trim();
  phoneNumber = phoneNumber?.trim();

  // Validate required fields
  if (!email || !firstName || !lastName || !phoneNumber) {
    return new Response(JSON.stringify({ detail: 'All fields are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ detail: 'Please enter a valid email address.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.SYSTEME_API_KEY;
  if (!apiKey) {
    console.error('SYSTEME_API_KEY is not configured');
    return new Response(JSON.stringify({ detail: 'Server error. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const fields = [
    { slug: 'first_name', value: firstName },
    { slug: 'surname', value: lastName },
    { slug: 'phone_number', value: phoneNumber },
  ];

  let createRes, contact;
  try {
    createRes = await fetch('https://api.systeme.io/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({ email, fields }),
    });
    contact = await createRes.json();
  } catch (err) {
    console.error('Systeme.io request failed:', err);
    return new Response(JSON.stringify({ detail: 'Could not reach our signup service. Please try again later.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('Systeme.io POST status:', createRes.status, JSON.stringify(contact));

  if (createRes.status === 422) {
    const emailViolation = contact?.violations?.find(v => v.propertyPath === 'email');
    if (emailViolation) {
      const isDuplicate = emailViolation.message?.toLowerCase().includes('already');
      return new Response(
        JSON.stringify({
          detail: isDuplicate
            ? 'This email is already registered. Check your inbox for updates from us!'
            : 'Please enter a valid email address.',
        }),
        { status: isDuplicate ? 409 : 422, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify({ detail: 'Please check your details and try again.' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (createRes.status === 429) {
    return new Response(JSON.stringify({ detail: 'Too many requests. Please wait a moment and try again.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!createRes.ok) {
    console.error('Systeme.io unexpected error:', createRes.status, JSON.stringify(contact));
    return new Response(JSON.stringify({ detail: 'Something went wrong. Please try again.' }), {
      status: createRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(contact), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
