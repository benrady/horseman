// If you want to add one-time Jasmine configs (like a global beforeEach)
// please add it to jasmineSetup.js, not here.
var fs = require('fs');
var path = require('path');
var jsdom = require("jsdom");

function buildDocument(content) {
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
}

buildDocument("<html><head><title>Horseman</title></head><body></body></html>");

exports.requireJQuery = function (path) {
  require(path);
  if (window.$) { 
    global.$ = window.$; 
    global.jQuery = window.jQuery;
  }
};
exports.buildDocument = buildDocument;
