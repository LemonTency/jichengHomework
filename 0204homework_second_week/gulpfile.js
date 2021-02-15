const gulp = require('gulp');
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const rollup = require('gulp-rollup')
const replace = require('@rollup/plugin-replace')

const entry = './src/server/**/*.js'

function buildDev() {
  //src匹配所有需要打包的文件
  //打包好之后用dest送到dist/server
  return watch(
    entry,
    {
      ignoreInitial: false,
    }).pipe(babel(
      //不要加载给web项目配的babelrc的规则
      //使用转换为commonjs规范的插件
      {
        "plugins": ["@babel/plugin-transform-modules-commonjs"]
      }
    )).pipe(gulp.dest('dist/server'))
}

function buildProd() {
  return gulp.src(
    entry,
    {
      ignoreInitial: false,
    }).pipe(babel(
      //不要加载给web项目配的babelrc的规则
      //使用转换为commonjs规范的插件
      {
        "plugins": ["@babel/plugin-transform-modules-commonjs"]
      }
    )).pipe(gulp.dest('dist/server'))
}

function cleanConfig() {
  return gulp.src(entry).pipe(rollup({
    input: "./src/server/config/index.js",
    output: {
      format: "cjs"
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': "'production'",
      })
    ]
  })).pipe(gulp.dest("dist/server"))
}

let build = null
console.log('process.NODE_ENV', process.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  build = gulp.series(buildDev)
}

if (process.env.NODE_ENV === 'production') {
  build = gulp.series(buildProd, cleanConfig)
}

gulp.task('default', build)

