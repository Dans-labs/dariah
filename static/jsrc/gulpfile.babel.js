import gulp        from 'gulp';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import uglify      from 'gulp-uglify';
import sass        from 'gulp-sass';
import sourcemaps  from 'gulp-sourcemaps';
 
gulp.task('buildjs', function() {
    return browserify({entries: 'main.js', debug: true})
        .transform("babelify", {sourceMaps: true, presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest('../js'));
});
 
gulp.task('buildcss', function() {
  return gulp.src(['../cssrc/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest('../css'));
});

gulp.task('watch', function() {
    gulp.watch(['*.js', '*.jsx'], gulp.series('buildjs'));
    gulp.watch(['../cssrc/*.scss', '../cssrc/*.css'], gulp.series('buildcss'));
});
 
gulp.task('default', gulp.series('buildjs', 'buildcss', 'watch'));
