/**
 * @Author lester
 * @Date 2020-07-17
 */

const { createProxyMiddleware  } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    '/memberCard',
    createProxyMiddleware({
      target: "http://wxtv-ws-t.api.leiniao.com/",
      changeOrigin: true
    })
  );
  app.use(
    '/distributor/api',
    createProxyMiddleware({
      target: "http://wxtv-ws-t.api.leiniao.com/",
      changeOrigin: true
    })
  );
};
