const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");
const sass = require("gulp-sass")(require("sass"));
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const del = require("del");

const routes = {
  html: {
    src: "src/**/*.html",
    dest: "./",
  },
  scss: {
    src: "src/static/scss/styles.scss",
    dest: "static",
  },
  image: {
    src: "src/static/images/*",
    dest: "static/assets",
  },
  videos: {
    src: "src/static/videos/*.mp4",
    dest: "static/assets",
  },
};

function MinifyHTML() {
  return gulp
    .src(routes.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(routes.html.dest))
    .pipe(browserSync.stream());
}

function SCSStoCSS() {
  return gulp
    .src(routes.scss.src, { allowEmpty: true })
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(csso({ sourceMap: true, debug: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(routes.scss.dest))
    .pipe(browserSync.stream());
}

function ImageMinify() {
  return gulp
    .src(routes.image.src)
    .pipe(imagemin())
    .pipe(gulp.dest(routes.image.dest));
}

function VideoCopy() {
  return gulp.src(routes.videos.src).pipe(gulp.dest(routes.videos.dest));
}

// Utility functions
async function Clean() {
  return del(["templates/", "static/"]);
}

async function Watch() {
  browserSync.init({
    proxy: {
      target: "http://127.0.0.1:5000",
    },
  });
  gulp.watch(routes.html.src, MinifyHTML);
  gulp.watch(routes.scss.src, SCSStoCSS);
}

const tasks = gulp.series([MinifyHTML, SCSStoCSS, ImageMinify, VideoCopy]);

exports.dev = gulp.series([Clean, tasks, Watch]);
exports.build = gulp.series([Clean, tasks]);
