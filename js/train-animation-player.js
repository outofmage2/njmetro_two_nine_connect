// 列车动画播放器
function TrainAnimationPlayer(trainAnimations) {
    // 播放状态
    this.status = BEGIN;
    // 列车动画集合
    this.trainAnimations = trainAnimations;
    this.reset();
}

// 改变播放速度
TrainAnimationPlayer.prototype.changePlaySpeed = function (newPlaySpeed) {
    this.reset();
    for (let trainAnimation of this.trainAnimations) {
        trainAnimation.changePlaySpeed(newPlaySpeed);
    }
};

// 播放
TrainAnimationPlayer.prototype.play = function () {
    if (this.status !== BEGIN) {
        return;
    }
    this.status = PLAYING;
    for (let trainAnimation of this.trainAnimations) {
        trainAnimation.play();
    }
};

// 暂停
TrainAnimationPlayer.prototype.pause = function () {
    if (this.status !== PLAYING) {
        return;
    }
    this.status = PAUSED;
    for (let trainAnimation of this.trainAnimations) {
        trainAnimation.pause();
    }
};

// 继续
TrainAnimationPlayer.prototype.restart = function () {
    if (this.status !== PAUSED) {
        return;
    }
    this.status = PLAYING;
    for (let trainAnimation of this.trainAnimations) {
        trainAnimation.restart();
    }
};

// 重置
TrainAnimationPlayer.prototype.reset = function () {
    this.status = BEGIN;
    for (let trainAnimation of this.trainAnimations) {
        trainAnimation.reset();
    }
};

// 检查是否所有动画都已经播放完毕
TrainAnimationPlayer.prototype.checkAllAnimationEnd = function () {
    for (let trainAnimation of this.trainAnimations) {
        if (!trainAnimation.isEnd()) {
            return false;
        }
    }
    return true;
};