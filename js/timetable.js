// 时刻表
function TimeTable() {
    this.outerPlatformNextTrainNo = 1;
    this.innerPlatformNextTrainNo = 1;
    this.outerPlatform = document.getElementById("outer_platform_timetable").getElementsByTagName("tbody")[0];
    this.innerPlatform = document.getElementById("inner_platform_timetable").getElementsByTagName("tbody")[0];
    this.nextRowTimeoutId = null;
}

TimeTable.prototype.reset = function () {
    this.outerPlatformNextTrainNo = 1;
    this.innerPlatformNextTrainNo = 1;
    let trList = this.outerPlatform.getElementsByTagName("tr");
    for (let tr of trList) {
        tr.className = "";
    }
    trList = this.innerPlatform.getElementsByTagName("tr");
    for (let tr of trList) {
        tr.className = "";
    }
    let arriveRow = this.getOuterArriveRow();
    arriveRow.className = "red";
    arriveRow = this.getInnerArriveRow();
    arriveRow.className = "red";
    clearTimeout(this.nextRowTimeoutId);
};

TimeTable.prototype.outerPlatformArrived = function () {
    let arriveRow = this.getOuterArriveRow();
    arriveRow.className += " flashing";
};

TimeTable.prototype.getOuterArriveRow = function () {
    let rowNumber = this.outerPlatformNextTrainNo * 2 - 2;
    return this.outerPlatform.getElementsByTagName("tr")[rowNumber];
};

TimeTable.prototype.outerPlatformDeparted = function () {
    let departRow = this.getOuterDepartRow();
    departRow.className += " flashing";

    this.nextRowTimeoutId = setTimeout(function (timetable) {
        timetable.outerPlatform.getElementsByTagName("tr");
        let arriveRow = timetable.getOuterArriveRow();
        let departRow = timetable.getOuterDepartRow();
        arriveRow.className = "";
        departRow.className = "";
        timetable.outerPlatformNextTrainNo++;
        arriveRow = timetable.getOuterArriveRow();
        if(arriveRow!==null || arriveRow!==undefined) {
            arriveRow.className = "red";
        }
    }, 3000, this);
};

TimeTable.prototype.getOuterDepartRow = function () {
    let rowNumber = this.outerPlatformNextTrainNo * 2 - 1;
    return this.outerPlatform.getElementsByTagName("tr")[rowNumber];
};

TimeTable.prototype.innerPlatformArrived = function () {
    let arriveRow = this.getInnerArriveRow();
    arriveRow.className += " flashing";
};

TimeTable.prototype.getInnerArriveRow = function () {
    let rowNumber = this.innerPlatformNextTrainNo * 6 - 4;
    return this.innerPlatform.getElementsByTagName("tr")[rowNumber];
};

TimeTable.prototype.innerPlatformDeparted = function () {
    let departRow = this.getInnerDepartRow();
    departRow.className += " flashing";

    setTimeout(function (timetable) {
        timetable.innerPlatform.getElementsByTagName("tr");
        let arriveRow = timetable.getInnerArriveRow();
        let departRow = timetable.getInnerDepartRow();
        arriveRow.className = "";
        departRow.className = "";
        timetable.innerPlatformNextTrainNo++;
        arriveRow = timetable.getInnerArriveRow();
        arriveRow.className = "red";
    }, 3000, this);
};

TimeTable.prototype.getInnerDepartRow = function () {
    let rowNumber = this.innerPlatformNextTrainNo * 6 - 3;
    return this.innerPlatform.getElementsByTagName("tr")[rowNumber];
};

function outerPlatformArrived() {
    timeTable.outerPlatformArrived();
}

function outerPlatformDeparted() {
    timeTable.outerPlatformDeparted();
}

function innerPlatformArrived() {
    timeTable.innerPlatformArrived();
}

function innerPlatformDeparted() {
    timeTable.innerPlatformDeparted();
}