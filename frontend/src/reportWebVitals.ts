import { onCLS, onFID, onLCP, onTTFB, onINP } from 'web-vitals';

function sendToAnalytics(metric: any) {
  console.log('[Web Vitals]', metric);
  // Optionally send to an analytics endpoint:
  // fetch('/analytics', { method: 'POST', body: JSON.stringify(metric) });
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
onINP(sendToAnalytics);