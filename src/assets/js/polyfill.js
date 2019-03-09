import 'core-js/fn/array/find';
import 'core-js/fn/array/includes';
import 'core-js/fn/number/is-nan';

Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

if (!String.prototype.padStart) {
  // eslint-disable-next-line no-extend-native
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));
    if (this.length > targetLength) {
      return String(this);
    }
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(this);

  };
}

if (!String.prototype.includes) {
  // eslint-disable-next-line no-extend-native
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    }
    return this.indexOf(search, start) !== -1;

  };
}

if (Number.parseFloat === undefined) {
  // eslint-disable-next-line no-extend-native
  Number.parseFloat = parseFloat;
}
