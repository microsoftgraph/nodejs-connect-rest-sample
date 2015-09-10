var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    var config = {
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8080
        },
        ignore: ['./node_modules/**']
    };
    nodemon(config).on('restart', function() {
        console.log('Restarting');
    });
});
