import gulp        from 'gulp';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import uglify      from 'gulp-uglify';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
 
/* Development tasks */

gulp.task('buildjs_dev', function() {
    return browserify({entries: 'main.js', debug: true})
        .transform("babelify", {
          sourceMaps: true,
          presets: [
            "es2015",
            "es2016",
            "es2017",
            "react",
          ],
          plugins: [
              "transform-object-rest-spread",
          ],
        })
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest('../js'));
});
 
gulp.task('buildcss_dev', function() {
  return gulp.src(['../cssrc/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest('../css'));
});

/* Production tasks */

gulp.task('buildjs_prod', function() {
    return browserify({entries: 'main.js', debug: true})
        .transform("babelify", {
          sourceMaps: true,
          presets: [
            "es2015",
            "es2016",
            "es2017",
            "react",
          ],
          plugins: [
              "transform-object-rest-spread",
              "transform-remove-console",
          ],
        })
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest('../js'));
});
 
gulp.task('buildcss_prod', function() {
  return gulp.src(['../cssrc/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest('../css'));
});

/* watching */

gulp.task('watch_dev', function() {
    gulp.watch(['*.js', '*.jsx'], gulp.series('buildjs_dev'));
    gulp.watch(['../cssrc/*.scss', '../cssrc/*.css'], gulp.series('buildcss_dev'));
});
 
gulp.task('watch_prod', function() {
    gulp.watch(['*.js', '*.jsx'], gulp.series('buildjs_prod'));
    gulp.watch(['../cssrc/*.scss', '../cssrc/*.css'], gulp.series('buildcss_prod'));
});
 
gulp.task('dev', gulp.series('buildjs_dev', 'buildcss_dev', 'watch_dev'));
gulp.task('prod', gulp.series('buildjs_prod', 'buildcss_prod', 'watch_prod'));
