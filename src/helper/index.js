/* global log:true */
log = (txt) => {
  console.log(txt);
};

/* global isLocal:true */
isLocal = () => (['local', 'test'].indexOf(process.env.NODE_ENV) >= 0);

/* global isTest:true */
isTest = () => (process.env.NODE_ENV === 'test');

module.exports = {
  log,
  isLocal,
  isTest
};
