// 默认初始时间
const START_TIME = "07:58:35";

function Clock(playSpeed) {
    // 播放速度
    this.playSpeed = playSpeed;
    // 时钟定时器
    this.clockRunningInterval = null;
    // 上次时钟变化的时间
    this.lastClockTriggerTime = null;
    // 暂停时间与上次触发时钟的时差
    this.timeElapsedSinceLastClockChange = null;
    // 界面时间字符串
    this.timeStr = "";
    this.init();
}

// 初始化时钟显示
Clock.prototype.init = function () {
    this.timeStr = START_TIME;
    document.getElementById("clock").innerText = this.timeStr;
};

// 改变播放速度
Clock.prototype.changePlaySpeed = function (newPlaySpeed) {
    this.playSpeed = newPlaySpeed;
    this.stop();
    this.init();
};

// 时钟开始运行
Clock.prototype.start = function () {
    this.lastClockTriggerTime = new Date();
    let intervalMilli = 1000 / this.playSpeed;

    // 时间增加一秒
    this.clockRunningInterval = setInterval(function (clock) {
        clock.moveClockOneSecond();
        // 根据播放速度执行定时器
    }, intervalMilli, this);
};

// 暂停
Clock.prototype.pause = function (pauseTime) {
    // 时钟停止
    this.stop();

    // 暂停时间与上次触发时钟的时差。用于重新开始时，校准时间
    this.timeElapsedSinceLastClockChange = (pauseTime.getTime() - this.lastClockTriggerTime.getTime()) % (1000 / this.playSpeed);
    window.console.debug("暂停时钟时差: " + this.timeElapsedSinceLastClockChange);
};

// 重启时钟
Clock.prototype.restart = function () {
    setTimeout(function (clock) {
        clock.moveClockOneSecond();
        clock.start();
        // 扣除暂停时差校准
    }, 1000 / this.playSpeed - this.timeElapsedSinceLastClockChange, this);
};

// 停止时钟
Clock.prototype.stop = function () {
    clearInterval(this.clockRunningInterval);
};

// 时钟加一秒
Clock.prototype.moveClockOneSecond = function () {
    this.lastClockTriggerTime = new Date();
    window.console.debug("时钟变化时间: " + this.lastClockTriggerTime.getTime());
    let times = this.timeStr.split(":");
    let hour = Number(times[0]);
    let minute = Number(times[1]);
    let second = Number(times[2]);

    second += 1;
    if (second >= 60) {
        second = 0;
        minute += 1;
    }
    if (minute >= 60) {
        minute = 0;
        hour += 1;
    }

    this.timeStr =
        (hour > 9 ? hour : "0" + hour) +
        ":" +
        (minute > 9 ? minute : "0" + minute) +
        ":" +
        (second > 9 ? second : "0" + second);
    document.getElementById("clock").innerText = this.timeStr;
};