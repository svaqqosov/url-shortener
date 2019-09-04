global.basePath = __dirname;
require('dotenv').config();
const app = require('./src/app');

// let's set the port on which the server will run
const port = process.env.PORT || 3000;
// start the server
app.listen(
  port,
  () => {
    console.log(`Server Running at http://127.0.0.1:${port}`);
  }
);
module.exports = app;
