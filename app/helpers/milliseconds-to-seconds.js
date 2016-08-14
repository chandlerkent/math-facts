import Ember from 'ember';

const DEFAULT_NUMBER_OF_DECIMALS = 2;

export function millisecondsToSeconds(params, { decimals = DEFAULT_NUMBER_OF_DECIMALS } = {}) {
  let ms = params[0];

  let seconds = ms / 1000;

  return roundToDecimalPlaces(seconds, decimals);
}

function roundToDecimalPlaces(input, numDecimals) {
  let multiplier = Math.pow(10, numDecimals);

  return parseFloat(Math.round(input * multiplier) / multiplier).toFixed(numDecimals);
}

export default Ember.Helper.helper(millisecondsToSeconds);
