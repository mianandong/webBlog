/**
 * gulp-项目工具
 * 用自动化构建工具增强你的工作流
 * 
 * 安装gulp
 * 在npm管理的项目中执行
 * npm i gulp -D
 * 
 * 创建一个gulpfile.js文件，编写gulp需要执行的任务
 */

/**
 * ==============gulp的基本使用==============
 */

const gulp = require('gulp');

/**
 * 第一个参数，任务的名称，自定义
 * 第二个参数，回调函数，执行的任务
 * 
 * 在控制台执行gulp hello，即可执行任务，输出'hello world'
 */
gulp.task('hello', function() {
    console.log('hello world');
})

/**
 * gulp基本的函数
 * gulp.src()  找到源文件路径
 * gulp.dest() 找到目的文件的路径，如果文件夹不存在会自动创建
 * gulp.pipe() 管道
 */


/**
 * 实现的功能：将当前目录下得index.html文件拷贝到dist/index.html下
 * 注意：回调函数要return
 * 
 * 在控制台执行 gulp copy-html 即可执行该任务
 */
gulp.task('copy-html', function() {
    return gulp.src('index.html')
    .pipe(gulp.dest('dist/index.html'));
})

/**
 * 实现的功能：将当前img目录下的所有.jpg .png后缀的图片拷贝到dist/images目录下
 * 
 * 在控制台执行 gulp copy-images 即可执行该任务
 */
gulp.task('copy-images', function() {
    return gulp.src('img/*.{jpg,png}').pipe(gulp.dest('dist/images'))
})

// return gulp.src('img/*/*').pipe(gulp.dest('dist/images'))
// 拷贝img目录下所有的文件（不包含文件夹）

// return gulp.src('img/**/*').pipe(gulp.dest('dist/images'))
// 拷贝img目录下所有的文件及文件夹

/**
 * 实现的功能：将多个不同位置的文件，拷贝至同一目录下
 */
gulp.task('combine-file', function() {
    return gulp.src(['json/*.json', 'xml/*.xml']).pipe(gulp.dest('dist/file'));
})


/**
 * 实现的功能：在控制台执行 gulp build 即可一次执行多个任务
 * 注意：多个任务是并发执行的
 * 
 * 第一个参数：任务的名称，自定义
 * 第二个参数：执行的任务名称，数组类型
 * 第三个参数：所有任务执行完毕调用的回调函数
 */
gulp.task('build', ['copy-html', 'copy-images', 'combine-file'], function() {
    console.log('所有任务执行完毕');
})


/**
 * ==============gulp启动监听功能==============
 */

/**
 * gulp可以监听文件的变更，自动执行相应的任务
 * 在控制台执行 gulp watch 即可启动监听
 */
gulp.task('watch', function() {
    // 第一个参数：监听的文件地址
    // 第二个参数：文件变更时执行的gulp任务，数组类型
    gulp.watch('index.html', ['copy-html']);
    gulp.watch('img/**/*', ['copy-images']);
    gulp.watch(['json/*.json', 'xml/*.xml'], ['combine-file']);
})


/**
 * ==============gulp插件==============
 */

/**
 * gulp之所有很强大，是因为gulp有很多插件
 * 插件的说明和使用可参考 gulpjs.com/plugins
 */

/**
 * npm i gulp-sass -D
 * 借助gulp-sass插件，我们可以将.sass文件编译为.css文件
 * 在控制台执行 gulp sass 即可
 */
const sass = require('gulp-sass');
gulp.task('sass', function() {
    return gulp.src('style/index.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
})

/**
 * npm i gulp-minify-css -D
 * 借助gulp-minify-css插件，可以对css文件进行压缩
 */
const minifyCss = require('gulp-minify-css');
gulp.task('sass', function() {
    return gulp.src('style/index.sass')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
})

/**
 * npm i gulp-rename -D
 * 借助gulp-rename插件，可以对压缩后的文件进行重命名
 * 这样，index.sass文件进行转化后，未压缩的版本名称为index.css，压缩后的版本名称为index.min.css
 */
const rename = require('gulp-rename');
gulp.task('sass', function() {
    return gulp.src('style/index.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCss())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'));
})


/**
 * ==============gulp-connect服务器==============
 */

/**
 * gulp-connect可以启动一个服务
 * 
 * 在控制台执行 gulp server 即可
 */
const connect = require('gulp-connect');

gulp.task('server', function() {
    connect.server({
        root: 'dist', // 服务的启动目录
        port: 8888,   // 服务的端口
        livereload: true, // 启动实时刷新，相应的task需要修改
        /**
         * gulp.task('copy-html', function() {
                return gulp.src('index.html')
                .pipe(gulp.dest('dist/index.html'))
                .pipe(connect.reload())  // 这里是新添加的pipe
            })

            gulp.task('copy-images', function() {
                return gulp.src('img/*.{jpg,png}')
                .pipe(gulp.dest('dist/images'))
                .pipe(connect.reload()) // 这里是新添加的pipe
            })
         */
    })
})

/**
 * 同时启动监听和服务
 * 
 * 任务名称为default，我们在控制台可以直接使用 gulp 命令启动
 * 同时启动watch和server任务
 * 
 * 这样一顿操作下来，实现了类似webpack的热更新功能
 * 即修改文件保存后，会自动执行相应task，server也会自动刷新
 */
gulp.task('default', ['watch', 'server']);