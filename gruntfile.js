/// <binding />
/// <reference path="test/resources/jquery/jquery.js" />
/*
 * grunt-eo-asset
 * https://github.com/lot224/grunt-eo-asset
 *
 * Copyright (c) 2015 David Gardyasz
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {

  grunt.initConfig({

    eo_asset: {
      options: {
        "bootstrap": {
          requires: ['angular', 'jquery'],
          tasks: {
            "concat": [
              {
                "css": [
                    "test/resources/bootstrap/css/bootstrap.min.css",
                    "test/resources/bootstrap/css/bootstrap-theme.min.css"
                ]
              }
            ],
            "uglify": [
              "test/resources/bootstrap/js/bootstrap.js"
            ],
            "copy": [
              { cwd: "test/resources/bootstrap/fonts", src: "**/*.*", dest: "out/css/fonts" }
            ]
          }
        },
        "angular": {
          requires: ['jquery'],
          tasks: {
            "uglify": ['test/resources/angular/angular.js']
          }
        },
        "ngSanitize": {
          requires: ['angular'],
          tasks: {
            "uglify": ['test/resources/angular/angular-sanitize.js']
          }
        },
        "ngRoute": {
          requires: ['angular', 'berger'],
          tasks: {
            "uglify": ['test/resources/angular/angular-route.js']
          }
        },
        "ngAnimate": {
          requires: ['angular'],
          tasks: {
            "uglify": ['test/resources/angular/angular-animate.js']
          }
        },
        "jquery": {
          requires: [],
          tasks: {
            "uglify": ['test/resources/jquery/jquery.js']
          }
        },
        "myApp": {
          requires: ['angular','bootstrap','jquery','asdf'],
          tasks: {
            "uglify": ['test/myApp.js']
          }
        }
      },
      test: {
        assets: ['angular', 'bootstrap', 'ngRoute', 'ngSanitize', 'ngAnimate', 'myApp'],
        options: {
          "uglify": {
            banner: "(function(window, undefined) {'use strict';\n\n",
            footer: "\n\n})(window);",
            mangle: false,
            beautify: true,
          }
        },
        tasks: {
          "uglify": function (items) {
            return { files: { src: items, dest: 'out/vendors.js' } };
          }
        }
      }
    }


  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['eo_asset:test']);
};