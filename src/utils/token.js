const LIVEKIT_API_KEY = import.meta.env.VITE_LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = import.meta.env.VITE_LIVEKIT_API_SECRET;

function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function encodeUtf8(str) {
  return new TextEncoder().encode(str);
}

async function sign(header, payload, secret) {
  const data = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const key = await crypto.subtle.importKey(
    'raw',
    encodeUtf8(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encodeUtf8(data));
  const sigBase64 = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
  return `${data}.${sigBase64}`;
}

export async function generateToken(identity, room) {
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: 'HS256', typ: 'JWT' };

  const payload = {
    iss: LIVEKIT_API_KEY,
    sub: identity,
    name: identity,
    iat: now,
    nbf: now,
    exp: now + 6 * 3600, // 6 heures
    jti: `${identity}-${Date.now()}`,
    video: {
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    },
    metadata: JSON.stringify({ role: 'client' }),
  };

  return sign(header, payload, LIVEKIT_API_SECRET);
}
