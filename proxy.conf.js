const PROXY_CONFIG = {};

PROXY_CONFIG['/api'] = {
    target: 'http://localhost:3000',
    pathRewrite: {
        '^/api': ''
     },
    secure: false,
    changeOrigin: true
};

module.exports = PROXY_CONFIG;
