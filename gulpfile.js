var gulp = require('gulp');
const pkg = require("./package.json");
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
const header = require("gulp-header");
const size = require("gulp-size");
const concat = require("gulp-concat");

const comment = `/**
 * Turtle v${pkg.version}
 * Copyright 2018 XED Technologies & Palash Bauri
 * Released under the MIT License
 */\r\n`;

gulp.task('build', function () {
    return gulp.src('src/turtle.sass')
        .pipe(sass())
        .pipe(header(comment + "\r\n"))
        .pipe(gulp.dest('./dist/'))
});

gulp.task("minify", function() {
    return gulp.src(["./dist/turtle.css"])
      .pipe(cleanCSS())
      .pipe(header(comment))
      .pipe(size())
      .pipe(size({
        gzip: true
      }))
      .pipe(concat("turtle.min.css"))
      .pipe(gulp.dest("./dist/"));
  });

// gulp.task('watch', function (){
//     gulp.watch('src/*.scss', ['sass'], ['minify-css']);
// });

gulp.task("watch", function() {
    gulp.watch(["src/*.sass"], ["default"]);
  });
  
  
gulp.task("default", gulp.parallel(gulp.series("build" , "minify")));