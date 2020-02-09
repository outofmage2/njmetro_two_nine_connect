const trainTwoWaitingTime = 114653;

const trainThreeWaitingTime = 131820;

const trainFourWaitingTime = 260000;

const trainFiveWaitingTime = 390000;

const trainSixWaitingTime = 390000 + trainThreeWaitingTime;

const trainSevenWaitingTime = 390000 + trainFourWaitingTime;

const trainEightWaitingTime = 390000 + trainFiveWaitingTime;

const trainNineWaitingTime = 390000 * 2 + trainThreeWaitingTime;

const trainTenWaitingTime = 390000 * 2 + trainFourWaitingTime;

const trainElevenWaitingTime = 390000 * 2 + trainFiveWaitingTime;

const trainTwelveWaitingTime = 390000 * 3 + trainThreeWaitingTime;

const trainThirteenWaitingTime = 390000 * 3 + trainFourWaitingTime;

const trainFourteenWaitingTime = 390000 * 3 + trainFiveWaitingTime;

const trainFifteenWaitingTime = 390000 * 4 + trainThreeWaitingTime;

const trainSixteenWaitingTime = 390000 * 4 + trainFourWaitingTime;

const trainSeventeenWaitingTime = 390000 * 4 + trainFiveWaitingTime;

// 起步至60时速时长
const departAccTime = 27778;

// 60时速直道时长
const departSteadyTime = 11109;

// 进入弯道时长
const startTurnTime = 8280;

// 60时速完成弯道
const turnTime = 24900;

// 从60时速弯道减速至25时长
const turnSlowTime = 30000;

// 60时速完成转弯-直线变化时长138 / (60 / 3.6)
const enterStationTime = 8280;

// 60时速停车时长
const stopTime = 20000;

// 接驳车贯通集庆门停车时间
const connectThroughStayJqmTime = 40000;

// 2号线列车换向往水西门大街方向时间
const lineTwoReverseToConnectTime = 30000;

// 换向后等待时间
const departForSxmWaitingTime = 120000;

// 2号线车集庆门停车时间
const lineTowStayJqmTime = 40000;

// 通过渡线时间
const crossTime = 55000;

// 水西门换向时间
const sxmReverseTime = 14000;

// 水西门换向后等待时间
const departForJqmTime = 24000;

// 车站出发
let departPlatform = new AnimationExecutorBuilder()
    .setAnimationClass("animation-connect-line-depart-platform")
    .setAfterClass("after_depart_platform").build();

// 进入转弯
let startTurn = new AnimationExecutorBuilder()
    .setAnimationClass("animation-connect-line-down-enter-turn")
    .setAfterClass("after_enter_turn").build();

// 转弯2-9接驳线
let turnAtConnectLine = new AnimationExecutorBuilder()
    .setAnimationClass("animation-connect-line-down-turning")
    .setAfterClass("after_turning").build();

// 转弯2号线(1号车)
let turnAtLineTwo = new AnimationExecutorBuilder()
    .setAnimationClass("animation-line-two-down-turning")
    .setAfterClass("after_turning").build();

// 沿2号线转弯减速
let turnSlowAtLineTwo = new AnimationExecutorBuilder()
    .setAnimationClass("animation-line-two-down-slow-turning")
    .setAfterClass("after_turning").build();

// 从外侧进站
let enterStationFromOut = new AnimationExecutorBuilder()
    .setAnimationClass("animation-connect-line-down-enter-station")
    .setAfterClass("after_enter_station").build();

// 从内侧进站(1号车)
let enterStationFromInner = new AnimationExecutorBuilder()
    .setAnimationClass("animation-line-two-down-enter-station")
    .setAfterClass("after_enter_station").build();

// 减速停车集庆门站外侧
let stopAtJQMOuter = new AnimationExecutorBuilder()
    .setAnimationClass("animation-down-stop")
    .setAfterClass("after_stop")
    .setCallback(outerPlatformArrived).build();

// 减速停车集庆门站内侧
let stopAtJQMInner = new AnimationExecutorBuilder()
    .setAnimationClass("animation-down-stop")
    .setAfterClass("after_stop")
    .setCallback(innerPlatformArrived).build();

// 停车
let stopping = new AnimationExecutorBuilder()
    .build();

// 集庆门大街外侧停车
let stoppingAtJQMOuter = new AnimationExecutorBuilder()
    .setCallback(outerPlatformDeparted).build();

// 离开屏幕
let disappearFromJQM = new AnimationExecutorBuilder()
    .setAnimationClass("animation-disappear").build();

// 停集庆门大街前过渡线
let crossToStop = new AnimationExecutorBuilder()
    .setAnimationClass("animation-cross-to-stop")
    .setAfterClass("after_cross_to_stop")
    .setCallback(outerPlatformArrived).build();

// 换向
let reverse = new AnimationExecutorBuilder()
    .setAddClass("reversed")
    .setCallback(innerPlatformDeparted).build();

// 集庆门大街出发过渡线
let crossToDepart = new AnimationExecutorBuilder()
    .setAnimationClass("animation-cross-to-depart")
    .setAfterClass("after_cross_to_depart").build();

// 2-9接驳线上行转弯加速
let turnAccAtConnectLine = new AnimationExecutorBuilder()
    .setAnimationClass("animation-connect-line-up-turning")
    .setAfterClass("after_turning").build();

// 离开转弯
let leaveTurn = new AnimationExecutorBuilder()
    .setAnimationClass("animation-connect-line-up-leave-turn")
    .setAfterClass("after_leave_turn").build();

// 减速停车水西门站
let stopAtSxm = new AnimationExecutorBuilder()
    .setAnimationClass("animation-up-stop")
    .setAfterClass("after_stop_sxm").build();

