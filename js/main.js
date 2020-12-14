"use strict";

class Storage {
  static key = "data";

  save(name, data) {
    const current = this._getCurrent();
    current.push(data);
    localStorage.setItem(Storage.key, JSON.stringify(current));
  }

  getAll() {
    return this._getCurrent();
  }

  _getCurrent() {
    return JSON.parse(localStorage.getItem(Storage.key) || "[]");
  }
}

const storage = new Storage();

// a - ед.изм.вр, b - сколько. рез-т - время в минутах
let reduction = function (a, b) {
  switch (a) {
    case "minutes":
      b = b;
      break;
    case "hours":
      b *= 60;
      break;
    case "shift":
      b *= 60 * 8;
      break;
    case "days":
      b *= 60 * 8 * 2;
      break;
    case "quarter":
      b *= 60 * 8 * 2 * 4.5 * 5 * 3;
      break;
    case "year":
      b *= 60 * 8 * 2 * 4.5 * 5 * 3 * 4;
      break;
    default:
      console.error("Неизвестная ошибка");
  }
  return b;
};

// перевод минут в выбранное в отчете время
let simplifier = function (a, b) {
  switch (a) {
    case "minutes":
      b = b;
      break;
    case "hours":
      b /= 60;
      break;
    case "shift":
      b /= 60 / 8;
      break;
    case "days":
      b /= 60 / 8 / 2;
      break;
    case "quarter":
      b /= 60 / 8 / 2 / 4.5 / 5 / 3;
      break;
    case "year":
      b /= 60 / 8 / 2 / 4.5 / 5 / 3 / 4;
      break;
    default:
      console.error("Неизвестная ошибка");
  }
  return b;
};

let formatDate = function () {
  let date = new Date();
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleString("ru", options);
};

let flowItems = document.querySelectorAll(".data-area");

let addFlow = function (event) {
  event.preventDefault();
  let cloneFlowItem = flowItems[0].cloneNode(true);
  let itemArr = cloneFlowItem.querySelectorAll(".flow-input");
  itemArr.forEach(function (item) {
    item.value = "";
  });
  flowItems[0].parentNode.insertBefore(cloneFlowItem, btnPlus);
  flowItems = document.querySelectorAll(".data-area");
  if (flowItems.length === 10) {
    btnPlus.style.display = "none";
  }
};

let btnPlus = document.querySelector(".add-btn");

btnPlus.addEventListener("click", addFlow);

let btnSearch = document.querySelector(".search"),
  btnCloseModal = document.querySelector(".close");

let modalWindow = document.querySelector(".modal");

let modal = function () {
  modalWindow.classList.toggle("modal--opened");
};

// модалка для отчетов
let btnReport = document.querySelector(".show-btn"),
 btnCloseModalReport = document.querySelector(".close_report");
let modalWindowReport = document.querySelector(".modal_report");
let modalReport = function() {
  modalWindowReport.classList.toggle("modal--opened");
};

btnSearch.addEventListener("click", modal);
btnCloseModal.addEventListener("click", modal);
btnReport.addEventListener("click", modalReport);
btnCloseModalReport.addEventListener("click", modalReport);

let process = {
  processInfo: {},
  reportInfo: {},
};

let processName = document.querySelector(".process-input"),
  processTimeUnit = document.querySelector(".unit-choice"),
  processTimeBefore = document.getElementById("timeBefore"),
  processTimeAfter = document.getElementById("timeAfter");

let processDataTreatment = function () {
  let name = processName.value,
    timeUnit = processTimeUnit.value,
    timeBefore = processTimeBefore.value,
    timeAfter = processTimeAfter.value;
  process.processInfo.processData = {
    processName: name,
    processTimeUnit: timeUnit,
    processTimeBefore: timeBefore,
    processTimeAfter: timeAfter,
  };
  timeBefore = reduction(timeUnit, timeBefore);
  timeAfter = reduction(timeUnit, timeAfter);
  return [timeBefore, timeAfter];
};

let flowsDataTreatment = function () {
  let flowType, flowInfo, flowTimeUnit, flowFrequencyBefore, flowFrequencyAfter;
  let fullFlowsFrequencyBefore = 1;
  let fullFlowsFrequencyAfter = 1;
  process.processInfo.flowsData = [];
  flowItems.forEach(function (item) {
    flowType = item.querySelector(".flow-choice").value;
    flowInfo = item.querySelector(".flow-input").value;
    flowTimeUnit = item.querySelector(".time-choice").value;
    flowFrequencyBefore = item.querySelectorAll(".flow-input")[1].value;
    flowFrequencyAfter = item.querySelectorAll(".flow-input")[2].value;
    let flowDataObject = {
      flowType: flowType,
      flowInfo: flowInfo,
      flowTimeUnit: flowTimeUnit,
      flowFrequencyBefore: flowFrequencyBefore,
      flowFrequencyAfter: flowFrequencyAfter,
    };
    process.processInfo.flowsData.push(flowDataObject);
    flowFrequencyBefore = simplifier(flowTimeUnit, flowFrequencyBefore);
    flowFrequencyAfter = simplifier(flowTimeUnit, flowFrequencyAfter);
    fullFlowsFrequencyBefore *= flowFrequencyBefore;
    fullFlowsFrequencyAfter *= flowFrequencyAfter;
  });
  return [fullFlowsFrequencyBefore, fullFlowsFrequencyAfter];
};

