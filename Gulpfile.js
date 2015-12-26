var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

gulp.task('default',['clean'], function () {
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));

});
gulp.task('clean', function () {
    gulp.src(['dist'],{read:false})
        .pipe(clean({force: true}));
});
