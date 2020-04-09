/* eslint-disable no-undef */
const superagent = require('superagent');
const Constructor = require('./Cobject');
const DB = require('./DB');
let API = {};
// var x = [];
API.home = function (req, res) {
  res.send(x);
};

API.location = function (req, res) {
  const key = process.env.GEOCODE_API_KEY;
  let search = req.query.city;

  DB.getLocation(search)
    .then((resulte) => {
      if (resulte.rows.length) return res.status(200).send(resulte.rows[0]);

      return superagent
        .get(
          `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${search}&format=json`
        )
        .then((data) => {
          let locationObj = new Constructor.Location(search, data.body);
          DB.addLocation(locationObj).then((a) =>
            res.status(200).send(locationObj)
          );
        });
    })
    .catch((err) => console.log(err));
};

API.weather = function (req, res) {
  let x = [];
  x.push('jdslkfjdks');
  res.send(x);
  // let search = req.query.search_query;
  // let key = process.env.WEATHER_API_KEY;
  // superagent
  //   .get(
  //     `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=${key}`
  //   )
  //   .then((data) => {
  //     if (Object.keys(data.body).length) {
  //       res
  //         .status(200)
  //         .send(data.body.data.map((obj) => new Constructor.Weather(obj)));
  //     }
  //   });
};

API.hike = function (req, res) {
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
          `https://www.hikingproject.com/data/get-trails?lat=${location.lat}&lon=${location.lon}&maxDistance=200&key=${key}`
        )
        .then((data) => {
          res
            .status(200)
            .send(
              data.body.trails
                .map((obj) => new Constructor.Hike(obj))
                .slice(0, 10)
            );
        });
    });
};

API.yelp = function (req, res) {
  let location = req.query.search_query;
  superagent
    .get(`https://api.yelp.com/v3/businesses/search?location=${location}`)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then((data) => {
      let reuslte = data.body.businesses.map(
        (obj) => new Constructor.YelpData(obj)
      );

      res.status(200).send(reuslte);
    })
    .catch((err) => console.log(err));
};

API.movies = function (req, res) {
  let location = req.query.search_query;
  let key = process.env.MOVIE_API_KEY;
  superagent
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${location}`
    )
    .then((data) => {
      let resulte = data.body.results.map(
        (obj) => new Constructor.MovieData(obj)
      );
      res.status(200).send(resulte);
    });
};

module.exports = API;
