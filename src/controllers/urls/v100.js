const UrlModel = require('@models/url');

const create = async (req, res, next) => {
  try {
    const local = {};
    local.url = req.query.url;
    console.log(local);

    const URL = new UrlModel();
    const item = await URL.createItem(local);
    res.status(201).json({ item });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const load = async (req, res, next) => {
  try {
    const item = await URL.getItem(req.query.url).exec();
    if (item) {
      res.status(404).send({ msgCode: 'NOT_FOUND' });
      return;
    }
    res.redirect(item.url);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  create,
  load
};
