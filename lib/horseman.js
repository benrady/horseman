var fs = require('fs');
var path = require('path');
var jsdom = require("jsdom");

var autoReloadPaths = [];

function reload(path) {
  keysToDelete = Object.keys(require.cache).filter(function(key) {
    return key.indexOf(path) > 0;
  });
  keysToDelete.forEach(function(key) {
    delete require.cache[key];
  });
  require(path);
}

function buildWindow(htmlFile) {
  var content = "<html><head><title>Horseman</title></head><body></body></html>";
  if (htmlFile) {
    content = fs.readFileSync(htmlFile);
  }
  delete global.window;
  delete global.document;
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
    window.location.hash = "#" + parts[2];
    window.location.href = pathAndHash;
  };

  autoReloadPaths.forEach(function(item) {
    if (item.apply) {
      item();
    } else {
      reload(item);
    }
  });
}

buildWindow();

exports.autoReload = function() {
  autoReloadPaths = Array.prototype.slice.call(arguments, 0);
};
exports.buildWindow = buildWindow;
