/*Required*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    plumber = require('gulp-plumber');

/*Scripts Task*/
gulp.task('scripts', function () {
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(plumber())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(reload({
            stream: true
        }));
});

/*HTML Task*/
gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(reload({
            stream: true
        }));
});

/*Browser-Sync Task*/
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});


//gulp.task('build:cleanfolder', function (cb) {
//    del([
//        'build/**'
//    ], cb);
//});
//
//
//gulp.task('build:copy', ['build:cleanfolder'], function () {
//    return gulp.src('app/**/*/')
//        .pipe(gulp.dest('build/'));
//});
//
//gulp.task('build:remove', ['build:copy'], function (cb) {
//    del([
//        'build/scss/',
//        'build/js/!(*.min.js)'
//    ], cb);
//});
//
//
//gulp.task('build', ['build:copy', 'build:remove']);

/*Watch Task*/
gulp.task('watch', function () {
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/**/*.html', ['html']);
});

/*Default Task*/
gulp.task('default', ['scripts', 'browser-sync', 'html', 'watch']);