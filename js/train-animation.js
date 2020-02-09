// 列车动画
function TrainAnimation(builder) {
    // 播放状态
    this.status = BEGIN;
    this.executingAnimationId = null;
    this.trainElementId = builder.trainElementId;
    this.trainElementDefaultClassStr = builder.trainElementDefaultClassStr;
    this.destination = builder.destination;
    this.playSpeed = builder.playSpeed;
    this.timeline = builder.timeline;
}

// 改变播放速度
TrainAnimation.prototype.changePlaySpeed = function (newPlaySpeed) {
    this.playSpeed = newPlaySpeed;
    this.timeline.changePlaySpeed(newPlaySpeed);
};

// 播放
TrainAnimation.prototype.play = function () {
    if (this.status !== BEGIN) {
        return;
    }
    this.status = PLAYING;
    this.timeline.start();
    this.executeAnimations();
};

// 暂停
TrainAnimation.prototype.pause = function () {
    if (this.status !== PLAYING) {
        return;
    }
    this.status = PAUSED;
    this.timeline.pause();

    // 列车css动画暂停
    document.getElementById(this.trainElementId).className =
        document.getElementById(this.trainElementId).className + " animation-paused";

    // 列车动画执行器停止
    clearTimeout(this.executingAnimationId);
};

// 重新开始
TrainAnimation.prototype.restart = function () {
    if (this.status !== PAUSED) {
        return;
    }
    this.status = PLAYING;
    this.timeline.restart();

    // 列车css动画继续
    document.getElementById(this.trainElementId).className =
        document.getElementById(this.trainElementId).className.replace(" animation-paused", "");

    // 动画执行器继续执行
    this.waitAndExecuteAnimations();
};

// 重置
TrainAnimation.prototype.reset = function () {
    this.status = BEGIN;
    // 重置时间线
    this.timeline.reset();
    // 重置class
    document.getElementById(this.trainElementId).className = this.trainElementDefaultClassStr;
    // 重置目的地
    document.getElementById(this.trainElementId).getElementsByClassName("label")[0].innerText = this.destination;
};

// 等待一个间隔后，执行剩余动画序列
TrainAnimation.prototype.waitAndExecuteAnimations = function () {
    // 询问时间线下一个间隔时间
    let timeElapse = this.timeline.nextTimeElapse();
    if (timeElapse == null) {
        return;
    }

    // 等待间隔，根据播放速度调整
    this.executingAnimationId = setTimeout(function (trainAnimation) {
        let animation = trainAnimation.timeline.nextAnimation();
        // 执行上一个动画完成后的方法
        animation.afterPlay(trainAnimation.trainElementId);
        // 告诉时间线上一个动画已经完成
        trainAnimation.timeline.oneAnimationPlayed();
        // 继续执行动画，递归
        trainAnimation.executeAnimations();
    }, timeElapse / this.playSpeed, this);
};

// 执行动画序列
TrainAnimation.prototype.executeAnimations = function () {
    // 询问时间线下一个需要播放的动画
    let animation = this.timeline.nextAnimation();
    if (animation == null) {
        return;
    }
    // 如果是最后一个动画（动画完成回调方法），本次列车动画状态改为结束
    if (this.timeline.isLastAnimation()) {
        this.status = END;
        animation();
        return;
    }

    // 执行动画
    animation.play(this.trainElementId);

    // 等待后继续执行动画
    this.waitAndExecuteAnimations();
};

// 是否执行完毕
TrainAnimation.prototype.isEnd = function () {
    return this.status === END;
};