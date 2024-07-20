

let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row);
    });
};

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
};

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
};

let hoursWorkedOnDate = function(soughtDate) {
    let inEvent = this.timeInEvents.find(function(e) {
        return e.date === soughtDate;
    });

    let outEvent = this.timeOutEvents.find(function(e) {
        return e.date === soughtDate;
    });

    return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function(dateSought) {
    let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour;
    return parseFloat(rawWage.toString());
};

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName;
    });
};

let allWagesFor = function() {
    let dates = this.timeInEvents.map(function(event) {
        return event.date;
    });

    let totalWages = dates.reduce(function(total, date) {
        return total + wagesEarnedOnDate.call(this, date);
    }.bind(this), 0);

    return totalWages;
};

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec);
    }, 0);
};