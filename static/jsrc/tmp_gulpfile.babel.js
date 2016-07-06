'use strict';

var gulp        = require('gulp');
var babelreg    = require('babel-register');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
/*
import gulp        from 'gulp';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import uglify      from 'gulp-uglify';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
*/
 
gulp.task('buildjs', function () {
    return browserify({entries: 'main.js', debug: false})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
//        .pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('../js'))
});
 
gulp.task('buildcss', function () {
  return gulp.src('../cssrc/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('../css'));
});

gulp.task('watch', ['buildjs', 'buildcss'], function () {
    gulp.watch('*.js', ['buildjs']);
    gulp.watch('../cssrc/*.scss', ['buildcss']);
});
 
gulp.task('default', ['buildjs', 'buildcss', 'watch']);
