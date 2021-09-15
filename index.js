/* Your Code Here */
function createEmployeeRecord(arr) {
  const employeeObj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeObj;
}

function createEmployeeRecords(arrs) {
  const newArr = arrs.map((arr) => createEmployeeRecord(arr));
  return newArr;
}

function createTimeInEvent(dateStamp) {
  const date = dateStamp.split(" ")[0];
  const hour = Number(dateStamp.split(" ")[1]);
  this.timeInEvents.push({
    type: "TimeIn",
    hour,
    date,
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  const date = dateStamp.split(" ")[0];
  const hour = Number(dateStamp.split(" ")[1]);
  this.timeOutEvents.push({
    type: "TimeOut",
    hour,
    date,
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((allDates) => allDates.date === date);
  const timeOut = this.timeOutEvents.find((allDates) => allDates.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  const pay = this.payPerHour;
  return hoursWorkedOnDate.call(this, date) * pay;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(arr) {
  return arr.reduce(function (total, employee) {
    return total + allWagesFor.call(employee);
  }, 0);
}