let reportSettingsTreatment = function () {
  let periodValue = document.getElementById("period-value").value,
    periodTimeUnit = document.getElementById("gl-unit-select").value,
    reportTimeUnit = document.getElementById("gl-select").value,
    comment = document.getElementById("comment").value;
  process.reportInfo.reportSettings = {
    periodValue: periodValue,
    periodTimeUnit: periodTimeUnit,
    reportTimeUnit: reportTimeUnit,
    comment: comment,
  };
  periodValue = reduction(periodTimeUnit, periodValue);
  return [periodValue, reportTimeUnit];
};

let timeBefore = document.querySelector(".time-before"),
  timeAfter = document.querySelector(".time-after"),
  flowsFrequencyBefore = document.querySelector(".flows-frequency-before"),
  flowsFrequencyAfter = document.querySelector(".flows-frequency-after"),
  flowsQuantityBefore = document.querySelector(".flows-quantity-before"),
  flowsQuantityAfter = document.querySelector(".flows-quantity-after"),
  requiredTimeBefore = document.querySelector(".required-time-before"),
  requiredTimAfter = document.querySelector(".required-time-after"),
  result = document.querySelector(".result");

let createReportData = function () {
  let processTotalTime = processDataTreatment(),
    flowsTotalFrequency = flowsDataTreatment(),
    reportTotalPeriod = reportSettingsTreatment(),
    flowsTotalQuantityBefore = flowsTotalFrequency[0] * reportTotalPeriod[0],
    flowsTotalQuantityAfter = flowsTotalFrequency[1] * reportTotalPeriod[0],
    requiredTotalTimeBefore = flowsTotalQuantityBefore * processTotalTime[0],
    requiredTotalTimeAfter = flowsTotalQuantityBefore * processTotalTime[1],
    automationBenefits = requiredTotalTimeBefore - requiredTotalTimeAfter;
  let reportData = {
    processTimeBefore: simplifier(reportTotalPeriod[1], processTotalTime[0]),
    processTimeAfter: simplifier(reportTotalPeriod[1], processTotalTime[1]),
    flowsTotalFrequencyBefore: flowsTotalFrequency[0],
    flowsTotalFrequencyAfter: flowsTotalFrequency[1],
    reportPeriod: simplifier(reportTotalPeriod[1], reportTotalPeriod[0]),
    reportTimeUnit: reportTotalPeriod[1],
    flowsTotalQuantityBefore: flowsTotalQuantityBefore,
    flowsTotalQuantityAfter: flowsTotalQuantityAfter,
    requiredTotalTimeBefore: simplifier(
      reportTotalPeriod[1],
      requiredTotalTimeBefore
    ),
    requiredTotalTimeAfter: simplifier(
      reportTotalPeriod[1],
      requiredTotalTimeAfter
    ),
    automationBenefits: simplifier(reportTotalPeriod[1], automationBenefits),
  };
  timeBefore.textContent = Math.floor(reportData.processTimeBefore);
  timeAfter.textContent = Math.floor(reportData.processTimeAfter);
  flowsFrequencyBefore.textContent = Math.floor(
    reportData.flowsTotalFrequencyBefore
  );
  flowsFrequencyAfter.textContent = Math.floor(
    reportData.flowsTotalFrequencyAfter
  );
  flowsQuantityBefore.textContent = Math.floor(
    reportData.flowsTotalQuantityBefore
  );
  flowsQuantityAfter.textContent = Math.floor(
    reportData.flowsTotalQuantityAfter
  );
  requiredTimeBefore.textContent = Math.floor(
    reportData.requiredTotalTimeBefore
  );
  requiredTimAfter.textContent = Math.floor(reportData.requiredTotalTimeAfter);
  result.textContent = Math.floor(reportData.automationBenefits);

  process.reportInfo.reportData = {
    comment: process.reportInfo.reportSettings.comment,
    reportDataValues: reportData,
  };
};

let dataInput = document.querySelector(".data-input");
dataInput.addEventListener("submit", function (event) {
  event.preventDefault();
  createReportData();
  showNameForm();
});

function showNameForm() {
  if (
    !Object.keys(process.reportInfo).length ||
    !Object.keys(process.processInfo).length
  ) {
    return;
  }

  const nameForm = document.querySelector(".name-form");
  const nameInput = nameForm.querySelector("input");
  nameForm.classList.add("name-form__visible");

  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveReportData(nameInput.value);
  });
}

function saveReportData(name) {
  const savedProcess = { ...process };
  savedProcess.date = formatDate();
  savedProcess.name = name;

  storage.save(name, savedProcess);
}

let reportBlock = document.querySelectorAll(".report-block");

let showAllBlocks = function () {
  const data = storage.getAll();
  let cloneReportBlock;
  for (let i = 0; i < data.length - 1; i++) {
    cloneReportBlock = reportBlock[i].cloneNode(true);
    reportBlock[i].after(cloneReportBlock);
    reportBlock = document.querySelectorAll(".report-block");
  }
  console.log(reportBlock.length);
  let i = 0;
  for (const info in data) {
    // let commentValue = data[info].reportInfo.reportData;
    // console.log('commentValue: ', commentValue);
    let textValue = `${data[info]} от ${info}`;
    textValue = textValue.trim();
    // let textValueLength = textValue.length;
    if (textValue.length > 30) {
      textValue = textValue.substr(0, 30) + "... ";
    }
    console.log(reportBlock[i]);
    while (i < data.length - 1) {
      reportBlock[i].querySelector(".report-data").textContent = textValue;
      i++;
    }
  }
};

showAllBlocks();
