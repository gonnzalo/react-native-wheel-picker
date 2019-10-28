import {Dimensions} from 'react-native';

// wheel data
const {width} = Dimensions.get('window');
const minWeigth = 1;
const maxWeigth = 200;
const biglegWidth = 3;
const mediumSmallLegWidth = biglegWidth / 2;
const legSpacing = 7;
const legContainerWidth =
  legSpacing * 10 + biglegWidth + mediumSmallLegWidth * 9;
const spaceStart = Math.round(width / 2);
const spaceEnd = spaceStart - legSpacing;

// make the wheel number data
const makeData = (minValue, maxValue) => {
  let arrayData = [];
  for (let i = minValue; i <= maxValue; i++) {
    arrayData.push(i);
  }
  return arrayData;
};

// change value weigth on scroll
const changeValue = val => {
  return (Math.round(val / (legContainerWidth / 10)) / 10 + minWeigth).toFixed(
    1,
  );
};

// when open modal scroll to current value.
const scrollToCurrentValue = val => {
  return Math.round(
    (legContainerWidth / 10) * (isNaN(val) ? 60 : val) * 10 - minWeigth * 10,
  );
};

const data = makeData(minWeigth, maxWeigth);

export {
  minWeigth,
  maxWeigth,
  biglegWidth,
  mediumSmallLegWidth,
  legSpacing,
  legContainerWidth,
  spaceStart,
  spaceEnd,
  data,
  changeValue,
  scrollToCurrentValue,
};
