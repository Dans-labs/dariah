import gulp        from 'gulp';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import uglify      from 'gulp-uglify';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
import jsdoc       from 'gulp-jsdoc3';
import globby      from 'globby';
 
/* Config settings */

const app = 'app.js'
const lib = 'lib.js'
const framework = 'framework.js'
const entry = 'src/js/app/main.jsx'
const entryCss = 'src/css/main.scss'

const dest = '../static/js'
const destCss = '../static/css'

const docConfig = './jsdocConfig.json'
const docSrc = [
  '../README.md',
  'src/js/**/*.js',
  'src/js/**/*.jsx',
  '!src/js/modules/**/*.*',
]

const pathJs = './src/js'
const pathLib = './src/js/lib'
const pathApp = './src/js/app'
const pathCss = './src/css'

const pathsLib = [pathLib]
const pathsApp = globby.sync([`${pathApp}/*`, `!${pathApp}/*.jsx`])

const mDependencies = globby.sync('*.js', {cwd: pathLib})
const vDependencies = [
	'react',
  'react-dom',
  'react-markdown',
  'react-router',
  'leaflet',
  'whatwg-fetch'
]

const watchAppPaths = [`${pathApp}/**/*.js`, `${pathApp}/**/*.jsx`]
const watchLibPaths = [`${pathLib}/**/*.js`, `${pathLib}/**/*.jsx`]
const watchCssPaths = [`${pathCss}/*.scss`, `${pathCss}/*.css`]
const watchDocPaths = ['../README.md', `${pathJs}/**/*.js`, `${pathJs}/**/*.jsx`]

/* Doc tasks */

function buildDoc(cb) {
  const config = require(docConfig);
  /* the following line fixes the problem that jsdoc stores the list of input files in the config
   * which will increase after every run somehow. We set it to null everytime.
   */
  if (config.source && config.source.include) { config.source.include = null }
  gulp.src(docSrc, {read: false})
    .pipe(jsdoc(config, cb));
}

/* Common functions */

let buildCount = 0;

function stripDeps(bundle) {
  vDependencies.forEach(dep => {bundle.external(dep)});
  mDependencies.forEach(dep => {bundle.external(dep)});
}

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
    .pipe(gulp.dest(dst))
}

function transformCss({
    src = entryCss,
    outputStyle = 'compressed',
    dst = destCss,
  } = {}) {
  return gulp.src([src])
    .pipe(sass({outputStyle}).on('error', sass.logError))
    .pipe(gulp.dest(dst))
}

function buildCss() {
  return transformCss()
}

/* Development tasks */

function buildjsDevApp() {
  const appBundle = browserify({entries: entry, debug: true, paths: pathsApp});
  stripDeps(appBundle);
  return transform(appBundle, {sourceMaps: true})
}

function buildjsDevLib() {
  return transform(browserify({require: mDependencies, debug: true, paths: pathsLib}), {src: lib})
}
function buildjsDevFramework() {
  return transform(browserify({require: vDependencies, debug: true}), {src: framework, es6: false})
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
  transform(browserify({require: mDependencies, debug: false, paths: pathsLib}), {src: lib, compress: true});
  transform(browserify({require: vDependencies, debug: false}), {src: framework, es6: false, compress: true});
  const appBundle = browserify({entries: entry, debug: false, paths: pathsApp});
  stripDeps(appBundle);
  return transform(appBundle, {src: app, sourceMaps: false, compress: true})
}

/* watching */

function watch() {
  gulp.watch(watchAppPaths, gulp.series(buildjsDevApp));
  gulp.watch(watchLibPaths, gulp.series(buildjsDevLib));
  gulp.watch(watchCssPaths, gulp.series(buildCss));
}
 
function watchDoc() {
  gulp.watch(watchDocPaths, gulp.series(buildDoc))
}
 
gulp.task('doc', gulp.series(buildDoc, watchDoc));
gulp.task('dev', gulp.series(buildjsDev, buildCss, watch));
gulp.task('prod', gulp.series(buildjsProd, buildDoc, buildCss));
