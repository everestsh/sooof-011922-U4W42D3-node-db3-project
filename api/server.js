const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.get('/hello', (req, res) => {
    res.status(200).json('hello world!!!!!!')
  })

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

server.use('*', (req, res)=>{
    res.status(404).json({
        message: "not found",
    })
})
module.exports = server;