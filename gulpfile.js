const gulp             = require('gulp');
const sass             = require('gulp-sass');

gulp.task('scss', function () {
    return gulp.src('./src/scss/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/app.scss', ['scss']);
});

