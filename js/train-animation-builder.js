function TrainAnimationBuilder() {
    this.animations = null;
    this.timeElapses = null;
    this.trainElementId = null;
    this.trainElementDefaultClassStr = null;
    this.destination = null;
    this.playSpeed = null;
    this.timeline = null;
}

TrainAnimationBuilder.prototype.setAnimations = function (animations) {
    this.animations = copyArray(animations);
    return this;
};
TrainAnimationBuilder.prototype.setTimeElapses = function (timeElapses) {
    this.timeElapses = copyArray(timeElapses);
    return this;
};

TrainAnimationBuilder.prototype.createTimeline = function (playSpeed, startDelay) {
    // 动画序列比间隔序列数量多一个
    if (this.animations == null || this.timeElapses == null ||
        this.animations.length === 0 ||
        this.animations.length - 1 !== this.timeElapses.length) {
        return;
    }
    this.playSpeed = playSpeed;
    this.animations = startDelay === undefined || startDelay === null ? this.animations : [stopping].concat(this.animations);
    this.timeElapses = startDelay === undefined || startDelay === null ? this.timeElapses : [startDelay].concat(this.timeElapses);
    this.timeline = new TrainAnimationTimeline(playSpeed, this.animations, this.timeElapses);
    return this;
};

TrainAnimationBuilder.prototype.setTrainElement = function (trainElementId, trainElementDefaultClassStr) {
    this.trainElementId = trainElementId;
    this.trainElementDefaultClassStr = trainElementDefaultClassStr;
    return this;
};

TrainAnimationBuilder.prototype.setDestination = function (destination) {
    this.destination = destination;
    return this;
};

TrainAnimationBuilder.prototype.build = function () {
    return new TrainAnimation(this);
};