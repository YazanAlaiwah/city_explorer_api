let constructor = {};
constructor.MovieData = function (value) {
  this.title = value.title;
  this.overview = value.overview;
  this.average_votes = value.vote_average;
  this.total_votes = value.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500/${value.poster_path}`;
  this.popuarity = value.popularity;
  this.released_on = value.release_date;
};
constructor.YelpData = function (value) {
  this.name = value.name;
  this.image_url = value.image_url;
  this.price = value.price;
  this.rating = value.rating;
  this.url = value.url;
};
constructor.Hike = function (object) {
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
};

constructor.Location = function (query, data) {
  (this.search_query = query),
  (this.formateed_query = data[0].display_name),
  (this.latitude = data[0].lat),
  (this.longitude = data[0].lon);
};

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

constructor.Weather = function (data) {
  /// change the mounth from noumber to the name of it
  let newDate = data.datetime.split('-');
  newDate[1] = mounths[newDate[1]];
  (this.forecast = data.weather.description), (this.time = newDate.join('-'));
};

module.exports = constructor;
