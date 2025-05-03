import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
  getINP,
} from 'web-vitals';

export default function reportWebVitals(onReport?: (metric: any) => void) {
  const handler = onReport || console.log;

  getCLS(handler);
  getFID(handler);
  getFCP(handler);
  getLCP(handler);
  getTTFB(handler);
  getINP(handler);
}