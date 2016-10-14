import gulp        from 'gulp';
import browserify  from 'browserify';
import source      from 'vinyl-source-stream';
import gutil       from 'gulp-util';
import babelify    from 'babelify';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
import uglify      from 'gulp-uglify';
 
gulp.task('js_dev', () => bundleApp(false));
gulp.task('js_prod', () => bundleApp(true));
 
gulp.task('css', () => gulp.src(['../cssrc/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest('../css'))
);

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'src/**/*.jsx'], gulp.series('js_dev'));
  gulp.watch(['../cssrc/*.scss', '../cssrc/*.css'], gulp.series('css'));
});
 
gulp.task('dev', gulp.series(['js_dev','css', 'watch']));
gulp.task('prod', gulp.series(['js_prod']));
 
function bundleApp(isProduction) {
	const appBundler = browserify({
    entries: 'src/main.jsx',
    debug: !isProduction,
  })
  .transform("babelify", {
    presets: [
      "latest",
      "react",
    ],
    plugins: [
        "transform-object-rest-spread",
    ],
  })
  .bundle();
  const bundle = isProduction ? appBundler.pipe(uglify()) : appBundler;
  return bundle
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('../js/'));
}
