const validate = require('express-validation');
const validations = require('./validation/urls');
const apiByVersion = require('../middlewares/apiByVersion');
const ctrl = require('../controllers/urls');
const express = require('express');

const router = express.Router();

router.route('/').post(validate(validations.create), apiByVersion(ctrl, 'create'));

router.route('/').get(apiByVersion(ctrl, 'list'));

router.route('/:id').get(validate(validations.getAndDelete), apiByVersion(ctrl, 'load'));

module.exports = router;
