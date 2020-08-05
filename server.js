const proxy = require('express-http-proxy');
const app = require('express')();
const port = 5050;

const { target, cookie } = require('./config.json');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', proxy(target, {
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    proxyReqOpts.headers['cookie'] = cookie;
    return proxyReqOpts;
  },
}));

app.listen(port, () => {
  console.log(`proxy app listening at http://localhost:${port}`)
});