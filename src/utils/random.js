// eslint-disable-next-line
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
module.exports = { rand };
