var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var urlPath = url.parse(req.url).pathname;
  console.log(urlPath);
  if (req.method === 'GET') {
    if (urlPath === '/') {
      fs.readFile('/Users/student/Desktop/hrsf53-web-historian/web/public/index.html', function(err, data) {
        if (err) { throw err; }
        res.end(data);
      });
    } else {
    // archive.isUrlArchived(url.parse(req.url), function(err, data) {
    //   console.log(data);
    // });
      fs.readFile('/Users/student/Desktop/hrsf53-web-historian/test/testdata/sites' + urlPath, function(err, data) {
        if (err) { 
          res.writeHead(404);
          res.end();
        }
        res.end(data);
      });
    }
  }
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {

      body += data.toString();
    });
    req.on('end', function() {
      body = qs.parse(body);
      console.log(body.url);
    });
    fs.writeFile('/Users/student/Desktop/hrsf53-web-historian/test/testdata/sites.txt', body.url, function(err, data) {
      if (err) { throw err; }
      res.writeHead(302);
      res.end();
    });
  }
};
