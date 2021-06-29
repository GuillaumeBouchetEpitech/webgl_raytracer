const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');

const buildMain = ({ isDebug }) => {

    const stream = browserify({
            basedir: '.',
            debug: (isDebug === true),
            entries: [
                './src/main.ts'
            ],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer());

    if (isDebug === true) {
        // stream.pipe(sourcemaps.init({loadMaps: true}))
        //       .pipe(sourcemaps.write('.'));
    }
    else {
        stream.pipe(uglify());
    }

    stream.pipe(gulp.dest('dist'));

    return stream;
};

gulp.task('default', () => buildMain({ isDebug: false }));
gulp.task('debug', () => buildMain({ isDebug: true }));
