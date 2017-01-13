var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var htmlfetcher = require('../workers/htmlfetcher.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var urlPath = url.parse(req.url).pathname;
  if (req.method === 'GET') {
    if (urlPath === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
        if (err) { throw err; }
        res.end(data);
      });
    } else {
      fs.readFile(archive.paths.archivedSites + '/' + urlPath, function(err, data) {
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
      body += data;
    });
    req.on('end', function() {
      body = qs.parse(body);
      archive.createArchive(body.url);
      htmlfetcher.fetch();
      fs.writeFile(archive.paths.list, body.url + '\n', function(err) {
        if (err) { throw err; }
        res.writeHead(302);
        var currentUrl = body.url;
        // console.log(fs.readFileSync(archive.paths.archivedSites + '/' + body.url));
        var data = fs.readFileSync(archive.paths.archivedSites + '/' + currentUrl);
        res.end(data);
      });
    });
    fs.readFile(archive.paths.list, function(error, data) {
      if (error) { throw error; }
    });
  }
};
