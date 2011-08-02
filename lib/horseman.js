// If you want to add one-time Jasmine configs (like a global beforeEach)
// please add it to jasmineSetup.js, not here.
var fs = require('fs');
var path = require('path');
var jsdom = require("jsdom");

var jqueryPath;

function buildWindow(htmlFile) {
  var content = "<html><head><title>Horseman</title></head><body></body></html>";
  if (htmlFile) {
    content = fs.readFileSync(htmlFile);
  }
  window = jsdom.jsdom(content).createWindow();
  global.window = window;
  global.document = window.document;

  window.location = {};
  window.location.hash = '';
  window.location.pathname = '/';
  window.location.hostname = 'localhost';
  window.location.href = 'myPath/#myHash';
  window.location.search = '';
  window.history = {};
  window.history.pushState = function(a, b, pathAndHash) {
    parts = pathAndHash.split("#");
    pathParts = parts[0].split('?');
    window.location.pathname = pathParts[0];
    window.location.search = "?" + pathParts[1];
    window.location.hash = "#" + parts[1];
    window.location.href = pathAndHash;
  };

  if (jqueryPath) {
    require(jqueryPath);
    if (window.$) { 
      global.$ = window.$; 
      global.jQuery = window.jQuery;
    }
  }
}

buildWindow();

exports.useJQuery = function(path) {
  jqueryPath = path;
};
exports.buildWindow = buildWindow;
