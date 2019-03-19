const express = require('express');
const postsRoutes = require('./routes')

const server = express();

server.use('/api/posts', postsRoutes)

module.exports = server;
