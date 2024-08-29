const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Health check route
app.get('/health', (req, res) => {
    res.send('Proxy health is fine');
});

// Proxy configuration
const proxyOptions = {
    target: 'https://www.swiggy.com', // Target server
    changeOrigin: true, // Needed for virtual hosted sites
    onProxyReq: (proxyReq, req, res) => {
        // Optionally modify the request before sending it to the target
        // e.g., add headers, modify body, etc.
    },
    onProxyRes: (proxyRes, req, res) => {
        // Optionally modify the response before sending it to the client
    }
};

// Use the proxy middleware
app.use('/api', createProxyMiddleware(proxyOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port:${PORT}`);
});

