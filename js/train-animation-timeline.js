// 列车动画播放时间线
function TrainAnimationTimeline(playSpeed, animations, timeElapses) {
    // 播放状态
    this.status = BEGIN;
    // 播放速度
    this.playSpeed = playSpeed;
    // 播放的动画方法序列
    this.animations = animations;
    // 播放动画的间隔序列
    this.timeElapses = copyArray(timeElapses);
    // 已经播放的动画数量
    this.animationPlayedCount = 0;
    // 播放开始时间
    this.startTime = null;
    // 保存的间隔序列
    this.timeElapsesSaved = copyArray(timeElapses);
}

// 改变播放速度
TrainAnimationTimeline.prototype.changePlaySpeed = function(newPlaySpeed){
    this.playSpeed = newPlaySpeed;
};

// 时间开始
TrainAnimationTimeline.prototype.start = function () {
    if (this.status !== BEGIN) {
        return;
    }
    this.status = PLAYING;
    this.startTime = new Date();
};

// 时间暂停
TrainAnimationTimeline.prototype.pause = function () {
    if (this.status !== PLAYING) {
        return;
    }
    this.status = PAUSED;
    let pauseTime = new Date();

    // 本次动画播放时长（暂停时间至上次播放时间之差）
    let currentAnimationPlayedTime = pauseTime.getTime() - this.startTime.getTime();

    // 下一个动画间隔扣除本次播放时长
    this.timeElapses[this.animationPlayedCount] -= currentAnimationPlayedTime * this.playSpeed;
};

// 时间重新开始
TrainAnimationTimeline.prototype.restart = function () {
    if (this.status !== PAUSED) {
        return;
    }
    this.status = PLAYING;
    this.startTime = new Date();
};

// 时间重置
TrainAnimationTimeline.prototype.reset = function () {
    this.status = BEGIN;
    this.animationPlayedCount = 0;
    this.startTime = null;
    this.timeElapses = copyArray(this.timeElapsesSaved);
};

// 当前动画播放完毕
TrainAnimationTimeline.prototype.oneAnimationPlayed = function () {
    this.animationPlayedCount++;
    this.startTime = new Date();
};

// 下一个动画
TrainAnimationTimeline.prototype.nextAnimation = function () {
    if (this.animations.length <= this.animationPlayedCount) {
        return null;
    }
    return this.animations[this.animationPlayedCount];
};

// 下一个间隔
TrainAnimationTimeline.prototype.nextTimeElapse = function () {
    if (this.timeElapses.length <= this.animationPlayedCount) {
        return null;
    }
    return this.timeElapses[this.animationPlayedCount];
};

// 是否是最后一个动画
TrainAnimationTimeline.prototype.isLastAnimation = function () {
    return this.animations.length - 1 === this.animationPlayedCount;
};
