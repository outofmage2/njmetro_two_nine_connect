// 播放状态，开始，正在播放，暂停，完成
const BEGIN = 0;
const PLAYING = 1;
const PAUSED = 2;
const END = 3;

// 默认开始
let playState = BEGIN;

// 播放速度选择（倍）
let playSpeedSelect = 4;

// 播放速度列表（倍）
let playSpeedSelection = [1, 2, 4, 5, 8, 10, 12.5];

// 播放速度
let playSpeed = null;

// 列车动画播放器
let trainAnimationPlayer = null;

// 时钟
let clock = null;

// 时刻表
let timeTable = null;

window.onload = function () {
    playSpeed = playSpeedSelection[playSpeedSelect];

    // 创建时刻表
    timeTable = new TimeTable();

    // 设置css动画速度
    document.documentElement.style.setProperty('--play-speed', playSpeed.toString());
    document.getElementById("speed_label").innerHTML = "×" + playSpeed + "倍";

    let d = new AnimationDataProvider(playSpeed);

    // 创建播放器
    trainAnimationPlayer = new TrainAnimationPlayer([
        d.trainOneAnimation,
        d.trainTwoAnimation,
        d.trainThreeAnimation,
        d.trainFourAnimation,
        d.trainFiveAnimation,
        d.trainSixAnimation,
        d.trainSevenAnimation,
        d.trainEightAnimation,
        d.trainNineAnimation,
        d.trainTenAnimation,
        d.trainElevenAnimation,
        d.trainTwelveAnimation,
        d.trainThirteenAnimation,
        d.trainFourteenAnimation,
        d.trainFifteenAnimation,
        d.trainSixteenAnimation,
        d.trainSeventeenAnimation
    ]);

    // 创建时钟
    clock = new Clock(playSpeed);
    init();
};

function init() {
    window.console.log("开始");
    playState = BEGIN;

    // 初始化时钟
    clock.init();
}

function slower() {
    if (playSpeedSelect > 1) {
        playSpeedSelect -= 1;
        playSpeed = playSpeedSelection[playSpeedSelect];
        changePlaySpeed();
    }
}

function faster() {
    if (playSpeedSelect < 6) {
        playSpeedSelect += 1;
        playSpeed = playSpeedSelection[playSpeedSelect];
        changePlaySpeed();
    }
}

function changePlaySpeed() {
    pause();
    timeTable.reset();
    clock.changePlaySpeed(playSpeed);
    trainAnimationPlayer.changePlaySpeed(playSpeed);
    document.documentElement.style.setProperty('--play-speed', playSpeed.toString());
    document.getElementById("speed_label").innerHTML = "×" + playSpeed + "倍";
    init();
}

function play() {
    if (playState === PAUSED) {
        restart();
        return;
    }
    if (playState !== BEGIN) {
        return;
    }
    window.console.log("播放");
    playState = PLAYING;

    // 开始时钟
    clock.start();

    // 列车运行
    trainAnimationPlayer.play();
}

function playedToEnd() {
    if (playState === PLAYING) {
        if (trainAnimationPlayer.checkAllAnimationEnd()) {
            window.console.log("结束");
            playState = END;
            clock.stop();
        }
    }
}

function pause() {
    if (playState !== PLAYING) {
        return;
    }
    window.console.log("暂停");
    playState = PAUSED;

    let pauseTime = new Date();
    window.console.debug("暂停时间: " + pauseTime.getTime());

    // 暂停列车运行
    trainAnimationPlayer.pause();

    // 暂停时钟
    clock.pause(pauseTime);
}

function restart() {
    if (playState !== PAUSED) {
        return;
    }
    window.console.log("开始");
    playState = PLAYING;

    // 时钟继续
    clock.restart();

    // 列车动画继续
    trainAnimationPlayer.restart();
}

function reset() {
    if (playState === BEGIN) {
        return;
    }
    pause();
    trainAnimationPlayer.reset();
    timeTable.reset();
    init();
}

function copyArray(arrays) {
    let newArray = [];
    for (let i = 0; i < arrays.length; i++) {
        newArray.push(arrays[i]);
    }
    return newArray;
}