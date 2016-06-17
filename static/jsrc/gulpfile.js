var gulp = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
 
gulp.task('buildjs', function () {
    return browserify({entries: 'main.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
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
