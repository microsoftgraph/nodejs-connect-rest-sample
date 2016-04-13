/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  var config = {
    script: './bin/www',
    ext: 'js',
    env: {
      PORT: 3000
    },
    ignore: ['./node_modules/**']
  };
  nodemon(config).on('restart', function () {
    console.log('Restarting');
  });
});
