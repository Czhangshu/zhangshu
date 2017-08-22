window.onload = function() {
    /*
        实现的功能：
        1.播放暂停
        2.时间显示：当前时间 / 总时间
        3.进度展示
        4.音量控制（静音，点击音量）
        5.全屏和取消全屏
        6.播放速度控制
    */
    // 1.获取对象
    var container = document.querySelector('#video-container');
    var video = document.querySelector('video');

    var play = document.querySelector('.icon-bofang');

    // 当前时间和总时间
    var current = document.querySelector('span.current');
    var total = document.querySelector('span.total');

    // 获取进度条和进度条的小球
    var progress = document.querySelector('.progress');
    var progressLine = document.querySelector('.progress-line');
    var progressBall = document.querySelector('.progress-ball');

    // 获取静音按钮
    var volumeLogo = document.querySelector('.icon-yinliang3');
    var volumeLine = document.querySelector('.volume-line');
    var volumeLined = document.querySelector('.volume-lined');
    var volumeBall = document.querySelector('.volume-ball');

    // 获取全屏对象
    var quanping = document.querySelector('.icon-quanping');

    // 获取播放速度控制按钮
    var rateH3 = document.querySelector('.rate h3');
    var rateList = document.querySelectorAll('.rate ul li');

    // 鼠标拖动小球，视频跟着移动，就会触发ontimeupdate事件，取消ontimeupdate事件，通过标识符完成该功能
    var mark = true;
    var mark1 = true;
    var mark2 = true;

    // 2.播放暂停功能
    play.onclick = function() {
        // if (处于暂停状态) {
        if (video.paused) {
            // 视频播放
            video.play();
            // 改变图标
            this.classList.add('icon-zanting');
            this.classList.remove('icon-bofang');
        } else {
            // 视频暂停
            video.pause();
            // 改变图片
            this.classList.add('icon-bofang');
            this.classList.remove('icon-zanting');
        }
    }

    // 3.时间显示
    // 当前时间：video.currentTime
    // 总时间：video.duration
    current.innerHTML = formatTime(video.currentTime);

    // 总时长发生变化的时候触发的事件
    total.innerHTML = formatTime(video.duration);
    video.ondurationchange = function() {
        total.innerHTML = formatTime(video.duration);
    }

    // 4.当视频播放的时候，当前时间和进度条跟着动
    video.ontimeupdate = function() {
        if (mark) {
            current.innerHTML = formatTime(video.currentTime);

            // 进度条跟着动
            // 4.1 获取当前进度在总进度的百分比
            var bi = video.currentTime / video.duration;

            // 4.2 计算进度条线的长度
            progressLine.style.width = container.offsetWidth * bi + 'px';
            progressBall.style.left = container.offsetWidth * bi - progressBall.offsetWidth / 2 + 'px';
        }
    }

    // 5.点击的时候，视频跟着移动
    progress.onclick = function(ent) {
        if (mark1) {
            // 获取鼠标在进度条点击的位置
            var e = ent || event;
            // 获取点击的位置距点击对象的左边距（相对位置）
            var x = ent.offsetX;

            // 直接定位小球
            progressBall.style.left = x - progressBall.offsetWidth / 2 + 'px';
            // 改变进度条的宽度
            progressLine.style.width = x + 'px';

            // 改变当前时间
            var bi = x / container.offsetWidth;
            video.currentTime = video.duration * bi;
        }
    }

    // 拖动
    progressBall.onmousedown = function(ent) {
        mark1 = true;

        // 兼容
        var e = ent || window.event;

        // 获取初始化位置
        var startLeft = this.offsetLeft;
        // 获取点击的坐标点
        var startX = e.pageX;
        console.log(startX, startLeft);

        // 鼠标移动的时候
        document.onmousemove = function(ment) {
            mark1 = false;
            var me = ment || window.event;

            // 获取移动过程中的横坐标点
            var moveX = me.pageX;

            // 计算移动的距离
            var result = moveX - startX;

            // 赋值
            // 小球的位置移动
            progressBall.style.left = startLeft + result - progressBall.offsetWidth / 2 + 'px';
            // 红色进度条宽度改变
            progressLine.style.width = startLeft + result + 'px';
            // 视频位置移动
            video.currentTime = video.duration * (startLeft + result) / container.offsetWidth;
        }

        document.onmouseup = function() {
            document.onmousemove = null;
            mark = true;
        }
    }

    // 6.静音跟取消静音
    volumeLogo.onclick = function() {
        // console.log(video.muted);
        // video.muted为真，则已经静音
        if (video.muted) {
            // 取消静音
            video.muted = false;
            // 将音量变为0
            video.volume = 1;
            volumeBall.style.left = volumeLine.offsetWidth - volumeBall.offsetWidth / 2 + 'px';
            volumeLined.style.width = volumeLine.offsetWidth + 'px';
            // 改变图标
            this.classList.remove('icon-jingyin');
            this.classList.add('icon-yinliang3');
        } else {
            // 静音
            video.muted = true;
            // 将音量变为0
            video.volume = 0;
            volumeBall.style.left = '-6px';
            volumeLined.style.width = 0;
            // 改变图标
            this.classList.remove('icon-yinliang3');
            this.classList.add('icon-jingyin');
        }
    }

    // 点击音量
    volumeLine.onclick = function(ent) {
        if (mark2) {
            var e = ent || event;

            // 获取单击的位置
            var left = e.offsetX;

            // 设置音量进度条和小球的位置
            volumeBall.style.left = left - volumeBall.offsetWidth / 2 + 'px';
            volumeLined.style.width = left + 'px';

            // 改变音量的值
            // console.log(video.volume);
            video.volume = e.offsetX / this.offsetWidth;
            // console.log(video.volume);

            if (video.volume == 0) {
                volumeLogo.className = 'iconfont icon-jingyin';
            } else if (video.volume > 0 && video.volume < 0.6) {
                volumeLogo.className = 'iconfont icon-yinliang2';
            } else {
                volumeLogo.className = 'iconfont icon-yinliang3';
            }
        }
    }

    // 鼠标按下去并抬起
    volumeBall.onmousedown = function(ent) {
        mark2 = true;

        // 兼容
        var e = ent || window.event;

        // 获取初始化位置
        var startLeft = this.offsetLeft;
        // 获取点击的坐标点
        var startX = e.pageX;
        console.log(startX, startLeft);

        // 鼠标移动的时候
        document.onmousemove = function(ment) {
            mark2 = false;
            var me = ment || window.event;

            // 获取移动过程中的横坐标点
            var moveX = me.pageX;

            // 计算移动的距离
            var result = moveX - startX;

            // 赋值
            var left = startLeft + result - volumeBall.offsetWidth / 2;
            // console.log(startLeft, result, left);
            if (left < -6) {
                left = 0;
            } else if (left > volumeLine.offsetWidth - 6) {
                left = volumeLine.offsetWidth - 6;
            }
            // 小球的位置移动
            volumeBall.style.left = left + 'px';
            // 红色进度条宽度改变
            volumeLined.style.width = left + volumeBall.offsetWidth / 2 + 'px';
            // 改变音量大小
            video.volume = Math.abs(left / volumeLine.offsetWidth);

            if (video.volume == 0) {
                volumeLogo.className = 'iconfont icon-jingyin';
            } else if (video.volume > 0 && video.volume < 0.6) {
                volumeLogo.className = 'iconfont icon-yinliang2';
            } else {
                volumeLogo.className = 'iconfont icon-yinliang3';
            }
        }

        document.onmouseup = function() {
            document.onmousemove = null;
        }
    }

    // 7.全屏和取消全屏-按钮只负责全屏和取消全屏
    quanping.onclick = function() {
        if (fullscreen()) {
            // 取消全屏
            exitFullscreen();
            // console.log('取消全屏');
        } else {
            // 全屏
            requestFullscreen(container);
            // console.log('全屏');
        }
    }

    // 8.监听屏幕改变事件-屏幕事件负责添加图标处理和大小处理
    document.onwebkitfullscreenchange = change;
    document.onmozfullscreenchange = change;
    document.onmsfullscreenchange = change;

    function change() {
        console.log(123);
        console.log(fullscreen());
        if (!fullscreen()) {
            // 改变图标
            quanping.classList.add('icon-quanping');
            quanping.classList.remove('icon-quxiaoquanping');

            // 恢复原来的宽度和高度
            container.style.width = '700px';
            container.style.height = '433.75px';
        } else {
            // 改变图标
            quanping.classList.add('icon-quxiaoquanping');
            quanping.classList.remove('icon-quanping');

            // 全屏之后视频容器大小还是700px，约束了全局显示
            container.style.width = "100%";
            container.style.height = "100%";
        }
    }

    // 9.改变播放速度
    for (var i = 0; i < rateList.length; i++) {
        rateList[i].onclick = function() {
            // 改变文字框内容
            rateH3.innerHTML = this.innerHTML;
            video.playbackRate = parseFloat(this.innerHTML);
        }
    }

    // 转换时间
    function formatTime(time) {
        // time = 197
        // 分钟数
        var minute = Math.floor(time / 60);
        if (minute < 10) {
            minute = '0' + minute;
        }
        // 剩余秒数
        var second = Math.floor(time % 60);
        if (second < 10) {
            second = '0' + second;
        }

        return minute + ':' + second;
    }

    // 全屏
    // ele:全屏的对象
    function requestFullscreen(ele) {
        // 全屏兼容代码
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
        }
    }

    // 取消全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }

    // 判断是否全屏
    function fullscreen() {
        return document.fullscreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            document.msFullscreenElement ||
            false;
    }
}