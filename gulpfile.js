const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', ['scripts'], function(){

});

gulp.task('scripts', function(){
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js.pipe(gulp.dest('dist'))
    ]);
});