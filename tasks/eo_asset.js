/*
 * grunt-eo-asset
 * https://github.com/lot224/grunt-eo-asset
 *
 * Copyright (c) 2015 David Gardyasz
 * Licensed under the MIT license.
 */

'use strict';



module.exports = function (grunt) {

   

  var tree = {};
  var loopChain = [];

  var processTask = function (cmd) {

    var options = cmd.options() || {};

    var getDependendcies = function (parent) {

      if (loopChain.indexOf(parent) > -1) return;
      loopChain.push(parent);

      tree[parent] = tree[parent] || 0;

      var resource = options[parent] || {};
      var requires = resource.requires || [];

      for (var i = 0; i < requires.length; i++) {
        var dependent = requires[i];

        if (parent === dependent) {
          console.log('a parent can not be a dependent of it\'s self. (' + parent + ')');
          break;
        }

        tree[dependent] = tree[dependent] || 0;

        if (tree[parent] <= tree[dependent])
          tree[parent] = tree[dependent] + 1;

        getDependendcies(dependent);
      }
    }

 
    var data = cmd.data || {};
    var assets = data.assets || [];

    for (var i = 0; i < assets.length; i++) {
      var asset = assets[i];
      loopChain = [];
      getDependendcies(asset);
    }

    var arrayObject = Object.keys(tree).sort(function (a, b) {
      return tree[a] - tree[b];
    });

    for (i = 0; i < arrayObject.length; i++) {
      var item = arrayObject[i];
      var obj = options[item] || {};
      console.log(item, obj.tasks || null);
    }

    var nResult = [];
    for (var n in tree) {
      nResult.push([n, tree[n]]);
    }

    nResult.sort(function (a, b) {
      return a[1] - b[1];
    });

    tree = {};
    for (var x = 0; x < nResult.length; x++) {
      tree[nResult[x][0]] = nResult[x][1];
    }

   //console.log(tree);
    
  }

  grunt.registerMultiTask('eo_asset', 'Grunt task to define asset packages and requirements.', function () {
    //process.stdout.write('\x1Bc');
    //process.stdout.write('\033[2J');
    //process.stdout.write('\033c');
    //process.stdout.write('\u001b[2J\u001b[0;0H');
    //process.stdout.write('\u001B[2J\u001B[0;0f');
    //process.stdout.write('\033[2J\033[;H');
    //console.log(process.stdout);
    
    
    processTask(this);
  });
};
