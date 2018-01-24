/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var print_1 = __webpack_require__(3);
"use strict";
var jobs = document.getElementById("jobs");
// watch job table and wait for user to click arrow
// then generate a child rows with associated data
jobs.addEventListener("click", function (event) {
    var arrow = event.target;
    if ((arrow.tagName === "span" || arrow.tagName === "SPAN") && arrow.getAttribute("data-id") !== null) {
        var printTable = document.querySelector("tr.prints-row[data-job-id='" + arrow.getAttribute("data-id") + "']");
        if (arrow.getAttribute("data-clicked") === "false" && printTable !== null) {
            arrow.setAttribute("data-clicked", "true");
            arrow.setAttribute("class", "fa fa-chevron-up table-dropdown");
            printTable.setAttribute("class", "prints-row print-row");
        }
        else {
            arrow.setAttribute("data-clicked", "false");
            arrow.setAttribute("class", "fa fa-chevron-down table-dropdown");
            printTable.setAttribute("class", "print-row-hidden prints-row");
        }
    }
});
// take the prints related to a job and populate a hidden table
// with print information for 3d models
function addPrints(prints) {
    var printRow = document.createElement("tr");
    var printContainer = document.createElement("td");
    var printsTable = document.createElement("table");
    var printsHead = document.createElement("thead");
    var printsBody = document.createElement("tbody");
    printRow.setAttribute("class", "print-row-hidden prints-row");
    printRow.setAttribute("data-hidden", "false");
    // tables inside of a table are only valid inside a <td> so create one
    printContainer.setAttribute("class", "print-container");
    printContainer.setAttribute("colspan", "6");
    printsTable.setAttribute("class", "prints-table");
    var nameHead = document.createElement("th");
    var sizeHead = document.createElement("th");
    var filamentHead = document.createElement("th");
    var fileHead = document.createElement("th");
    var approved = document.createElement("th");
    var statusHead = document.createElement("th");
    nameHead.innerHTML = "Filename";
    nameHead.setAttribute("class", "letter");
    sizeHead.innerHTML = "File Size";
    sizeHead.setAttribute("class", "number");
    filamentHead.innerHTML = "Filament Type";
    filamentHead.setAttribute("class", "table-controls");
    fileHead.innerHTML = "Options";
    approved.innerHTML = "Approved";
    statusHead.innerHTML = "Status";
    printsHead.appendChild(nameHead);
    printsHead.appendChild(sizeHead);
    printsHead.appendChild(filamentHead);
    printsHead.appendChild(fileHead);
    printsHead.appendChild(approved);
    printsHead.appendChild(statusHead);
    for (var i = 0; i < prints.length; i++) {
        var print_2 = new print_1.Print(prints[i]);
        print_2.generateOptions();
        print_2.formatStatus();
        print_2.generate();
        printsBody.appendChild(print_2.row);
    }
    printsTable.appendChild(printsHead);
    printsTable.appendChild(printsBody);
    printContainer.appendChild(printsTable);
    printRow.appendChild(printContainer);
    return printRow;
}
function generateTable(data) {
    var jobs = document.getElementById("jobsList");
    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");
        var id = document.createElement("td");
        var name_1 = document.createElement("td");
        var numOfPrints = document.createElement("td");
        var completed = document.createElement("td");
        var completedIcon = document.createElement("i");
        var options = document.createElement("td");
        var downloadAllButton = document.createElement("span");
        var downloadAllIcon = document.createElement("span");
        var deleteButton = document.createElement("span");
        var deleteIcon = document.createElement("span");
        options.setAttribute("class", "table-controls");
        downloadAllButton.setAttribute("class", "table-button-secondary");
        downloadAllButton.setAttribute("title", "Download as ZIP");
        downloadAllIcon.setAttribute("class", "fa fa-file-archive-o");
        downloadAllButton.appendChild(downloadAllIcon);
        deleteButton.setAttribute("data-id", data[i]["id"]);
        deleteButton.setAttribute("class", "table-button danger");
        deleteButton.setAttribute("title", "Delete Job");
        deleteIcon.setAttribute("class", "fa fa-trash");
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            var deleteJob = new XMLHttpRequest();
            var button = event.target;
            var jobId = button.getAttribute("data-id");
            var options = button.parentNode;
            var row = options.parentNode;
            deleteJob.open("DELETE", "jobs/" + jobId);
            deleteJob.addEventListener("readyStateChange", function () {
                if (deleteJob.readyState == XMLHttpRequest.DONE && deleteJob.status == 200) {
                }
                else if (deleteJob.readyState == XMLHttpRequest.DONE && deleteJob.status == 500) {
                }
            }, false);
            deleteJob.send();
            row.remove();
        }, false);
        options.appendChild(downloadAllButton);
        options.appendChild(deleteButton);
        var arrow = document.createElement("td");
        var arrowIcon = document.createElement("span");
        row.setAttribute("class", "job-table");
        id.innerHTML = data[i]["id"];
        id.setAttribute("class", "table-controls");
        name_1.innerHTML = data[i]["name"];
        numOfPrints.innerHTML = data[i]["prints_data"].length;
        numOfPrints.setAttribute("class", "number");
        completedIcon.setAttribute("class", "fa fa-close controls");
        if (data[i]["completed"] === "true") {
            completed.appendChild(completedIcon);
        }
        else {
            completed.appendChild(completedIcon);
        }
        completed.setAttribute("class", "table-controls");
        arrow.setAttribute("class", "table-controls");
        arrowIcon.setAttribute("data-id", data[i]["id"]);
        arrowIcon.setAttribute("class", "fa fa-chevron-down table-dropdown");
        arrowIcon.setAttribute("data-clicked", "false");
        arrow.appendChild(arrowIcon);
        var prints = addPrints(data[i]["prints_data"]);
        prints.setAttribute("data-job-id", data[i]["id"]);
        row.appendChild(id);
        row.appendChild(name_1);
        row.appendChild(numOfPrints);
        row.appendChild(completed);
        row.appendChild(options);
        row.appendChild(arrow);
        jobs.appendChild(row);
        jobs.appendChild(prints);
    }
}
var getPrintInfo = function (url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            callback(req.responseText);
        }
    };
    req.open("GET", url, true);
    req.send();
};
getPrintInfo("/jobs", function (data) {
    var json = JSON.parse(data);
    generateTable(json);
});


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.formatFileSize = function (bytes) {
        var exp = Math.log(bytes) / Math.log(1024) | 0;
        var result = (bytes / Math.pow(1024, exp)).toFixed(2);
        var unit = exp == 0 ? 'bytes' : 'KMGTPEZY'[exp - 1] + 'B';
        return result + " " + unit;
    };
    return Helper;
}());
exports.Helper = Helper;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = __webpack_require__(2);
var overlay_1 = __webpack_require__(4);
var Print = /** @class */ (function () {
    function Print(printInfo) {
        var _this = this;
        this.generateOptions = function () {
            var downloadLink = document.createElement("a");
            var downloadIcon = document.createElement("i");
            var queueAdd = document.createElement("span");
            var queueIcon = document.createElement("span");
            var deleteButton = document.createElement("span");
            var deleteButtonIcon = document.createElement("span");
            _this.options.setAttribute("class", "table-controls");
            queueAdd.setAttribute("class", "table-button-secondary");
            queueAdd.setAttribute("title", "Add to Queue");
            queueAdd.addEventListener("click", function (event) {
                var overlay = new overlay_1.Overlay("Add to Queue");
                overlay.generateModal();
                overlay.create();
            }, false);
            queueIcon.setAttribute("class", "fa fa-plus-circle");
            queueAdd.appendChild(queueIcon);
            downloadLink.setAttribute("href", _this.printInfo["relative_path"]);
            downloadLink.setAttribute("download", _this.printInfo["filename"]);
            downloadLink.setAttribute("class", "download-link table-button-primary");
            downloadIcon.setAttribute("class", "fa fa-download");
            downloadLink.setAttribute("title", "Download File");
            downloadLink.appendChild(downloadIcon);
            deleteButton.setAttribute("class", "table-button danger");
            deleteButton.setAttribute("data-id", _this.printInfo["id"]);
            deleteButton.setAttribute("title", "Delete Print");
            deleteButtonIcon.setAttribute("class", "fa fa-trash");
            deleteButton.appendChild(deleteButtonIcon);
            _this.options.appendChild(queueAdd);
            _this.options.appendChild(downloadLink);
            _this.options.appendChild(deleteButton);
        };
        this.printInfo = printInfo;
        this.row = document.createElement("tr");
        this.filename = document.createElement("td");
        this.fileSize = document.createElement("td");
        this.filament = document.createElement("td");
        this.options = document.createElement("td");
        this.currentStatus = document.createElement("td");
        this.completed = document.createElement("td");
        this.filename.innerHTML = this.printInfo["filename"];
        this.fileSize.setAttribute("class", "number");
        this.fileSize.innerHTML = helper_1.Helper.formatFileSize(this.printInfo["filesize"]);
        this.filament.setAttribute("class", "table-controls");
        this.filament.innerHTML = this.printInfo["filament"];
    }
    Print.prototype.formatStatus = function () {
        this.currentStatus.setAttribute("class", "table-controls");
        switch (this.printInfo["status"]) {
            case 1:
                this.currentStatus.innerHTML = "Ready to Print";
                break;
            case 2:
                this.currentStatus.innerHTML = "In Queue";
                break;
            case 3:
                this.currentStatus.innerHTML = "Printing";
                break;
            case 4:
                this.currentStatus.innerHTML = "Printed";
                break;
            case 5:
                this.currentStatus.innerHTML = "Picked up";
                break;
            default:
                this.currentStatus.setAttribute("class", "status-message danger-message table-controls");
                this.currentStatus.innerHTML = "Not Approved";
                break;
        }
    };
    Print.prototype.generate = function () {
        this.row.appendChild(this.filename);
        this.row.appendChild(this.fileSize);
        this.row.appendChild(this.filament);
        this.row.appendChild(this.options);
        this.row.appendChild(this.completed);
        this.row.appendChild(this.currentStatus);
    };
    return Print;
}());
exports.Print = Print;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Overlay = /** @class */ (function () {
    function Overlay(title) {
        var _this = this;
        this.generateModal = function () {
            var modalTitleHeader = document.createElement("div");
            var modalTitle = document.createElement("div");
            var form = document.createElement("form");
            var fieldset = document.createElement("fieldset");
            modalTitle.innerHTML = _this.title;
            modalTitleHeader.appendChild(modalTitle);
            _this.modal.appendChild(modalTitleHeader);
        };
        this.create = function () {
            var body = document.getElementById("dashboard");
            _this.overlay.style.visibility = (_this.overlay.style.visibility === "visible") ? "hidden" : "visible";
            _this.overlay.appendChild(_this.modal);
            body.appendChild(_this.overlay);
        };
        this.title = title;
        this.modal = document.createElement("div");
        this.modal.setAttribute("class", "modal");
        this.overlay = document.createElement("div");
        this.overlay.setAttribute("id", "overlay");
    }
    return Overlay;
}());
exports.Overlay = Overlay;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDk2MjU2ODAyYzAwNDQ5MmQwOTciLCJ3ZWJwYWNrOi8vLy4vdHMvZGFzaGJvYXJkLnRzIiwid2VicGFjazovLy8uL3RzL2hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi90cy9wcmludC50cyIsIndlYnBhY2s6Ly8vLi90cy9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQy9EQSxxQ0FBZ0M7QUFFaEMsWUFBWSxDQUFDO0FBRWIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QyxtREFBbUQ7QUFDbkQsa0RBQWtEO0FBQ2xELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLO0lBQ25DLElBQU0sS0FBSyxHQUFvQixLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFD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QUFPLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBdEJDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBa0JILGNBQUM7QUFBRCxDQUFDO0FBN0JZLDBCQUFPIiwiZmlsZSI6InB1YmxpYy9qcy9kYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA5NjI1NjgwMmMwMDQ0OTJkMDk3IiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQgeyBQcmludCB9IGZyb20gXCIuL3ByaW50XCI7XG5cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBqb2JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2JzXCIpO1xuXG4vLyB3YXRjaCBqb2IgdGFibGUgYW5kIHdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgYXJyb3dcbi8vIHRoZW4gZ2VuZXJhdGUgYSBjaGlsZCByb3dzIHdpdGggYXNzb2NpYXRlZCBkYXRhXG5qb2JzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgY29uc3QgYXJyb3cgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgaWYgKChhcnJvdy50YWdOYW1lID09PSBcInNwYW5cIiB8fCBhcnJvdy50YWdOYW1lID09PSBcIlNQQU5cIikgJiYgYXJyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHByaW50VGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidHIucHJpbnRzLXJvd1tkYXRhLWpvYi1pZD0nXCIgKyBhcnJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpICsgXCInXVwiKTtcbiAgICBpZiAoYXJyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIpID09PSBcImZhbHNlXCIgJiYgcHJpbnRUYWJsZSAhPT0gbnVsbCkge1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIgLFwidHJ1ZVwiKTtcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi11cCB0YWJsZS1kcm9wZG93blwiKTtcbiAgICAgIHByaW50VGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludHMtcm93IHByaW50LXJvd1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNoZXZyb24tZG93biB0YWJsZS1kcm9wZG93blwiKVxuICAgICAgcHJpbnRUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50LXJvdy1oaWRkZW4gcHJpbnRzLXJvd1wiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyB0YWtlIHRoZSBwcmludHMgcmVsYXRlZCB0byBhIGpvYiBhbmQgcG9wdWxhdGUgYSBoaWRkZW4gdGFibGVcbi8vIHdpdGggcHJpbnQgaW5mb3JtYXRpb24gZm9yIDNkIG1vZGVsc1xuZnVuY3Rpb24gYWRkUHJpbnRzKHByaW50czogYW55KSA6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICBjb25zdCBwcmludFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgY29uc3QgcHJpbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIGNvbnN0IHByaW50c1RhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBjb25zdCBwcmludHNIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xuICBjb25zdCBwcmludHNCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuXG4gIHByaW50Um93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnQtcm93LWhpZGRlbiBwcmludHMtcm93XCIpO1xuICBwcmludFJvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuICAvLyB0YWJsZXMgaW5zaWRlIG9mIGEgdGFibGUgYXJlIG9ubHkgdmFsaWQgaW5zaWRlIGEgPHRkPiBzbyBjcmVhdGUgb25lXG4gIFxuICBwcmludENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50LWNvbnRhaW5lclwiKTtcbiAgcHJpbnRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY29sc3BhblwiLCBcIjZcIik7XG4gIHByaW50c1RhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnRzLXRhYmxlXCIpO1xuXG4gIGNvbnN0IG5hbWVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBjb25zdCBzaXplSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgY29uc3QgZmlsYW1lbnRIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBjb25zdCBmaWxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgY29uc3QgYXBwcm92ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIGNvbnN0IHN0YXR1c0hlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG5cbiAgbmFtZUhlYWQuaW5uZXJIVE1MID0gXCJGaWxlbmFtZVwiO1xuICBuYW1lSGVhZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxldHRlclwiKTtcblxuICBzaXplSGVhZC5pbm5lckhUTUwgPSBcIkZpbGUgU2l6ZVwiO1xuICBzaXplSGVhZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm51bWJlclwiKTtcblxuICBmaWxhbWVudEhlYWQuaW5uZXJIVE1MID0gXCJGaWxhbWVudCBUeXBlXCI7XG4gIGZpbGFtZW50SGVhZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuXG4gIGZpbGVIZWFkLmlubmVySFRNTCA9IFwiT3B0aW9uc1wiO1xuICBhcHByb3ZlZC5pbm5lckhUTUwgPSBcIkFwcHJvdmVkXCI7XG4gIHN0YXR1c0hlYWQuaW5uZXJIVE1MID0gXCJTdGF0dXNcIjtcblxuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKG5hbWVIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChzaXplSGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoZmlsYW1lbnRIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChmaWxlSGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoYXBwcm92ZWQpO1xuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKHN0YXR1c0hlYWQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJpbnQgPSBuZXcgUHJpbnQocHJpbnRzW2ldKTtcbiAgICBwcmludC5nZW5lcmF0ZU9wdGlvbnMoKTtcbiAgICBwcmludC5mb3JtYXRTdGF0dXMoKTtcbiAgICBwcmludC5nZW5lcmF0ZSgpO1xuICAgIHByaW50c0JvZHkuYXBwZW5kQ2hpbGQocHJpbnQucm93KTtcbiAgfVxuXG4gIHByaW50c1RhYmxlLmFwcGVuZENoaWxkKHByaW50c0hlYWQpO1xuICBwcmludHNUYWJsZS5hcHBlbmRDaGlsZChwcmludHNCb2R5KTtcbiAgcHJpbnRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJpbnRzVGFibGUpO1xuICBwcmludFJvdy5hcHBlbmRDaGlsZChwcmludENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHByaW50Um93O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlKGRhdGE6IGFueSkge1xuICBjb25zdCBqb2JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2JzTGlzdFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIGNvbnN0IGlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgY29uc3QgbnVtT2ZQcmludHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgY29uc3QgY29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IGNvbXBsZXRlZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IGRvd25sb2FkQWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3QgZG93bmxvYWRBbGxJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgb3B0aW9ucy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuXG4gICAgZG93bmxvYWRBbGxCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1idXR0b24tc2Vjb25kYXJ5XCIpO1xuICAgIGRvd25sb2FkQWxsQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiRG93bmxvYWQgYXMgWklQXCIpXG4gICAgZG93bmxvYWRBbGxJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtZmlsZS1hcmNoaXZlLW9cIik7XG4gICAgZG93bmxvYWRBbGxCdXR0b24uYXBwZW5kQ2hpbGQoZG93bmxvYWRBbGxJY29uKTtcblxuICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGRhdGFbaV1bXCJpZFwiXSk7XG4gICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtYnV0dG9uIGRhbmdlclwiKTtcbiAgICBkZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJEZWxldGUgSm9iXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS10cmFzaFwiKTtcbiAgICBkZWxldGVCdXR0b24uYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBkZWxldGVKb2I6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICBjb25zdCBidXR0b24gPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3Qgam9iSWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSA8SFRNTEVsZW1lbnQ+YnV0dG9uLnBhcmVudE5vZGU7XG4gICAgICBjb25zdCByb3cgPSA8SFRNTEVsZW1lbnQ+b3B0aW9ucy5wYXJlbnROb2RlO1xuXG4gICAgICBkZWxldGVKb2Iub3BlbihcIkRFTEVURVwiLCBgam9icy8ke2pvYklkfWApO1xuICAgICAgZGVsZXRlSm9iLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeVN0YXRlQ2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGRlbGV0ZUpvYi5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgZGVsZXRlSm9iLnN0YXR1cyA9PSAyMDApIHtcblxuICAgICAgICB9IGVsc2UgaWYgKGRlbGV0ZUpvYi5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgZGVsZXRlSm9iLnN0YXR1cyA9PSA1MDApIHtcblxuICAgICAgICB9XG4gICAgICB9LCBmYWxzZSk7XG4gICAgICBkZWxldGVKb2Iuc2VuZCgpO1xuICAgICAgcm93LnJlbW92ZSgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZG93bmxvYWRBbGxCdXR0b24pO1xuICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICBcbiAgICBjb25zdCBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICBjb25zdCBhcnJvd0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImpvYi10YWJsZVwiKTtcbiAgICBpZC5pbm5lckhUTUwgPSBkYXRhW2ldW1wiaWRcIl07XG4gICAgaWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBuYW1lLmlubmVySFRNTCA9IGRhdGFbaV1bXCJuYW1lXCJdO1xuICAgIG51bU9mUHJpbnRzLmlubmVySFRNTCA9IGRhdGFbaV1bXCJwcmludHNfZGF0YVwiXS5sZW5ndGg7XG4gICAgbnVtT2ZQcmludHMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJudW1iZXJcIik7XG4gICAgY29tcGxldGVkSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNsb3NlIGNvbnRyb2xzXCIpO1xuXG4gICAgaWYgKGRhdGFbaV1bXCJjb21wbGV0ZWRcIl0gPT09IFwidHJ1ZVwiKSB7XG4gICAgICBjb21wbGV0ZWQuYXBwZW5kQ2hpbGQoY29tcGxldGVkSWNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBsZXRlZC5hcHBlbmRDaGlsZChjb21wbGV0ZWRJY29uKTtcbiAgICB9XG4gICAgY29tcGxldGVkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG5cblxuICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgZGF0YVtpXVtcImlkXCJdKTtcbiAgICBhcnJvd0ljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1jaGV2cm9uLWRvd24gdGFibGUtZHJvcGRvd25cIik7XG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgIGFycm93LmFwcGVuZENoaWxkKGFycm93SWNvbik7XG5cbiAgICBjb25zdCBwcmludHMgPSBhZGRQcmludHMoZGF0YVtpXVtcInByaW50c19kYXRhXCJdKTtcbiAgICBwcmludHMuc2V0QXR0cmlidXRlKFwiZGF0YS1qb2ItaWRcIiwgZGF0YVtpXVtcImlkXCJdKTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChpZCk7XG4gICAgcm93LmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChudW1PZlByaW50cyk7XG4gICAgcm93LmFwcGVuZENoaWxkKGNvbXBsZXRlZCk7XG4gICAgcm93LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChhcnJvdyk7XG4gICAgam9icy5hcHBlbmRDaGlsZChyb3cpO1xuICAgIGpvYnMuYXBwZW5kQ2hpbGQocHJpbnRzKTtcblxuICB9XG59XG5cbmNvbnN0IGdldFByaW50SW5mbyA9ICh1cmw6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBzdHJpbmcpID0+IGFueSkgOiB2b2lkID0+IHtcbiAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgaWYgKHJlcS5yZWFkeVN0YXRlID09PSA0ICYmIHJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgY2FsbGJhY2socmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgfVxuICB9XG4gIHJlcS5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG4gIHJlcS5zZW5kKCk7XG59XG5cbmdldFByaW50SW5mbyhcIi9qb2JzXCIsIChkYXRhKSA9PiB7XG4gIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xuICBnZW5lcmF0ZVRhYmxlKGpzb24pO1xufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL2Rhc2hib2FyZC50cyIsImV4cG9ydCBjbGFzcyBIZWxwZXIge1xuICBwdWJsaWMgc3RhdGljIGZvcm1hdEZpbGVTaXplKGJ5dGVzOiBhbnkpIHtcbiAgICBjb25zdCBleHAgPSBNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSB8IDA7XG4gICAgY29uc3QgcmVzdWx0ID0gKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgZXhwKSkudG9GaXhlZCgyKTtcbiAgICBjb25zdCB1bml0ID0gZXhwID09IDAgPyAnYnl0ZXMnOiAnS01HVFBFWlknW2V4cCAtIDFdICsgJ0InO1xuICAgIHJldHVybiBgJHtyZXN1bHR9ICR7dW5pdH1gIDtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL2hlbHBlci50cyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL2hlbHBlclwiO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gXCIuL292ZXJsYXlcIjtcblxuZXhwb3J0IGNsYXNzIFByaW50IHtcbiAgcHVibGljIHJvdzogSFRNTFRhYmxlUm93RWxlbWVudDtcbiAgcHVibGljIHByaW50SW5mbzogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBmaWxlbmFtZTogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBmaWxlU2l6ZTogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBmaWxhbWVudDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBvcHRpb25zOiBIVE1MVGFibGVDZWxsRWxlbWVudDtcbiAgcHVibGljIGN1cnJlbnRTdGF0dXM7XG4gIHB1YmxpYyBjb21wbGV0ZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpbnRJbmZvOiBhbnkpIHtcbiAgICB0aGlzLnByaW50SW5mbyA9IHByaW50SW5mbztcbiAgICB0aGlzLnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB0aGlzLmZpbGVuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHRoaXMuZmlsZVNpemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdGhpcy5maWxhbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdGhpcy5jdXJyZW50U3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHRoaXMuY29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG4gICAgdGhpcy5maWxlbmFtZS5pbm5lckhUTUwgPSB0aGlzLnByaW50SW5mb1tcImZpbGVuYW1lXCJdO1xuICAgIHRoaXMuZmlsZVNpemUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJudW1iZXJcIik7XG4gICAgdGhpcy5maWxlU2l6ZS5pbm5lckhUTUwgPSBIZWxwZXIuZm9ybWF0RmlsZVNpemUodGhpcy5wcmludEluZm9bXCJmaWxlc2l6ZVwiXSk7XG4gICAgdGhpcy5maWxhbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuICAgIHRoaXMuZmlsYW1lbnQuaW5uZXJIVE1MID0gdGhpcy5wcmludEluZm9bXCJmaWxhbWVudFwiXTtcbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZU9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgZG93bmxvYWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgY29uc3QgcXVldWVBZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBxdWV1ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICB0aGlzLm9wdGlvbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBxdWV1ZUFkZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWJ1dHRvbi1zZWNvbmRhcnlcIik7XG4gICAgcXVldWVBZGQuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJBZGQgdG8gUXVldWVcIilcbiAgICBxdWV1ZUFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgY29uc3Qgb3ZlcmxheSA9IG5ldyBPdmVybGF5KFwiQWRkIHRvIFF1ZXVlXCIpO1xuICAgICAgb3ZlcmxheS5nZW5lcmF0ZU1vZGFsKCk7XG4gICAgICBvdmVybGF5LmNyZWF0ZSgpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBxdWV1ZUljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1wbHVzLWNpcmNsZVwiKTtcbiAgICBxdWV1ZUFkZC5hcHBlbmRDaGlsZChxdWV1ZUljb24pO1xuXG4gICAgZG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdGhpcy5wcmludEluZm9bXCJyZWxhdGl2ZV9wYXRoXCJdKTtcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgdGhpcy5wcmludEluZm9bXCJmaWxlbmFtZVwiXSk7XG4gICAgZG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZG93bmxvYWQtbGluayB0YWJsZS1idXR0b24tcHJpbWFyeVwiKTtcbiAgICBkb3dubG9hZEljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1kb3dubG9hZFwiKTtcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJEb3dubG9hZCBGaWxlXCIpO1xuICAgIGRvd25sb2FkTGluay5hcHBlbmRDaGlsZChkb3dubG9hZEljb24pO1xuICAgIFxuICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWJ1dHRvbiBkYW5nZXJcIik7XG4gICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgdGhpcy5wcmludEluZm9bXCJpZFwiXSk7XG4gICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiRGVsZXRlIFByaW50XCIpO1xuICAgIGRlbGV0ZUJ1dHRvbkljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS10cmFzaFwiKTtcbiAgICBkZWxldGVCdXR0b24uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uSWNvbik7XG4gICAgdGhpcy5vcHRpb25zLmFwcGVuZENoaWxkKHF1ZXVlQWRkKTtcbiAgICB0aGlzLm9wdGlvbnMuYXBwZW5kQ2hpbGQoZG93bmxvYWRMaW5rKTtcbiAgICB0aGlzLm9wdGlvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXRTdGF0dXMoKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdHVzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG4gICAgc3dpdGNoICh0aGlzLnByaW50SW5mb1tcInN0YXR1c1wiXSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0dXMuaW5uZXJIVE1MID0gXCJSZWFkeSB0byBQcmludFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdHVzLmlubmVySFRNTCA9IFwiSW4gUXVldWVcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXR1cy5pbm5lckhUTUwgPSBcIlByaW50aW5nXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0dXMuaW5uZXJIVE1MID0gXCJQcmludGVkXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0dXMuaW5uZXJIVE1MID0gXCJQaWNrZWQgdXBcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0dXMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGF0dXMtbWVzc2FnZSBkYW5nZXItbWVzc2FnZSB0YWJsZS1jb250cm9sc1wiKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdHVzLmlubmVySFRNTCA9IFwiTm90IEFwcHJvdmVkXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZSgpIHtcbiAgICB0aGlzLnJvdy5hcHBlbmRDaGlsZCh0aGlzLmZpbGVuYW1lKTtcbiAgICB0aGlzLnJvdy5hcHBlbmRDaGlsZCh0aGlzLmZpbGVTaXplKTtcbiAgICB0aGlzLnJvdy5hcHBlbmRDaGlsZCh0aGlzLmZpbGFtZW50KTtcbiAgICB0aGlzLnJvdy5hcHBlbmRDaGlsZCh0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMucm93LmFwcGVuZENoaWxkKHRoaXMuY29tcGxldGVkKTtcbiAgICB0aGlzLnJvdy5hcHBlbmRDaGlsZCh0aGlzLmN1cnJlbnRTdGF0dXMpO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvcHJpbnQudHMiLCJleHBvcnQgY2xhc3MgT3ZlcmxheSB7XG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICBwdWJsaWMgb3ZlcmxheTtcbiAgcHVibGljIG1vZGFsO1xuXG4gIGNvbnN0cnVjdG9yKHRpdGxlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5tb2RhbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1vZGFsXCIpO1xuICAgIHRoaXMub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5vdmVybGF5LnNldEF0dHJpYnV0ZShcImlkXCIsIFwib3ZlcmxheVwiKTtcbiAgfVxuXG4gIHB1YmxpYyBnZW5lcmF0ZU1vZGFsID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGFsVGl0bGVIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBjb25zdCBmaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgICBtb2RhbFRpdGxlLmlubmVySFRNTCA9IHRoaXMudGl0bGU7XG4gICAgbW9kYWxUaXRsZUhlYWRlci5hcHBlbmRDaGlsZChtb2RhbFRpdGxlKTtcbiAgICB0aGlzLm1vZGFsLmFwcGVuZENoaWxkKG1vZGFsVGl0bGVIZWFkZXIpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXNoYm9hcmRcIik7XG4gICAgdGhpcy5vdmVybGF5LnN0eWxlLnZpc2liaWxpdHkgPSAodGhpcy5vdmVybGF5LnN0eWxlLnZpc2liaWxpdHkgPT09IFwidmlzaWJsZVwiKSA/IFwiaGlkZGVuXCIgOiBcInZpc2libGVcIjtcbiAgICB0aGlzLm92ZXJsYXkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbClcbiAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9vdmVybGF5LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==