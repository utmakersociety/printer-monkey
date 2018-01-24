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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = __webpack_require__(2);
var overlay_1 = __webpack_require__(3);
var Print = /** @class */ (function () {
    function Print(printInfo) {
        var _this = this;
        this.addOptions = function () {
            var downloadLink = document.createElement("a");
            var downloadIcon = document.createElement("i");
            var queueAdd = document.createElement("span");
            var queueIcon = document.createElement("span");
            var deleteButton = document.createElement("span");
            var deleteButtonIcon = document.createElement("span");
            _this.options.setAttribute("class", "table-controls");
            // create a queue button for each print and then add an click event listener
            // with an overlay instance that will be removed when closed
            queueAdd.setAttribute("class", "table-button-secondary");
            queueAdd.setAttribute("title", "Add to Queue");
            queueAdd.addEventListener("click", function (event) {
                var overlay = new overlay_1.QueueModal("Add to Queue");
                overlay.generateModal();
                overlay.generateForm();
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
        // set initalize some properties and set table cells that won't be changed much
        // but might need to be seperated at a later date
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
        // TODO: Add other status colors
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var print_1 = __webpack_require__(0);
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
        print_2.addOptions();
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.formatFileSize = function (bytes) {
        // using the inputed bytes find out what unit to use and store this for later
        var exp = Math.log(bytes) / Math.log(1024) | 0;
        // simplify bytes into proper unit numbers
        var result = (bytes / Math.pow(1024, exp)).toFixed(2);
        // using exp format the unit from a string
        var unit = exp === 0 ? 'bytes' : 'KMGTPEZY'[exp - 1] + 'B';
        return result + " " + unit;
    };
    return Helper;
}());
exports.Helper = Helper;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Overlay = /** @class */ (function () {
    function Overlay(title) {
        this.title = title;
        this.modal = document.createElement("div");
        this.modal.setAttribute("class", "modal");
        this.overlay = document.createElement("div");
        this.overlay.setAttribute("id", "overlay");
    }
    Overlay.prototype.generateModal = function () {
        var _this = this;
        var modalHeader = document.createElement("div");
        var modalTitle = document.createElement("div");
        var modalClose = document.createElement("div");
        var close = document.createElement("span");
        modalHeader.setAttribute("class", "grid modal-header");
        modalTitle.setAttribute("class", "grid-cell grid-1-2 modal-title");
        modalTitle.innerHTML = this.title;
        modalClose.setAttribute("class", "grid-cell grid-1-2 modal-close");
        close.setAttribute("class", "fa fa-times");
        close.addEventListener("click", function () {
            _this.overlay.remove();
        }, false);
        modalClose.appendChild(close);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(modalClose);
        this.modal.appendChild(modalHeader);
    };
    Overlay.prototype.create = function () {
        var body = document.getElementById("dashboard");
        this.overlay.style.visibility = (this.overlay.style.visibility === "visible") ? "hidden" : "visible";
        this.overlay.appendChild(this.modal);
        body.appendChild(this.overlay);
    };
    return Overlay;
}());
exports.Overlay = Overlay;
var QueueModal = /** @class */ (function (_super) {
    __extends(QueueModal, _super);
    function QueueModal(title) {
        var _this = _super.call(this, title) || this;
        _this.generateForm = function () {
            var form = document.createElement("form");
            var fieldset = document.createElement("fieldset");
            var selectContainer = document.createElement("div");
            var selectOne = document.createElement("div");
            var selectTwo = document.createElement("div");
            var printerTitle = document.createElement("title");
            var selectPrinter = document.createElement("select");
            var printer = document.createElement("option");
            var daysContainer = document.createElement("div");
            var hoursContainer = document.createElement("div");
            var minContainer = document.createElement("div");
            var daysTitle = document.createElement("title");
            var hoursTitle = document.createElement("title");
            var minTitle = document.createElement("title");
            var selectDays = document.createElement("select");
            var selectHours = document.createElement("select");
            var selectMin = document.createElement("select");
            form.setAttribute("class", "modal-form");
            selectContainer.setAttribute("class", "modal-form-control grid");
            printer.innerHTML = "Printer 1";
            printerTitle.innerHTML = "Select a Printer";
            selectOne.setAttribute("class", "grid-cell grid-1-2");
            selectPrinter.appendChild(printer);
            selectOne.appendChild(printerTitle);
            selectOne.appendChild(selectPrinter);
            selectTwo.setAttribute("class", "grid-cell grid-1-2 grid");
            daysContainer.setAttribute("class", "grid-cell grid-1-3");
            daysContainer.setAttribute("style", "text-align: right");
            hoursContainer.setAttribute("class", "grid-cell grid-1-3");
            hoursContainer.setAttribute("style", "text-align: center");
            minContainer.setAttribute("class", "grid-cell grid-1-3");
            minContainer.setAttribute("style", "text-align: left");
            daysTitle.innerHTML = "Days";
            daysContainer.appendChild(daysTitle);
            daysContainer.appendChild(selectDays);
            hoursTitle.innerHTML = "Hours";
            hoursContainer.appendChild(hoursTitle);
            hoursContainer.appendChild(selectHours);
            minTitle.innerHTML = "Min";
            minContainer.appendChild(minTitle);
            minContainer.appendChild(selectMin);
            selectTwo.appendChild(daysContainer);
            selectTwo.appendChild(hoursContainer);
            selectTwo.appendChild(minContainer);
            selectContainer.appendChild(selectOne);
            selectContainer.appendChild(selectTwo);
            fieldset.appendChild(selectContainer);
            form.appendChild(fieldset);
            _this.modal.appendChild(form);
        };
        return _this;
    }
    QueueModal.prototype.generateModal = function () {
        _super.prototype.generateModal.call(this);
    };
    QueueModal.prototype.create = function () {
        _super.prototype.create.call(this);
    };
    return QueueModal;
}(Overlay));
exports.QueueModal = QueueModal;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmFkNzA5ZTJiYjE0NTcxYzAwZjciLCJ3ZWJwYWNrOi8vLy4vdHMvcHJpbnQudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvZGFzaGJvYXJkLnRzIiwid2VicGFjazovLy8uL3RzL2hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi90cy9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ2hFQSxzQ0FBa0M7QUFDbEMsdUNBQWdEO0FBRWhEO0lBVUUsZUFBWSxTQUFjO1FBQTFCLGlCQWlCQztRQUVNLGVBQVUsR0FBRztZQUNsQixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakQsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMs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QVMsQ0FBQyxDQUFDO1lBQ3JDLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdEMsVUFBVSxDQUFDLFNBQVMsR0FBRyxPQUFPO1lBQzlCLGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV4QyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUs7WUFDMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXBDLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFDckMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7WUFFbkMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QyxlQUFlLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUzQixLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDOztJQTlERCxDQUFDO0lBZ0VNLGtDQUFhLEdBQXBCO1FBQ0UsaUJBQU0sYUFBYSxXQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLDJCQUFNLEdBQWI7UUFDRSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLENBMUUrQixPQUFPLEdBMEV0QztBQTFFWSxnQ0FBVSIsImZpbGUiOiJwdWJsaWMvanMvZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2YWQ3MDllMmJiMTQ1NzFjMDBmNyIsImltcG9ydCB7IEhlbHBlciB9IGZyb20gXCIuL2hlbHBlclwiO1xuaW1wb3J0IHsgT3ZlcmxheSwgUXVldWVNb2RhbCB9IGZyb20gXCIuL292ZXJsYXlcIjtcblxuZXhwb3J0IGNsYXNzIFByaW50IHtcbiAgcHVibGljIHJvdzogSFRNTFRhYmxlUm93RWxlbWVudDtcbiAgcHVibGljIHByaW50SW5mbzogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBmaWxlbmFtZTogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBmaWxlU2l6ZTogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBmaWxhbWVudDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQ7XG4gIHB1YmxpYyBvcHRpb25zOiBIVE1MVGFibGVDZWxsRWxlbWVudDtcbiAgcHVibGljIGN1cnJlbnRTdGF0dXM7XG4gIHB1YmxpYyBjb21wbGV0ZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpbnRJbmZvOiBhbnkpIHtcbiAgICAvLyBzZXQgaW5pdGFsaXplIHNvbWUgcHJvcGVydGllcyBhbmQgc2V0IHRhYmxlIGNlbGxzIHRoYXQgd29uJ3QgYmUgY2hhbmdlZCBtdWNoXG4gICAgLy8gYnV0IG1pZ2h0IG5lZWQgdG8gYmUgc2VwZXJhdGVkIGF0IGEgbGF0ZXIgZGF0ZVxuICAgIHRoaXMucHJpbnRJbmZvID0gcHJpbnRJbmZvO1xuICAgIHRoaXMucm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHRoaXMuZmlsZW5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdGhpcy5maWxlU2l6ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICB0aGlzLmZpbGFtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHRoaXMub3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG5cbiAgICB0aGlzLmZpbGVuYW1lLmlubmVySFRNTCA9IHRoaXMucHJpbnRJbmZvW1wiZmlsZW5hbWVcIl07XG4gICAgdGhpcy5maWxlU2l6ZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm51bWJlclwiKTtcbiAgICB0aGlzLmZpbGVTaXplLmlubmVySFRNTCA9IEhlbHBlci5mb3JtYXRGaWxlU2l6ZSh0aGlzLnByaW50SW5mb1tcImZpbGVzaXplXCJdKTtcbiAgICB0aGlzLmZpbGFtZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG4gICAgdGhpcy5maWxhbWVudC5pbm5lckhUTUwgPSB0aGlzLnByaW50SW5mb1tcImZpbGFtZW50XCJdO1xuICB9XG5cbiAgcHVibGljIGFkZE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgY29uc3QgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgZG93bmxvYWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgY29uc3QgcXVldWVBZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBxdWV1ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICB0aGlzLm9wdGlvbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICAvLyBjcmVhdGUgYSBxdWV1ZSBidXR0b24gZm9yIGVhY2ggcHJpbnQgYW5kIHRoZW4gYWRkIGFuIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgLy8gd2l0aCBhbiBvdmVybGF5IGluc3RhbmNlIHRoYXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gY2xvc2VkXG4gICAgcXVldWVBZGQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1idXR0b24tc2Vjb25kYXJ5XCIpO1xuICAgIHF1ZXVlQWRkLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiQWRkIHRvIFF1ZXVlXCIpXG4gICAgcXVldWVBZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG92ZXJsYXkgPSBuZXcgUXVldWVNb2RhbChcIkFkZCB0byBRdWV1ZVwiKTtcbiAgICAgIG92ZXJsYXkuZ2VuZXJhdGVNb2RhbCgpO1xuICAgICAgb3ZlcmxheS5nZW5lcmF0ZUZvcm0oKTtcbiAgICAgIG92ZXJsYXkuY3JlYXRlKCk7XG4gICAgfSwgZmFsc2UpO1xuICAgIHF1ZXVlSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLXBsdXMtY2lyY2xlXCIpO1xuICAgIHF1ZXVlQWRkLmFwcGVuZENoaWxkKHF1ZXVlSWNvbik7XG5cbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB0aGlzLnByaW50SW5mb1tcInJlbGF0aXZlX3BhdGhcIl0pO1xuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCB0aGlzLnByaW50SW5mb1tcImZpbGVuYW1lXCJdKTtcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkb3dubG9hZC1saW5rIHRhYmxlLWJ1dHRvbi1wcmltYXJ5XCIpO1xuICAgIGRvd25sb2FkSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWRvd25sb2FkXCIpO1xuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkRvd25sb2FkIEZpbGVcIik7XG4gICAgZG93bmxvYWRMaW5rLmFwcGVuZENoaWxkKGRvd25sb2FkSWNvbik7XG4gICAgXG4gICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtYnV0dG9uIGRhbmdlclwiKTtcbiAgICBkZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCB0aGlzLnByaW50SW5mb1tcImlkXCJdKTtcbiAgICBkZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJEZWxldGUgUHJpbnRcIik7XG4gICAgZGVsZXRlQnV0dG9uSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLXRyYXNoXCIpO1xuICAgIGRlbGV0ZUJ1dHRvbi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b25JY29uKTtcbiAgICB0aGlzLm9wdGlvbnMuYXBwZW5kQ2hpbGQocXVldWVBZGQpO1xuICAgIHRoaXMub3B0aW9ucy5hcHBlbmRDaGlsZChkb3dubG9hZExpbmspO1xuICAgIHRoaXMub3B0aW9ucy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICB9XG5cbiAgcHVibGljIGZvcm1hdFN0YXR1cygpIHtcbiAgICAvLyBUT0RPOiBBZGQgb3RoZXIgc3RhdHVzIGNvbG9yc1xuICAgIHRoaXMuY3VycmVudFN0YXR1cy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuICAgIHN3aXRjaCAodGhpcy5wcmludEluZm9bXCJzdGF0dXNcIl0pIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdHVzLmlubmVySFRNTCA9IFwiUmVhZHkgdG8gUHJpbnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXR1cy5pbm5lckhUTUwgPSBcIkluIFF1ZXVlXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0dXMuaW5uZXJIVE1MID0gXCJQcmludGluZ1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdHVzLmlubmVySFRNTCA9IFwiUHJpbnRlZFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdHVzLmlubmVySFRNTCA9IFwiUGlja2VkIHVwXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdHVzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RhdHVzLW1lc3NhZ2UgZGFuZ2VyLW1lc3NhZ2UgdGFibGUtY29udHJvbHNcIik7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXR1cy5pbm5lckhUTUwgPSBcIk5vdCBBcHByb3ZlZFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGUoKSB7XG4gICAgdGhpcy5yb3cuYXBwZW5kQ2hpbGQodGhpcy5maWxlbmFtZSk7XG4gICAgdGhpcy5yb3cuYXBwZW5kQ2hpbGQodGhpcy5maWxlU2l6ZSk7XG4gICAgdGhpcy5yb3cuYXBwZW5kQ2hpbGQodGhpcy5maWxhbWVudCk7XG4gICAgdGhpcy5yb3cuYXBwZW5kQ2hpbGQodGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLnJvdy5hcHBlbmRDaGlsZCh0aGlzLmNvbXBsZXRlZCk7XG4gICAgdGhpcy5yb3cuYXBwZW5kQ2hpbGQodGhpcy5jdXJyZW50U3RhdHVzKTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL3ByaW50LnRzIiwiaW1wb3J0IHsgSGVscGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQgeyBQcmludCB9IGZyb20gXCIuL3ByaW50XCI7XG5cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBqb2JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2JzXCIpO1xuXG4vLyB3YXRjaCBqb2IgdGFibGUgYW5kIHdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgYXJyb3dcbi8vIHRoZW4gZ2VuZXJhdGUgYSBjaGlsZCByb3dzIHdpdGggYXNzb2NpYXRlZCBkYXRhXG5qb2JzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgY29uc3QgYXJyb3cgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgaWYgKChhcnJvdy50YWdOYW1lID09PSBcInNwYW5cIiB8fCBhcnJvdy50YWdOYW1lID09PSBcIlNQQU5cIikgJiYgYXJyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHByaW50VGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidHIucHJpbnRzLXJvd1tkYXRhLWpvYi1pZD0nXCIgKyBhcnJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpICsgXCInXVwiKTtcbiAgICBpZiAoYXJyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIpID09PSBcImZhbHNlXCIgJiYgcHJpbnRUYWJsZSAhPT0gbnVsbCkge1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIgLFwidHJ1ZVwiKTtcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi11cCB0YWJsZS1kcm9wZG93blwiKTtcbiAgICAgIHByaW50VGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludHMtcm93IHByaW50LXJvd1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNoZXZyb24tZG93biB0YWJsZS1kcm9wZG93blwiKVxuICAgICAgcHJpbnRUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50LXJvdy1oaWRkZW4gcHJpbnRzLXJvd1wiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyB0YWtlIHRoZSBwcmludHMgcmVsYXRlZCB0byBhIGpvYiBhbmQgcG9wdWxhdGUgYSBoaWRkZW4gdGFibGVcbi8vIHdpdGggcHJpbnQgaW5mb3JtYXRpb24gZm9yIDNkIG1vZGVsc1xuZnVuY3Rpb24gYWRkUHJpbnRzKHByaW50czogYW55KSA6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICBjb25zdCBwcmludFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgY29uc3QgcHJpbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIGNvbnN0IHByaW50c1RhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBjb25zdCBwcmludHNIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xuICBjb25zdCBwcmludHNCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuXG4gIHByaW50Um93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnQtcm93LWhpZGRlbiBwcmludHMtcm93XCIpO1xuICBwcmludFJvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuICAvLyB0YWJsZXMgaW5zaWRlIG9mIGEgdGFibGUgYXJlIG9ubHkgdmFsaWQgaW5zaWRlIGEgPHRkPiBzbyBjcmVhdGUgb25lXG4gIFxuICBwcmludENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50LWNvbnRhaW5lclwiKTtcbiAgcHJpbnRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY29sc3BhblwiLCBcIjZcIik7XG4gIHByaW50c1RhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnRzLXRhYmxlXCIpO1xuXG4gIGNvbnN0IG5hbWVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBjb25zdCBzaXplSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgY29uc3QgZmlsYW1lbnRIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBjb25zdCBmaWxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgY29uc3QgYXBwcm92ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIGNvbnN0IHN0YXR1c0hlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG5cbiAgbmFtZUhlYWQuaW5uZXJIVE1MID0gXCJGaWxlbmFtZVwiO1xuICBuYW1lSGVhZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImxldHRlclwiKTtcblxuICBzaXplSGVhZC5pbm5lckhUTUwgPSBcIkZpbGUgU2l6ZVwiO1xuICBzaXplSGVhZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm51bWJlclwiKTtcblxuICBmaWxhbWVudEhlYWQuaW5uZXJIVE1MID0gXCJGaWxhbWVudCBUeXBlXCI7XG4gIGZpbGFtZW50SGVhZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuXG4gIGZpbGVIZWFkLmlubmVySFRNTCA9IFwiT3B0aW9uc1wiO1xuICBhcHByb3ZlZC5pbm5lckhUTUwgPSBcIkFwcHJvdmVkXCI7XG4gIHN0YXR1c0hlYWQuaW5uZXJIVE1MID0gXCJTdGF0dXNcIjtcblxuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKG5hbWVIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChzaXplSGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoZmlsYW1lbnRIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChmaWxlSGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoYXBwcm92ZWQpO1xuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKHN0YXR1c0hlYWQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJpbnQgPSBuZXcgUHJpbnQocHJpbnRzW2ldKTtcbiAgICBwcmludC5hZGRPcHRpb25zKCk7XG4gICAgcHJpbnQuZm9ybWF0U3RhdHVzKCk7XG4gICAgcHJpbnQuZ2VuZXJhdGUoKTtcbiAgICBwcmludHNCb2R5LmFwcGVuZENoaWxkKHByaW50LnJvdyk7XG4gIH1cblxuICBwcmludHNUYWJsZS5hcHBlbmRDaGlsZChwcmludHNIZWFkKTtcbiAgcHJpbnRzVGFibGUuYXBwZW5kQ2hpbGQocHJpbnRzQm9keSk7XG4gIHByaW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHByaW50c1RhYmxlKTtcbiAgcHJpbnRSb3cuYXBwZW5kQ2hpbGQocHJpbnRDb250YWluZXIpO1xuXG4gIHJldHVybiBwcmludFJvdztcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVUYWJsZShkYXRhOiBhbnkpIHtcbiAgY29uc3Qgam9icyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9ic0xpc3RcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICBjb25zdCBpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IG51bU9mUHJpbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICBjb25zdCBjb21wbGV0ZWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICBjb25zdCBkb3dubG9hZEFsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNvbnN0IGRvd25sb2FkQWxsSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIG9wdGlvbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcblxuICAgIGRvd25sb2FkQWxsQnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtYnV0dG9uLXNlY29uZGFyeVwiKTtcbiAgICBkb3dubG9hZEFsbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkRvd25sb2FkIGFzIFpJUFwiKVxuICAgIGRvd25sb2FkQWxsSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWZpbGUtYXJjaGl2ZS1vXCIpO1xuICAgIGRvd25sb2FkQWxsQnV0dG9uLmFwcGVuZENoaWxkKGRvd25sb2FkQWxsSWNvbik7XG5cbiAgICBkZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBkYXRhW2ldW1wiaWRcIl0pO1xuICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWJ1dHRvbiBkYW5nZXJcIik7XG4gICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiRGVsZXRlIEpvYlwiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtdHJhc2hcIik7XG4gICAgZGVsZXRlQnV0dG9uLmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgZGVsZXRlSm9iOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgY29uc3QgYnV0dG9uID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IGpvYklkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgICBjb25zdCBvcHRpb25zID0gPEhUTUxFbGVtZW50PmJ1dHRvbi5wYXJlbnROb2RlO1xuICAgICAgY29uc3Qgcm93ID0gPEhUTUxFbGVtZW50Pm9wdGlvbnMucGFyZW50Tm9kZTtcblxuICAgICAgZGVsZXRlSm9iLm9wZW4oXCJERUxFVEVcIiwgYGpvYnMvJHtqb2JJZH1gKTtcbiAgICAgIGRlbGV0ZUpvYi5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlTdGF0ZUNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgIGlmIChkZWxldGVKb2IucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGRlbGV0ZUpvYi5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkZWxldGVKb2IucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGRlbGV0ZUpvYi5zdGF0dXMgPT0gNTAwKSB7XG5cbiAgICAgICAgfVxuICAgICAgfSwgZmFsc2UpO1xuICAgICAgZGVsZXRlSm9iLnNlbmQoKTtcbiAgICAgIHJvdy5yZW1vdmUoKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBvcHRpb25zLmFwcGVuZENoaWxkKGRvd25sb2FkQWxsQnV0dG9uKTtcbiAgICBvcHRpb25zLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG4gICAgXG4gICAgY29uc3QgYXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgY29uc3QgYXJyb3dJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICByb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJqb2ItdGFibGVcIik7XG4gICAgaWQuaW5uZXJIVE1MID0gZGF0YVtpXVtcImlkXCJdO1xuICAgIGlkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG4gICAgbmFtZS5pbm5lckhUTUwgPSBkYXRhW2ldW1wibmFtZVwiXTtcbiAgICBudW1PZlByaW50cy5pbm5lckhUTUwgPSBkYXRhW2ldW1wicHJpbnRzX2RhdGFcIl0ubGVuZ3RoO1xuICAgIG51bU9mUHJpbnRzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibnVtYmVyXCIpO1xuICAgIGNvbXBsZXRlZEljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1jbG9zZSBjb250cm9sc1wiKTtcblxuICAgIGlmIChkYXRhW2ldW1wiY29tcGxldGVkXCJdID09PSBcInRydWVcIikge1xuICAgICAgY29tcGxldGVkLmFwcGVuZENoaWxkKGNvbXBsZXRlZEljb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZWQuYXBwZW5kQ2hpbGQoY29tcGxldGVkSWNvbik7XG4gICAgfVxuICAgIGNvbXBsZXRlZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuXG5cbiAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuICAgIGFycm93SWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGRhdGFbaV1bXCJpZFwiXSk7XG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi1kb3duIHRhYmxlLWRyb3Bkb3duXCIpO1xuICAgIGFycm93SWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICBhcnJvdy5hcHBlbmRDaGlsZChhcnJvd0ljb24pO1xuXG4gICAgY29uc3QgcHJpbnRzID0gYWRkUHJpbnRzKGRhdGFbaV1bXCJwcmludHNfZGF0YVwiXSk7XG4gICAgcHJpbnRzLnNldEF0dHJpYnV0ZShcImRhdGEtam9iLWlkXCIsIGRhdGFbaV1bXCJpZFwiXSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoaWQpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICByb3cuYXBwZW5kQ2hpbGQobnVtT2ZQcmludHMpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChjb21wbGV0ZWQpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChvcHRpb25zKTtcbiAgICByb3cuYXBwZW5kQ2hpbGQoYXJyb3cpO1xuICAgIGpvYnMuYXBwZW5kQ2hpbGQocm93KTtcbiAgICBqb2JzLmFwcGVuZENoaWxkKHByaW50cyk7XG5cbiAgfVxufVxuXG5jb25zdCBnZXRQcmludEluZm8gPSAodXJsOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogc3RyaW5nKSA9PiBhbnkpIDogdm9pZCA9PiB7XG4gIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVRleHQpO1xuICAgIH1cbiAgfVxuICByZXEub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICByZXEuc2VuZCgpO1xufVxuXG5nZXRQcmludEluZm8oXCIvam9ic1wiLCAoZGF0YSkgPT4ge1xuICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgZ2VuZXJhdGVUYWJsZShqc29uKTtcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9kYXNoYm9hcmQudHMiLCJleHBvcnQgY2xhc3MgSGVscGVyIHtcbiAgcHVibGljIHN0YXRpYyBmb3JtYXRGaWxlU2l6ZShieXRlczogYW55KSA6IHN0cmluZyB7XG4gICAgLy8gdXNpbmcgdGhlIGlucHV0ZWQgYnl0ZXMgZmluZCBvdXQgd2hhdCB1bml0IHRvIHVzZSBhbmQgc3RvcmUgdGhpcyBmb3IgbGF0ZXJcbiAgICBjb25zdCBleHAgPSBNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZygxMDI0KSB8IDA7XG4gICAgLy8gc2ltcGxpZnkgYnl0ZXMgaW50byBwcm9wZXIgdW5pdCBudW1iZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgZXhwKSkudG9GaXhlZCgyKTtcbiAgICAvLyB1c2luZyBleHAgZm9ybWF0IHRoZSB1bml0IGZyb20gYSBzdHJpbmdcbiAgICBjb25zdCB1bml0ID0gZXhwID09PSAwID8gJ2J5dGVzJzogJ0tNR1RQRVpZJ1tleHAgLSAxXSArICdCJztcbiAgICByZXR1cm4gYCR7cmVzdWx0fSAke3VuaXR9YCA7XG4gIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy9oZWxwZXIudHMiLCJleHBvcnQgY2xhc3MgT3ZlcmxheSB7XG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICBwdWJsaWMgb3ZlcmxheTogSFRNTEVsZW1lbnQ7XG4gIHB1YmxpYyBtb2RhbDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZykge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLm1vZGFsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibW9kYWxcIik7XG4gICAgdGhpcy5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJvdmVybGF5XCIpO1xuICB9XG5cbiAgcHVibGljIGdlbmVyYXRlTW9kYWwoKSA6IHZvaWQge1xuICAgIGNvbnN0IG1vZGFsSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG1vZGFsQ2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgICBtb2RhbEhlYWRlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImdyaWQgbW9kYWwtaGVhZGVyXCIpO1xuICAgIG1vZGFsVGl0bGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJncmlkLWNlbGwgZ3JpZC0xLTIgbW9kYWwtdGl0bGVcIik7XG4gICAgbW9kYWxUaXRsZS5pbm5lckhUTUwgPSB0aGlzLnRpdGxlO1xuICAgIG1vZGFsQ2xvc2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJncmlkLWNlbGwgZ3JpZC0xLTIgbW9kYWwtY2xvc2VcIik7XG4gICAgY2xvc2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS10aW1lc1wiKTtcblxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLm92ZXJsYXkucmVtb3ZlKCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgbW9kYWxDbG9zZS5hcHBlbmRDaGlsZChjbG9zZSk7XG4gICAgbW9kYWxIZWFkZXIuYXBwZW5kQ2hpbGQobW9kYWxUaXRsZSk7XG4gICAgbW9kYWxIZWFkZXIuYXBwZW5kQ2hpbGQobW9kYWxDbG9zZSk7XG4gICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChtb2RhbEhlYWRlcik7XG5cbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGUoKSA6IHZvaWQge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhc2hib2FyZFwiKTtcbiAgICB0aGlzLm92ZXJsYXkuc3R5bGUudmlzaWJpbGl0eSA9ICh0aGlzLm92ZXJsYXkuc3R5bGUudmlzaWJpbGl0eSA9PT0gXCJ2aXNpYmxlXCIpID8gXCJoaWRkZW5cIiA6IFwidmlzaWJsZVwiO1xuICAgIHRoaXMub3ZlcmxheS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUXVldWVNb2RhbCBleHRlbmRzIE92ZXJsYXkge1xuICBjb25zdHJ1Y3Rvcih0aXRsZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodGl0bGUpO1xuICB9XG5cbiAgcHVibGljIGdlbmVyYXRlRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgY29uc3QgZmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gICAgY29uc3Qgc2VsZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBzZWxlY3RPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHNlbGVjdFR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgcHJpbnRlclRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRpdGxlXCIpO1xuICAgIGNvbnN0IHNlbGVjdFByaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIGNvbnN0IHByaW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIGNvbnN0IGRheXNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGhvdXJzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBtaW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGRheXNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiKTtcbiAgICBjb25zdCBob3Vyc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRpdGxlXCIpO1xuICAgIGNvbnN0IG1pblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRpdGxlXCIpO1xuICAgIGNvbnN0IHNlbGVjdERheXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIGNvbnN0IHNlbGVjdEhvdXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICBjb25zdCBzZWxlY3RNaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuXG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1vZGFsLWZvcm1cIik7XG4gICAgc2VsZWN0Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibW9kYWwtZm9ybS1jb250cm9sIGdyaWRcIik7XG5cbiAgICBwcmludGVyLmlubmVySFRNTCA9IFwiUHJpbnRlciAxXCI7XG4gICAgcHJpbnRlclRpdGxlLmlubmVySFRNTCA9IFwiU2VsZWN0IGEgUHJpbnRlclwiXG4gICAgc2VsZWN0T25lLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ3JpZC1jZWxsIGdyaWQtMS0yXCIpO1xuXG4gICAgc2VsZWN0UHJpbnRlci5hcHBlbmRDaGlsZChwcmludGVyKTtcbiAgICBzZWxlY3RPbmUuYXBwZW5kQ2hpbGQocHJpbnRlclRpdGxlKVxuICAgIHNlbGVjdE9uZS5hcHBlbmRDaGlsZChzZWxlY3RQcmludGVyKTtcbiAgICBcbiAgICBzZWxlY3RUd28uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJncmlkLWNlbGwgZ3JpZC0xLTIgZ3JpZFwiKTtcbiAgICBkYXlzQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ3JpZC1jZWxsIGdyaWQtMS0zXCIpO1xuICAgIGRheXNDb250YWluZXIuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ0ZXh0LWFsaWduOiByaWdodFwiKTtcbiAgICBob3Vyc0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImdyaWQtY2VsbCBncmlkLTEtM1wiKTtcbiAgICBob3Vyc0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInRleHQtYWxpZ246IGNlbnRlclwiKTtcbiAgICBtaW5Db250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJncmlkLWNlbGwgZ3JpZC0xLTNcIik7XG4gICAgbWluQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwidGV4dC1hbGlnbjogbGVmdFwiKTtcblxuICAgIGRheXNUaXRsZS5pbm5lckhUTUwgPSBcIkRheXNcIlxuICAgIGRheXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5c1RpdGxlKTtcbiAgICBkYXlzQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdERheXMpO1xuXG4gICAgaG91cnNUaXRsZS5pbm5lckhUTUwgPSBcIkhvdXJzXCJcbiAgICBob3Vyc0NvbnRhaW5lci5hcHBlbmRDaGlsZChob3Vyc1RpdGxlKTtcbiAgICBob3Vyc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RIb3Vycyk7XG5cbiAgICBtaW5UaXRsZS5pbm5lckhUTUwgPSBcIk1pblwiXG4gICAgbWluQ29udGFpbmVyLmFwcGVuZENoaWxkKG1pblRpdGxlKTtcbiAgICBtaW5Db250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0TWluKTtcblxuICAgIHNlbGVjdFR3by5hcHBlbmRDaGlsZChkYXlzQ29udGFpbmVyKTtcbiAgICBzZWxlY3RUd28uYXBwZW5kQ2hpbGQoaG91cnNDb250YWluZXIpXG4gICAgc2VsZWN0VHdvLmFwcGVuZENoaWxkKG1pbkNvbnRhaW5lcilcblxuICAgIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RPbmUpO1xuICAgIHNlbGVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RUd28pO1xuICAgIGZpZWxkc2V0LmFwcGVuZENoaWxkKHNlbGVjdENvbnRhaW5lcik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmaWVsZHNldCk7XG5cbiAgICB0aGlzLm1vZGFsLmFwcGVuZENoaWxkKGZvcm0pO1xuICB9XG5cbiAgcHVibGljIGdlbmVyYXRlTW9kYWwoKSB7XG4gICAgc3VwZXIuZ2VuZXJhdGVNb2RhbCgpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZSgpIHtcbiAgICBzdXBlci5jcmVhdGUoKTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL292ZXJsYXkudHMiXSwic291cmNlUm9vdCI6IiJ9