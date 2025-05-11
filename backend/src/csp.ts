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
    const body = (await response.text()).replace('abcd1234-efgh-5678-ijkl-9012mnop3456', nonce);
    return new Response(body, {
      headers: newHeaders,
      status: response.status,
    });
  },
};