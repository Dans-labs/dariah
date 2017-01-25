import gulp        from 'gulp';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import uglify      from 'gulp-uglify';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
import jsdoc       from 'gulp-jsdoc3';
 
/* Doc tasks */

gulp.task('build_doc', function(cb) {
  const config = require('./jsdocConfig.json');
  /* the following line fixes the problem that jsdoc stores the list of input files in the config
   * which will increase after every run somehow. We set it to null everytime.
   */
  if (config.source && config.source.include) { config.source.include = null }
  gulp.src(['../README.md', 'src/js/**/*.js', 'src/js/**/*.jsx', '!src/js/modules/**/*.*'], {read: false})
    .pipe(jsdoc(config, cb));
});

/* Development tasks */

gulp.task('buildjs_dev', function() {
  return browserify({entries: 'src/js/main.jsx', debug: true})
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
    .pipe(sourcemaps.write('../static/js'))
    .pipe(gulp.dest('../static/js'));
});
 
gulp.task('buildcss_dev', function() {
  return gulp.src(['src/css/main.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('../static/css'));
});

/* Production tasks */

gulp.task('buildjs_prod', function() {
  return browserify({entries: 'src/js/main.jsx', debug: false})
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
    .pipe(gulp.dest('../static/js'));
});
 
gulp.task('buildcss_prod', function() {
  return gulp.src(['src/css/main.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('../static/css'));
});

/* watching */

gulp.task('watch', function() {
  gulp.watch(['../README.md', 'src/js/**/*.js', 'src/js/**/*.jsx'], gulp.series('build_doc'));
  gulp.watch(['src/js/**/*.js', 'src/js/**/*.jsx'], gulp.series('buildjs_dev'));
  gulp.watch(['src/css/*.scss', 'src/css/*.css'], gulp.series('buildcss_dev'));
});
 
gulp.task('watch_doc', function() {
  gulp.watch(['../README.md', 'src/js/**/*.js', 'src/js/**/*.jsx'], gulp.series('build_doc'));
});
 
gulp.task('doc', gulp.series('build_doc', 'watch_doc'));
gulp.task('dev', gulp.series('buildjs_dev', 'build_doc', 'buildcss_dev', 'watch'));
gulp.task('prod', gulp.series('buildjs_prod', 'build_doc', 'buildcss_prod'));
