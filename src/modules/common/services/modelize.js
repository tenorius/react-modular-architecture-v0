// import logger from "./logger";

export default (obj, keyEntity, valueEntity) => {
  // { "2018": appointments }
  // { fiscalYears: [{ appointments, id: "2018" }] }
  // logger.info(obj, 'before modelize');
  const key = Object.keys(obj)[0];
  const value = obj[key];
  obj[keyEntity] = [{ [valueEntity]: value, id: key }];
  delete obj[key];
  // logger.info(obj, 'after modelize');
  return obj;
};
