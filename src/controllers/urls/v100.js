const UrlModel = require('@models/url');

const create = async (req, res, next) => {
  try {
    const URL = new UrlModel();

    const local = {};
    local.longUrl = req.query.url;
    let item = await URL.getItemByIndex(local.longUrl);
    if (item) {
      res.status(201).json({ url: URL.getFullUrl(item) });
      return;
    }

    item = await URL.createItem(local);
    res.status(201).json({ url: URL.getFullUrl(item) });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const load = async (req, res, next) => {
  try {
    const URL = new UrlModel();
    const item = await URL.getItem(req.params.key);
    if (!item) {
      res.status(404).send({ msgCode: 'NOT_FOUND' });
      return;
    }
    res.redirect(item.longUrl);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create,
  load
};
