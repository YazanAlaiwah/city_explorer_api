'use stirct';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const PORT = process.env.PORT || 3000;

server.use(cors());

server.get('/', (req, res) =>
  res.send(
    'HELLO to know the location type /location?city=*-name of the city-* and for weather type / weather in the browser bar THANK YOU'
  )
);

server.get('/location', (req, res) => {
  let serch = req.query.city;
  let data = require('./data/geo.json');
  let resulte = new Location(serch, data);
  res.status(200).send(resulte);
});

server.get('/weather', (req, res) => {
  // let search = req.query.city;
  let data = require('./data/weather.json').data;
  let resulte = [];
  data.forEach((obj) => {
    resulte.push(new Weather(obj));
  });
  res.status(200).send(resulte);
});

function Location(query, data) {
  (this.search_query = query),
    (this.formateed_query = data[0].display_name),
    (this.latitude = data[0].lat),
    (this.longitude = data[0].lon);
}

const mounths = {
  '01': 'January ',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

function Weather(data) {
  /// change the mounth from noumber to the name of it
  let newDate = data.datetime.split('-');
  newDate[1] = mounths[newDate[1]];
  (this.description = data.weather.description),
    (this.time = newDate.join('-'));
}

server.get('*', (req, res) => res.status(404).send('NOT FOUND'));

server.use((err, req, res) => res.status(500).send(err));

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));
