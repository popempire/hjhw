const USERNAME = "admin";          // change me
const PASSWORD = context.env.SITE_PASSWORD;

export async function onRequest(context) {
  const request = context.request;
  const auth = request.headers.get("Authorization");

  const expected = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

  if (auth === expected) {
    return context.next();
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected Area"' },
  });
}
