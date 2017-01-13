var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    callback(err, data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    data = data.toString().split('\n');
    var check = false;
    if (data.indexOf(url) !== -1) {
      check = true;
    }
    callback(err, check);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url, function(err) {
    if (err) {
      throw err;
    }
    callback();
  });

};

exports.isUrlArchived = function(url, callback) {
    
  fs.readFile(exports.paths.archivedSites + '/' + url, function(err, data) {
    var check = false;
    if (err) {
      callback(null, check);
    } else {
      check = true;
      callback(err, check);
    }
  });
};

exports.createArchive = function(url) {
  fs.writeFile(exports.paths.archivedSites + '/' + url, '', function(err) {
    if (err) { console.log(err); }
  });
};

exports.downloadUrls = function(array) {

  array.forEach(function(site) {


    // request('http://google.com/doodle.png').pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + site));
    request('http://' + site, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fs.writeFile(exports.paths.archivedSites + '/' + site, body, function(err) {
        if (err) { throw err; }
      });
      console.log(body);
    } 
    });
    // });
      // var rawData = '';
      // res.on('data', function (chunk) { 
      //   rawData += chunk;
      //   console.log(rawData); 
      // });
      // fs.writeFile(exports.paths.archivedSites + '/' + site, rawData, function(err) {
      //   if (err) { console.log(err); }
      // });
  });  // }

};
