export const getFortnightId = (fiscalYear, month, fortnight, country, metrocity) => fiscalYear + month.padStart(2, '0') + fortnight + (country || '') + (metrocity || '');

export default {
  getFortnightId,
};
