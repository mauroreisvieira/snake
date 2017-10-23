const gulp             = require('gulp');
const rollup           = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const buble            = require('rollup-plugin-buble');
const pump             = require('pump');
const uglify           = require('gulp-uglify');
const uglifyjs         = require('uglify-js');
const minifier         = require('gulp-uglify/minifier');
const sass             = require('gulp-sass');
const eslint           = require('gulp-eslint');

gulp.task('production', function (cb) {
    // the same options as described above
    var options = {
        preserveComments: 'license'
    };

    pump([
        gulp.src('public/js/*.js'),
        minifier(options, uglifyjs),
        gulp.dest('public/js')
    ], cb);
});

gulp.task('ts --settings', function () {
    return rollup.rollup({
        entry: "./resources/ts/Setting.ts",
        plugins: [
            rollupTypescript()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "umd",
            moduleName: "library",
            dest: "./public/ts/setting.js",
            sourceMap: true
        });
    });
});

gulp.task('ts --auth', function () {
    return rollup.rollup({
        entry: "./resources/ts/Auth.ts",
        plugins: [
            rollupTypescript()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "umd",
            moduleName: "library",
            dest: "./public/ts/auth.js",
            sourceMap: true
        });
    });
});

gulp.task('ts --game', function () {
    return rollup.rollup({
        entry: "./resources/ts/Game.ts",
        plugins: [
            rollupTypescript()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "umd",
            moduleName: "library",
            dest: "./public/ts/game.js",
            sourceMap: true
        });
    });
});

gulp.task('ts --friend', function () {
    return rollup.rollup({
        entry: "./resources/ts/Friend.ts",
        plugins: [
            rollupTypescript()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "umd",
            moduleName: "library",
            dest: "./public/ts/friend.js",
            sourceMap: true
        });
    });
});

gulp.task('ts --rating', function () {
    return rollup.rollup({
        entry: "./resources/ts/Rating.ts",
        plugins: [
            rollupTypescript()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "umd",
            moduleName: "library",
            dest: "./public/ts/rating.js",
            sourceMap: true
        });
    });
});

gulp.task('js --game', function () {
    return rollup.rollup({
        entry: "./resources/js/Game.js",
        plugins: [
            buble(),
            uglify(),
            eslint()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "cjs",
            moduleName: "main",
            dest: "./public/js/game.js",
            sourceMap: true
        });
    });
});

gulp.task('js --auth', function () {
    return rollup.rollup({
        entry: "./resources/js/Auth.js",
        plugins: [
            buble(),
            uglify(),
            eslint()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "cjs",
            moduleName: "main",
            dest: "./public/js/auth.js",
            sourceMap: true
        });
    });
});

gulp.task('js --setting', function () {
    return rollup.rollup({
        entry: "./resources/js/Setting.js",
        plugins: [
            buble(),
            uglify(),
            eslint()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "cjs",
            moduleName: "main",
            dest: "./public/js/setting.js",
            sourceMap: true
        });
    });
});

gulp.task('js --rating', function () {
    return rollup.rollup({
        entry: "./resources/js/Rating.js",
        plugins: [
            buble(),
            uglify(),
            eslint()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "cjs",
            moduleName: "main",
            dest: "./public/js/rating.js",
            sourceMap: true
        });
    });
});

gulp.task('js --friend', function () {
    return rollup.rollup({
        entry: "./resources/js/Friend.js",
        plugins: [
            buble(),
            uglify(),
            eslint()
        ],
    })
    .then(function (bundle) {
        bundle.write({
            format: "cjs",
            moduleName: "main",
            dest: "./public/js/friend.js",
            sourceMap: true
        });
    });
});

gulp.task('scss', function () {
    return gulp.src('./resources/scss/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function () {
    gulp.watch('./resources/scss/app.scss', ['scss']);
    gulp.watch('./resources/**/*.js',
        [
            'js --game',
            'js --auth',
            'js --setting',
            'js --rating',
            'js --friend'
        ]
    );
    gulp.watch('./resources/**/*.ts',
        [
            'ts --game',
            'ts --auth',
            'ts --settings',
            'ts --rating',
            'ts --friend'
        ]
    );
});

