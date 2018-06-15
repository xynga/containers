const gulp = require('gulp');
const clean = require('gulp-clean');
const inlineTemplates = require('gulp-inline-ng2-template');
const sass = require('node-sass');

const INLINE_TEMPLATES = {
    SRC: [
      './src/containers/**/*.ts',
      '!/src/containers/**/*.spec'
    ],
    DIST: './dist',
    CONFIG: {
        base: '.',
        target: 'es6',
        useRelativePaths: true,
        styleProcessor: compileSass
    }
};

const CLEANUP_SRC = [
  './dist/**/*.ts',
  '!./dist/**/*.d.ts'
];

gulp.task('inline', () => {
    return gulp.src(INLINE_TEMPLATES.SRC)
        .pipe(inlineTemplates(INLINE_TEMPLATES.CONFIG))
        .pipe(gulp.dest(INLINE_TEMPLATES.DIST));
});

gulp.task('cleanup', () => {
  return gulp.src(CLEANUP_SRC).pipe(clean());
});

function compileSass(path, ext, file, callback) {
    let compiledCss = sass.renderSync({
        file: path,
        outputStyle: 'compressed',
    });
    callback(null, compiledCss.css);
}
