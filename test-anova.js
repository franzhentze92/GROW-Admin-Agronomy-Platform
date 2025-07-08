const { jStat } = require('jstat');

// Helper functions (copied from StatisticsPage.tsx)
const calculateMean = (values) => values.reduce((sum, val) => sum + val, 0) / values.length;
const calculateStdDev = (values) => {
  const mean = calculateMean(values);
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
};
const calculateSE = (values) => calculateStdDev(values) / Math.sqrt(values.length);
const calculateCV = (values) => (calculateStdDev(values) / calculateMean(values)) * 100;
const calculateMin = (values) => Math.min(...values);
const calculateMax = (values) => Math.max(...values);
const calculateRange = (values) => calculateMax(values) - calculateMin(values);

// ANOVA calculation (copied from StatisticsPage.tsx)
const calculateANOVA = (data) => {
  const treatments = Object.keys(data);
  const allValues = treatments.flatMap(t => data[t]);
  const grandMean = calculateMean(allValues);
  // Between-group sum of squares
  const ssBetween = treatments.reduce((sum, treatment) => {
    const treatmentMean = calculateMean(data[treatment]);
    return sum + data[treatment].length * Math.pow(treatmentMean - grandMean, 2);
  }, 0);
  // Within-group sum of squares
  const ssWithin = treatments.reduce((sum, treatment) => {
    const treatmentMean = calculateMean(data[treatment]);
    return sum + data[treatment].reduce((tSum, val) => tSum + Math.pow(val - treatmentMean, 2), 0);
  }, 0);
  const dfBetween = treatments.length - 1;
  const dfWithin = allValues.length - treatments.length;
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  const fValue = msBetween / msWithin;
  const pValue = 1 - jStat.centralF.cdf(fValue, dfBetween, dfWithin);
  return {
    ssBetween,
    ssWithin,
    dfBetween,
    dfWithin,
    msBetween,
    msWithin,
    fValue,
    pValue,
    significant: pValue < 0.05
  };
};

// Test dataset (textbook example)
const testData = {
  A: [4, 5, 6],
  B: [7, 8, 9],
  C: [10, 11, 12]
};

const result = calculateANOVA(testData);
console.log('ANOVA Test Results:');
console.log('F-value:', result.fValue.toFixed(4));
console.log('p-value:', result.pValue.toExponential(4));
console.log('Significant:', result.significant);
console.log('Expected: F ≈ 27, p ≪ 0.05, Significant: true'); 