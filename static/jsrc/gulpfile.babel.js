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
  return browserify({entries: 'src/main.jsx', debug: true})
      .transform("babelify", {
        sourceMaps: true,
        presets: [
          "latest",
          "react",
        ],
        plugins: [
            "transform-object-rest-spread",
            "transform-react-jsx-source",
        ],
      })
      .bundle()
      .on('error', function(e) {
        console.log(e.toString());
        this.emit('end');
      })
      .pipe(source('bundle.js'))
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
  return browserify({entries: 'src/main.jsx', debug: false})
      .transform("babelify", {
        sourceMaps: false,
        presets: [
          "latest",
          "react",
        ],
        plugins: [
            "transform-object-rest-spread",
            "transform-remove-console",
        ],
      })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('../js'));
});
 
gulp.task('buildcss_prod', function() {
  return gulp.src(['../cssrc/main.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('../css'));
});

/* watching */

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'src/**/*.jsx'], gulp.series('buildjs_dev'));
  gulp.watch(['../cssrc/*.scss', '../cssrc/*.css'], gulp.series('buildcss_dev'));
});
 
gulp.task('dev', gulp.series('buildjs_dev', 'buildcss_dev', 'watch'));
gulp.task('prod', gulp.series('buildjs_prod', 'buildcss_prod'));
