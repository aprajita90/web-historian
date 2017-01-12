var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fs.readFile('/Users/student/Desktop/hrsf53-web-historian/web/public/index.html', function(err, data) {
    if (err) { throw err; }
    res.end(data);
  });
};
