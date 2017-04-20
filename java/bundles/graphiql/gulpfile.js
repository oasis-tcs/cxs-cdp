var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var javascriptPath = './src/main/webapp/javascript';
var jsFileDestination = './src/main/webapp/javascript/builds';

gulp.task('compile-all', function () {
    _compileLibs();
});

gulp.task('compile-libs', _compileLibs);

function _compileLibs() {
    gulp.src([
        // Generic libs
        './node_modules/graphiql/graphiql.js',
    ])
        .pipe(concat('graphiQLBundle.js'))
        .pipe(gulp.dest(jsFileDestination));

    gulp.src([
        // Generic libs
        './node_modules/graphiql/graphiql.css',
    ])
        .pipe(concat('graphiQLBundle.css'))
        .pipe(gulp.dest(jsFileDestination));

}
