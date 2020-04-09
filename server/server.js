/* eslint-disable no-undef */
'use stirct';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const pg = require('pg');
const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);
const API = require('./apis');

server.use(cors()); 

server.get('/', API.home);

server.get('/location', API.location);

server.get('/weather', API.weather);

server.get('/trails', API.hike);

server.get('/yelp', API.yelp);

server.get('/movies', API.movies);

server.get('*', (req, res) => res.status(404).send('NOT FOUND'));

server.use((err, req, res) => res.status(500).send(err));

client.connect().then(() => {
  server.listen(PORT, () => console.log(`listening on ${PORT}`));
});

module.exports = client;
