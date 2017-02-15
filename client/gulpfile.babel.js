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

const docConfig = './jsdocConfig.json';
const docSrc = [
  '../README.md',
  'src/js/**/*.js',
  'src/js/**/*.jsx',
  '!src/js/modules/**/*.*',
];

function buildDoc(cb) {
  const config = require(docConfig);
  /* the following line fixes the problem that jsdoc stores the list of input files in the config
   * which will increase after every run somehow. We set it to null everytime.
   */
  if (config.source && config.source.include) { config.source.include = null }
  gulp.src(docSrc, {read: false})
    .pipe(jsdoc(config, cb));
}

/* Build config settings */

const vDependencies = [
	'react',
  'react-dom',
  'react-markdown',
  'react-router',
  'leaflet',
  'whatwg-fetch'
];

const paths = ['./src/js/lib'];
const pathsApp = [
  './src/js/app/pure',
  './src/js/app/object',
  './src/js/app/state',
];
const mDependencies = [
  'data.js',
  'filtering.js',
  'hoc.js',
  'localstorage.js',
  'store.js',
  'ui.js',
  'europe.geo.js',
];

const app = 'app.js';
const lib = 'lib.js';
const framework = 'framework.js';
const entry = 'src/js/app/main.jsx';
const entryCss = 'src/css/main.scss';

const dest = '../static/js';
const destCss = '../static/css';

/* Common functions */

let buildCount = 0;

function transform(bundle, {
    src = app, 
    es6 = true,
    sourceMaps = false,
    compress = false,
    dst = dest,
  } = {}) {
  if (es6) {
    bundle = bundle
      .transform("babelify", {
        sourceMaps: sourceMaps,
        presets: [
          "latest",
          "react",
        ],
        plugins: [
            "transform-object-rest-spread",
            "transform-react-jsx-source",
        ],
      })
  }
  bundle = bundle
    .bundle()
    .pipe(source(src));
  if (compress) {
    bundle = bundle
    .pipe(buffer())
    .pipe(uglify())
  }
  if (sourceMaps) {
    bundle = bundle
    .pipe(sourcemaps.write(dst))
  }
  return bundle
    .pipe(gulp.dest(dst));
}

function transformCss({
    src = entryCss,
    outputStyle = 'compressed',
    dst = destCss,
  } = {}) {
  return gulp.src([src])
    .pipe(sass({outputStyle}).on('error', sass.logError))
    .pipe(gulp.dest(dst));
}

function buildCss() {
  return transformCss()
}

/* Development tasks */

function buildjsDevApp() {
  const appBundle = browserify({entries: entry, debug: true, paths: pathsApp});
  vDependencies.forEach(function(dep) {appBundle.external(dep)});
  mDependencies.forEach(function(dep) {appBundle.external(dep)});
  return transform(appBundle, {sourceMaps: true})
}

function buildjsDevLib() {
  return transform(browserify({require: mDependencies, debug: true, paths: paths}), {src: lib});
}
function buildjsDevFramework() {
  return transform(browserify({require: vDependencies, debug: true}), {src: framework, es6: false});
}
 
function buildjsDev() {
  buildCount++;
  if (buildCount == 1) {
    buildjsDevLib();
    buildjsDevFramework();
  }
  return buildjsDevApp()
}
 
/* Production tasks */

function buildjsProd() {
  transform(browserify({require: mDependencies, debug: false, paths: paths}), {src: lib, compress: true});
  transform(browserify({require: vDependencies, debug: false}), {src: framework, es6: false, compress: true});
  const appBundle = browserify({entries: entry, debug: false, paths: pathsApp});
  vDependencies.forEach(function(dep) {appBundle.external(dep)});
  mDependencies.forEach(function(dep) {appBundle.external(dep)});
  return transform(appBundle, {src: app, sourceMaps: false, compress: true})
}

/* watching */

function watch() {
  //gulp.watch(['src/js/**/*.js', 'src/js/**/*.jsx'], gulp.series(buildjsDev));
  gulp.watch(['src/js/app/**/*.js', 'src/js/app/**/*.jsx'], gulp.series(buildjsDevApp));
  gulp.watch(['src/js/lib/**/*.js', 'src/js/lib/**/*.jsx'], gulp.series(buildjsDevLib));
  gulp.watch(['src/css/*.scss', 'src/css/*.css'], gulp.series(buildCss));
}
 
function watchDoc() {
  gulp.watch(['../README.md', 'src/js/**/*.js', 'src/js/**/*.jsx'], gulp.series(buildDoc));
}
 
gulp.task('doc', gulp.series(buildDoc, watchDoc));
gulp.task('dev', gulp.series(buildjsDev, buildCss, watch));
gulp.task('prod', gulp.series(buildjsProd, buildDoc, buildCss));
