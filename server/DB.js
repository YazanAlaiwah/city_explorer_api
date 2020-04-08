const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
let DB = {};

DB.getLocation = function (location) {
  let sql = 'SELECT * FROM location WHERE search_query LIKE $1';
  return client.query(sql, [location]);
};

DB.addLocation = function (locationObj) {
  let sql =
    'INSERT INTO location (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4)';
  let safeValues = [
    locationObj.search_query,
    locationObj.formateed_query,
    locationObj.latitude,
    locationObj.longitude,
  ];
  return client.query(sql, safeValues);
};

client.connect();
module.exports = DB;
