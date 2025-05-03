// frontend/src/reportWebVitals.ts

import { ReportHandler } from 'web-vitals';
import { getCLS } from 'web-vitals/getCLS';
import { getFID } from 'web-vitals/getFID';
import { getFCP } from 'web-vitals/getFCP';
import { getLCP } from 'web-vitals/getLCP';
import { getTTFB } from 'web-vitals/getTTFB';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;