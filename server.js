/* eslint-disable no-undef */
'use stirct';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;

server.use(cors());

server.get('/', (req, res) =>
  res.send(
    'HELLO to know the location type /location?city=*-name of the city-* and for weather type / weather in the browser bar THANK YOU'
  )
);

server.get('/location', (req, res) => {
  let search = req.query.city;
  const key = process.env.GEOCODE_API_KEY;
  superagent
    .get(
      `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${search}&format=json`
    )
    .then((data) => res.status(200).send(new Location(search, data.body)));
});

server.get('/weather', (req, res) => {
  let search = req.query.search_query;
  let key = process.env.WEATHER_API_KEY;
  superagent
    .get(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=${key}`
    )
    .then((data) =>
      res.status(200).send(data.body.data.map((obj) => new Weather(obj)))
    );
});

server.get('/trails', (req, res) => {
  let search = req.query.search_query;
  const keyLoction = process.env.GEOCODE_API_KEY;
  const key = process.env.TRAIL_API_KEY;
  //// we will take the lat and lon from the location in locationIQ api the pass it to the Hike api
  superagent
    .get(
      `https://eu1.locationiq.com/v1/search.php?key=${keyLoction}&q=${search}&format=json`
    )
    .then((data) => {
      let location = data.body[0];
      superagent
        .get(
          `https://www.hikingproject.com/data/get-trails?lat=${location.lat}&lon=${location.lon}&maxDistance=10&key=${key}`
        )
        .then((data) =>
          res.status(200).send(data.body.trails.map((obj) => new Hike(obj)))
        );
    });
});

function Hike(object) {
  this.name = object.name;
  this.location = object.location;
  this.length = object.length;
  this.stars = object.stars;
  this.star_votes = object.starVotes;
  this.summary = object.summary;
  this.trial_url = object.url;
  this.conditions = object.conditionDetails;
  this.condition_date = object.conditionDate.split(' ')[0];
  this.condition_time = object.conditionDate.split(' ')[1];
}

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
  (this.forecast = data.weather.description), (this.time = newDate.join('-'));
}

server.get('*', (req, res) => res.status(404).send('NOT FOUND'));

server.use((err, req, res) => res.status(500).send(err));

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));
