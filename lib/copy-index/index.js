/*jshint node:true*/
var fs = require('fs-extra');
var path = require('path');

module.exports = {
  name: 'copy-index',

  isDevelopingAddon: function() {
    return true;
  },

  postBuild: function (result) {
    var input = path.join(result.directory, 'index.html');
    var output = path.join(result.directory, '200.html');

    this.ui.writeLine('Copying: ' + input + ' -> ' + output);

    fs.copySync(input, output);
  }
};
