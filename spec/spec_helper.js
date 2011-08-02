var fs = require('fs');
var path = require('path');
var binDir = path.dirname(fs.realpathSync(__filename));
var lib  = path.join(binDir, '../lib');
var vendor  = path.join(binDir, '../vendor');
require.paths.push(lib);
require.paths.push(vendor);

