const gulp = require('gulp');
const aglio = require('gulp-aglio');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const ejs = require('gulp-ejs');

const reload = browserSync.reload;
const TEMPLATE_FILES = ['src/**/*'];
const BASE_FILE = 'src/index.ejs';
const BUILD_DIR = 'dest';
const APIARY_FILE = './apiary.apib';

gulp.task('combine', () => {
  return gulp.src(BASE_FILE)
    .pipe(ejs({},{ ext: '.md' }))
    .pipe(rename('index.md'))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('generate', ['combine'], () => {
  return gulp.src(BUILD_DIR + '/index.md')
    .pipe(aglio({template: 'default'}))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('browserSync', () => {
  browserSync({
    logConnections: true,
    logFileChanges: true,
    notify: true,
    port: 8088,
    open: false,
    server: {
      baseDir: BUILD_DIR
    }
  });
});

gulp.task('clean', (cb) => {
  rimraf(BUILD_DIR, cb);
});

gulp.task('fileWatch', () => {
  gulp.watch(TEMPLATE_FILES, ['generate', reload]);
});

gulp.task('build', () => {
  return gulp.src(BASE_FILE)
    .pipe(ejs({},{ ext: '.md' }))
    .pipe(rename(APIARY_FILE))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['generate']);
gulp.task('watch', ['generate', 'fileWatch', 'browserSync']);
