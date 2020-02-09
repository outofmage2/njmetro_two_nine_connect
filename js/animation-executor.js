// 动画执行器
function AnimationExecutor(builder) {
    this.animationClass = builder.animationClass;
    this.afterClass = builder.afterClass;
    this.addClass = builder.addClass;
    this.destination = builder.destination;
    this.callback = builder.callback;
    this.replaceClassStr = builder.replaceClassStr;
}

function AnimationExecutorBuilder() {
    this.animationClass = null;
    this.afterClass = null;
    this.addClass = null;
    this.destination = null;
    this.replaceClassStr = null;
    this.callback = null;
}

AnimationExecutorBuilder.prototype.setAnimationClass = function (animationClass) {
    this.animationClass = animationClass;
    return this;
};
AnimationExecutorBuilder.prototype.setAfterClass = function (afterClass) {
    this.afterClass = afterClass;
    return this;
};
AnimationExecutorBuilder.prototype.setAddClass = function (addClass) {
    this.addClass = addClass;
    return this;
};
AnimationExecutorBuilder.prototype.setDestination = function (destination, replaceClassStr) {
    this.destination = destination;
    this.replaceClassStr = replaceClassStr;
    return this;
};
AnimationExecutorBuilder.prototype.setCallback = function (callback) {
    this.callback = callback;
    return this;
};
AnimationExecutorBuilder.prototype.build = function () {
    return new AnimationExecutor(this);
};

AnimationExecutor.prototype.play = function (trainElementId) {
    if (this.animationClass !== null) {
        this.replaceClass(trainElementId, this.animationClass, "animation-");
    }
    if (this.addClass !== null && this.addClass !== undefined) {
        document.getElementById(trainElementId).className += (" " + this.addClass);
    }
    if (this.destination !== null && this.destination !== undefined) {
        document.getElementById(trainElementId).getElementsByClassName("label")[0].innerText = this.destination;
        document.getElementById(trainElementId).className = this.replaceClassStr;
    }
};

AnimationExecutor.prototype.afterPlay = function (trainElementId) {
    if (this.afterClass !== null && this.afterClass !== undefined) {
        this.replaceClass(trainElementId, this.afterClass, "after_");
    }
    if (this.callback !== null && this.callback !== undefined) {
        this.callback();
    }
};

AnimationExecutor.prototype.replaceClass = function (trainElementId, animationClass, keyword) {
    let className = document.getElementById(trainElementId).className;
    let classNames = className.split(" ");
    let newClassName = "";
    for (let name of classNames) {
        if (name.indexOf(keyword) > -1) {
            if (animationClass !== null) {
                name = animationClass;
            }
        }
        newClassName += (name + " ");
    }
    newClassName = newClassName.substring(0, newClassName.length - 1);
    if (newClassName.indexOf(animationClass) === -1) {
        newClassName += (" " + animationClass);
    }
    document.getElementById(trainElementId).className = newClassName;
};