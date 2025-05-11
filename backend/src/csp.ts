// backend/src/csp.ts
export default {
  async fetch(request: Request): Promise<Response> {
    const nonce = crypto.randomUUID();
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set(
      'Content-Security-Policy',
      `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com`
    );
    const body = (await response.text()).replace('__CSP_NONCE__', nonce);
    return new Response(body, {
      headers: newHeaders,
      status: response.status,
    });
  },
};