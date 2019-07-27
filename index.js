const express = require('express');

const server = express();

server.use('/', (req, res) => res.send("<h1>API up and running!</h1>"));

server.listen(8000, () => console.log('API running on port 8000'));