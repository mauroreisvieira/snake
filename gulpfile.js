const gulp        = require('gulp');
const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('build:scss', function () {
    return gulp.src('./src/scss/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('serve', ['build:scss'], function() {
    browserSync.init({
        server: {
            index: 'index.html'
        }
    });
    gulp.watch('./src/scss/app.scss', ['build:scss']);
});
