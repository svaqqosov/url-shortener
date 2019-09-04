require('module-alias/register');
const app = require('express')();
require('@helper');
app.use(require('@middlewares/headers'));
app.use(require('@routes'));
app.use(require('@middlewares/errorHandler'));

app.use((req, res) => {
  res.status(404).json({ msgCode: 'NOT_FOUND' });
});
module.exports = app;
