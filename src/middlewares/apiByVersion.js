module.exports = (ctrl, action) => (req, res, next) => {
  let apiVer = 'stable';
  if (req.query.version !== undefined) {
    apiVer = `v${req.query.version}`;
  }
  if (Object.keys(ctrl).indexOf(apiVer) < 0) {
    apiVer = 'stable';
  }
  return ctrl[apiVer][action](req, res, next);
};

