var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    reload            = browserSync.reload,
    sass          = require('gulp-sass'),
    nano          = require('gulp-cssnano'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename');
    uncss         = require('gulp-uncss');

var url 		= 'neat.dev'

//Main paths
var config = {
  styles: {
    main:'./css/main.scss',
    watch: './css/**/*.scss',
    output: './'
  }
}

gulp.task('browser-sync', function() {
	var files = [
					'**/*.php',
          '**/*.html',
					'**/*.{png,jpg,gif}'
				];
	browserSync.init(files, {
    server: true,
		injectChanges: true
	});
});


//Watch changes in files
gulp.task('watch', function(){
  gulp.watch(config.styles.watch, ['build:css']);
});

//Compile, add prefixes and minifycss
gulp.task('build:css', function(){
  return gulp.src(config.styles.main)
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename('style.css'))
  .pipe(gulp.dest(config.styles.output))
  .pipe(nano({
    discardComments: {removeAll: true}
  }))
  .pipe(reload({stream:true}))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest(config.styles.output))
  .pipe(reload({stream:true}));
});

//Remove css unused task
gulp.task('remove:css', function() {
    gulp.src('style.min.css')
        .pipe(uncss({
            html: ['index.html', 'forms.html']
        }))
        .pipe(gulp.dest(config.styles.output));
});


//Build task
gulp.task('build', ['build:css']);

gulp.task('default', ['browser-sync','build', 'watch']);
