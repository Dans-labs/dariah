var gulp = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
 
gulp.task('build', function () {
    return browserify({entries: '../jsrc/main.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('../js'));
});
 
gulp.task('watch', ['build'], function () {
    gulp.watch('../jsrc/*.js', ['build']);
});
 
gulp.task('default', ['build', 'watch']);
