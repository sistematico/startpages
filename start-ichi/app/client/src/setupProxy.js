const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  
  // Add a CORS proxy for external images
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'https://cors-anywhere.herokuapp.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy/': '',
      },
    })
  );
}; 