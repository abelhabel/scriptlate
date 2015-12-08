var scriptlate = require('scriptlate');

var searchResults = require('templates/search-results');
var hitContainer = require('templates/hit-container');
var hit = require('templates/hit');
var hitContainer = require('templates/hit-container');

var data = {
  id: 34,
  title: "Sammy's Shop",
  image: "http://globe-views.com/dcim/dreams/ball/ball-05.jpg",
  phone: '289-323-2323',
  description: 'A small little shop on the outskirts of Balmora'
};

var helpers = {
  getTime: function() {
    return Date.now();
  }
};
scriptlate.registerHelpers(helpers);
data.hit = hit(data, helpers).tags;
scriptlate(hitContainer, data);