// 换向
let reverseBack = new AnimationExecutorBuilder()
    .setDestination("鱼嘴", "train type_a west_outer_train").build();

function AnimationDataProvider(playSpeed) {
    let builder = new TrainAnimationBuilder();
    let lineTwoTrainAnimations = [turnSlowAtLineTwo, crossToStop, stoppingAtJQMOuter, disappearFromJQM, playedToEnd];
    let lineTwoTrainTimeElapses = [turnSlowTime, crossTime, lineTowStayJqmTime, departAccTime];

    let connectThroughTrainAnimations = [departPlatform, startTurn, turnAtConnectLine, enterStationFromOut, stopAtJQMOuter, stoppingAtJQMOuter, disappearFromJQM, playedToEnd];
    let connectThroughTrainTimeElapses = [departAccTime + departSteadyTime, startTurnTime, turnTime, enterStationTime, stopTime, connectThroughStayJqmTime, departAccTime];

    let reverseAndThroughTrainAnimations = [turnAtLineTwo, enterStationFromInner, stopAtJQMInner, stopping, reverse,
        crossToDepart, turnAccAtConnectLine, leaveTurn, stopAtSxm, stopping, reverseBack,
        departPlatform, startTurn, turnAtConnectLine, enterStationFromOut, stopAtJQMOuter, stoppingAtJQMOuter, disappearFromJQM, playedToEnd];
    let reverseAndThroughTrainTimeElapses = [turnTime, enterStationTime, stopTime, lineTwoReverseToConnectTime, departForSxmWaitingTime,
        crossTime, turnSlowTime, startTurnTime, departAccTime + departSteadyTime, sxmReverseTime, departForJqmTime,
        departAccTime + departSteadyTime, startTurnTime, turnTime, enterStationTime, stopTime, connectThroughStayJqmTime, departAccTime];

    let reverseTrainAnimations = [turnAtLineTwo, enterStationFromInner, stopAtJQMInner, stopping, reverse,
        crossToDepart, turnAccAtConnectLine, leaveTurn, stopAtSxm, playedToEnd];
    let reverseTrainTimeElapses = [turnTime, enterStationTime, stopTime, lineTwoReverseToConnectTime, departForSxmWaitingTime,
        crossTime, turnSlowTime, startTurnTime, departAccTime + departSteadyTime];

    // 一号列车动画
    this.trainOneAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_one", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed).build();


    // 二号列车动画
    this.trainTwoAnimation = builder
        .setAnimations(connectThroughTrainAnimations)
        .setTimeElapses(connectThroughTrainTimeElapses)
        .setTrainElement("train_two", "train type_a west_outer_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainTwoWaitingTime).build();


    // 三号列车动画
    this.trainThreeAnimation = builder
        .setAnimations(reverseAndThroughTrainAnimations)
        .setTimeElapses(reverseAndThroughTrainTimeElapses)
        .setTrainElement("train_three", "train type_a west_inner_train")
        .setDestination("水西门大街")
        .createTimeline(playSpeed, trainThreeWaitingTime).build();

    // 四号列车动画
    this.trainFourAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_four", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainFourWaitingTime).build();

    // 五号列车动画
    this.trainFiveAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_five", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainFiveWaitingTime).build();

    // 六号列车动画
    this.trainSixAnimation = builder
        .setAnimations(reverseAndThroughTrainAnimations)
        .setTimeElapses(reverseAndThroughTrainTimeElapses)
        .setTrainElement("train_six", "train type_a west_inner_train")
        .setDestination("水西门大街")
        .createTimeline(playSpeed, trainSixWaitingTime).build();

    // 七号列车动画
    this.trainSevenAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_seven", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainSevenWaitingTime).build();

    // 八号列车动画
    this.trainEightAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_eight", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainEightWaitingTime).build();

    // 九号列车动画
    this.trainNineAnimation = builder
        .setAnimations(reverseAndThroughTrainAnimations)
        .setTimeElapses(reverseAndThroughTrainTimeElapses)
        .setTrainElement("train_nine", "train type_a west_inner_train")
        .setDestination("水西门大街")
        .createTimeline(playSpeed, trainNineWaitingTime).build();

    // 十号列车动画
    this.trainTenAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_ten", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainTenWaitingTime).build();

    // 十一号列车动画
    this.trainElevenAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_eleven", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainElevenWaitingTime).build();

    // 十二号列车动画
    this.trainTwelveAnimation = builder
        .setAnimations(reverseAndThroughTrainAnimations)
        .setTimeElapses(reverseAndThroughTrainTimeElapses)
        .setTrainElement("train_twelve", "train type_a west_inner_train")
        .setDestination("水西门大街")
        .createTimeline(playSpeed, trainTwelveWaitingTime).build();

    // 十三号列车动画
    this.trainThirteenAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_thirteen", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainThirteenWaitingTime).build();

    // 十四号列车动画
    this.trainFourteenAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_fourteen", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainFourteenWaitingTime).build();

    // 十五号列车动画
    this.trainFifteenAnimation = builder
        .setAnimations(reverseTrainAnimations)
        .setTimeElapses(reverseTrainTimeElapses)
        .setTrainElement("train_fifteen", "train type_a west_inner_train")
        .setDestination("水西门大街")
        .createTimeline(playSpeed, trainFifteenWaitingTime).build();

    // 十六号列车动画
    this.trainSixteenAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_sixteen", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainSixteenWaitingTime).build();

    // 十七号列车动画
    this.trainSeventeenAnimation = builder
        .setAnimations(lineTwoTrainAnimations)
        .setTimeElapses(lineTwoTrainTimeElapses)
        .setTrainElement("train_seventeen", "train type_a west_inner_train")
        .setDestination("鱼嘴")
        .createTimeline(playSpeed, trainSeventeenWaitingTime).build();
}


