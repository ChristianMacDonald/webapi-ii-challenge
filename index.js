const express = require('express');

const postRoutes = require('./posts/postRoutes');

const server = express();

server.use(express.json());

server.use('/', (req, res) => res.send("<h1>API up and running!</h1>"));
server.use('/api/posts', postRoutes);

server.listen(8000, () => console.log('API running on port 8000'));