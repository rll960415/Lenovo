var { src, dest, series, parallel, watch} = require('gulp');
var clean = require('gulp-clean');     //清理
var fileInclude = require('gulp-file-include');    //代码片段
var sass = require('gulp-sass');    //scss装css
var webserver = require('gulp-webserver');   //开启web服务器


function cleanTask(){
    return src('./dist',{allowEmpty:true})   //{allowEmpty:true}当此文件夹不存在时也可以清理（防止报错）
            .pipe(clean());
}
//html代码片段
function htmlTask(){
    return src('./src/view/*.html')
        .pipe(fileInclude({
            prefix:'@',
            basepath:'./src/view/templates'
        }))
        .pipe(dest('./dist/view'));
}

//static静态资源处理
function staticTask(){
    return src('./src/static/**')
        .pipe(dest('./dist/static'));
}

//sass的处理
function sassTask(){
    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'))
}

//js文件的处理
function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'));
}

//js文件的处理
function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'));
}





//监听文件
function watchTask(){
    watch('./src/view/**',htmlTask);
    watch('./src/static/**',staticTask);
    watch('./src/css/**',sassTask);
    watch('./src/js/**',jsTask);
    watch('./src/lib/**',libTask);
}

//gulp启动web服务器
function webTask(){
    return src('./dist')
            .pipe(webserver({
                host:'localhost',
                port:3000,
                open:'./view/index.html',
                livereload:true
            }))
}



module.exports = {
    //开发调用的命令（开发时一般都压缩，与生产的命令不一样）
    dev:series(cleanTask,parallel(htmlTask,staticTask,sassTask,libTask,jsTask),parallel(watchTask,webTask)),
    //生产调用的命令
    build:series(cleanTask)


};