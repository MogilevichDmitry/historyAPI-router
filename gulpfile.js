var gulp = require('gulp');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('hello', function() {
  console.log('Hello Zell!');
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

// Watchers
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('useref', function() {

  return gulp.src('app/**/*')
    .pipe(gulp.dest('public'));
});


gulp.task('clean', function() {
  return del.sync('public').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:public', function() {
  return del.sync(['public/**/*']);
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:public',
    'useref',
    callback
  )
})
