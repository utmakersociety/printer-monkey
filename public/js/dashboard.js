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

var jobs = document.getElementById("jobs");
// watch job table and wait for user to click arrow
// then generate a child rows with associated data
jobs.addEventListener("click", function (event) {
    var arrow = event.target;
    if (arrow.tagName === "span" || arrow.tagName === "SPAN") {
        var printTable = document.querySelector("tr.prints-row[data-job-id='" + arrow.getAttribute("data-id") + "']");
        if (arrow.getAttribute("data-clicked") === "false") {
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
function formatFileSize(bytes) {
    var exp = Math.log(bytes) / Math.log(1024) | 0;
    var result = (bytes / Math.pow(1024, exp)).toFixed(2);
    var unit = exp == 0 ? 'bytes' : 'KMGTPEZY'[exp - 1] + 'B';
    return result + " " + unit;
}
// take the prints related to a job and populate a hidden table
// with print information for 3d models
function addPrints(prints) {
    var printRow = document.createElement("tr");
    printRow.setAttribute("class", "print-row-hidden prints-row");
    printRow.setAttribute("data-hidden", "false");
    // tables inside of a table are only valid inside a <td> so create one
    var printContainer = document.createElement("td");
    printContainer.setAttribute("class", "print-container");
    printContainer.setAttribute("colspan", "6");
    var printsTable = document.createElement("table");
    printsTable.setAttribute("class", "prints-table");
    var printsHead = document.createElement("thead");
    var printsBody = document.createElement("tbody");
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
        var print_1 = document.createElement("tr");
        var filename = document.createElement("td");
        var fileSize = document.createElement("td");
        var filament = document.createElement("td");
        var options = document.createElement("td");
        var downloadLink = document.createElement("a");
        var downloadIcon = document.createElement("i");
        var queueAdd = document.createElement("span");
        var queueIcon = document.createElement("span");
        var deleteButton = document.createElement("span");
        var deleteButtonIcon = document.createElement("span");
        var currentStatus = document.createElement("td");
        var completed = document.createElement("td");
        filename.innerHTML = prints[i]["filename"];
        fileSize.setAttribute("class", "number");
        fileSize.innerHTML = formatFileSize(prints[i]["filesize"]);
        filament.setAttribute("class", "table-controls");
        filament.innerHTML = prints[i]["filament"];
        options.setAttribute("class", "table-controls");
        queueAdd.setAttribute("class", "table-button-secondary");
        queueAdd.setAttribute("title", "Add to Queue");
        queueAdd.addEventListener("click", function (event) {
        }, false);
        queueIcon.setAttribute("class", "fa fa-plus-circle");
        queueAdd.appendChild(queueIcon);
        downloadLink.setAttribute("href", prints[i]["path"]);
        downloadLink.setAttribute("download", prints[i]["filename"]);
        downloadLink.setAttribute("class", "download-link table-button-primary");
        downloadIcon.setAttribute("class", "fa fa-download");
        downloadLink.setAttribute("title", "Download File");
        downloadLink.appendChild(downloadIcon);
        deleteButton.setAttribute("class", "table-button danger");
        deleteButton.setAttribute("data-id", prints[i]["id"]);
        deleteButton.setAttribute("title", "Delete Print");
        deleteButtonIcon.setAttribute("class", "fa fa-trash");
        deleteButton.appendChild(deleteButtonIcon);
        options.appendChild(queueAdd);
        options.appendChild(downloadLink);
        options.appendChild(deleteButton);
        currentStatus.setAttribute("class", "table-controls");
        switch (prints[i]["status"]) {
            case 1:
                currentStatus.innerHTML = "Ready to Print";
                break;
            case 2:
                currentStatus.innerHTML = "In Queue";
                break;
            case 3:
                currentStatus.innerHTML = "Printing";
                break;
            case 4:
                currentStatus.innerHTML = "Printed";
                break;
            case 5:
                currentStatus.innerHTML = "Picked up";
                break;
            default:
                currentStatus.setAttribute("class", "status-message danger-message table-controls");
                currentStatus.innerHTML = "Not Approved";
                break;
        }
        print_1.appendChild(filename);
        print_1.appendChild(fileSize);
        print_1.appendChild(filament);
        print_1.appendChild(options);
        print_1.appendChild(completed);
        print_1.appendChild(currentStatus);
        printsBody.appendChild(print_1);
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTlhOTU5ZThmMDMzYmJjNTBmYjYiLCJ3ZWJwYWNrOi8vLy4vdHMvZGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRWE7QUFFYixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRzdDLG1EQUFtRDtBQUNuRCxrREFBa0Q7QUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQUs7SUFDbkMsSUFBTSxLQUFLLEdBQW9CLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDNUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoSCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFL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L2Rhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTlhOTU5ZThmMDMzYmJjNTBmYjYiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3Qgam9icyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9ic1wiKTtcblxuXG4vLyB3YXRjaCBqb2IgdGFibGUgYW5kIHdhaXQgZm9yIHVzZXIgdG8gY2xpY2sgYXJyb3dcbi8vIHRoZW4gZ2VuZXJhdGUgYSBjaGlsZCByb3dzIHdpdGggYXNzb2NpYXRlZCBkYXRhXG5qb2JzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgY29uc3QgYXJyb3cgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgaWYgKGFycm93LnRhZ05hbWUgPT09IFwic3BhblwiIHx8IGFycm93LnRhZ05hbWUgPT09IFwiU1BBTlwiKSB7XG4gICAgY29uc3QgcHJpbnRUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ci5wcmludHMtcm93W2RhdGEtam9iLWlkPSdcIiArIGFycm93LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgKyBcIiddXCIpO1xuICAgIGlmIChhcnJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrZWRcIikgPT09IFwiZmFsc2VcIikge1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIgLFwidHJ1ZVwiKTtcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi11cCB0YWJsZS1kcm9wZG93blwiKTtcbiAgICAgIHByaW50VGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludHMtcm93IHByaW50LXJvd1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNoZXZyb24tZG93biB0YWJsZS1kcm9wZG93blwiKVxuICAgICAgcHJpbnRUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50LXJvdy1oaWRkZW4gcHJpbnRzLXJvd1wiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBmb3JtYXRGaWxlU2l6ZShieXRlczogYW55KSB7XG4gIGNvbnN0IGV4cCA9IE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKDEwMjQpIHwgMDtcbiAgY29uc3QgcmVzdWx0ID0gKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgZXhwKSkudG9GaXhlZCgyKTtcbiAgY29uc3QgdW5pdCA9IGV4cCA9PSAwID8gJ2J5dGVzJzogJ0tNR1RQRVpZJ1tleHAgLSAxXSArICdCJztcbiAgcmV0dXJuIGAke3Jlc3VsdH0gJHt1bml0fWAgO1xufVxuXG4vLyB0YWtlIHRoZSBwcmludHMgcmVsYXRlZCB0byBhIGpvYiBhbmQgcG9wdWxhdGUgYSBoaWRkZW4gdGFibGVcbi8vIHdpdGggcHJpbnQgaW5mb3JtYXRpb24gZm9yIDNkIG1vZGVsc1xuZnVuY3Rpb24gYWRkUHJpbnRzKHByaW50czogYW55KSA6IEhUTUxUYWJsZVJvd0VsZW1lbnQge1xuICBjb25zdCBwcmludFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgcHJpbnRSb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludC1yb3ctaGlkZGVuIHByaW50cy1yb3dcIik7XG4gIHByaW50Um93LnNldEF0dHJpYnV0ZShcImRhdGEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG5cbiAgLy8gdGFibGVzIGluc2lkZSBvZiBhIHRhYmxlIGFyZSBvbmx5IHZhbGlkIGluc2lkZSBhIDx0ZD4gc28gY3JlYXRlIG9uZVxuICBjb25zdCBwcmludENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgcHJpbnRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludC1jb250YWluZXJcIik7XG4gIHByaW50Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNvbHNwYW5cIiwgXCI2XCIpO1xuICBcbiAgY29uc3QgcHJpbnRzVGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHByaW50c1RhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnRzLXRhYmxlXCIpO1xuXG4gIGNvbnN0IHByaW50c0hlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIik7XG4gIGNvbnN0IHByaW50c0JvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG5cbiAgY29uc3QgbmFtZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIGNvbnN0IHNpemVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBjb25zdCBmaWxhbWVudEhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIGNvbnN0IGZpbGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBjb25zdCBhcHByb3ZlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgY29uc3Qgc3RhdHVzSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcblxuICBuYW1lSGVhZC5pbm5lckhUTUwgPSBcIkZpbGVuYW1lXCI7XG4gIG5hbWVIZWFkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibGV0dGVyXCIpO1xuXG4gIHNpemVIZWFkLmlubmVySFRNTCA9IFwiRmlsZSBTaXplXCI7XG4gIHNpemVIZWFkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibnVtYmVyXCIpO1xuXG4gIGZpbGFtZW50SGVhZC5pbm5lckhUTUwgPSBcIkZpbGFtZW50IFR5cGVcIjtcbiAgZmlsYW1lbnRIZWFkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG5cbiAgZmlsZUhlYWQuaW5uZXJIVE1MID0gXCJPcHRpb25zXCI7XG4gIGFwcHJvdmVkLmlubmVySFRNTCA9IFwiQXBwcm92ZWRcIjtcbiAgc3RhdHVzSGVhZC5pbm5lckhUTUwgPSBcIlN0YXR1c1wiO1xuXG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQobmFtZUhlYWQpO1xuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKHNpemVIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChmaWxhbWVudEhlYWQpO1xuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKGZpbGVIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChhcHByb3ZlZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoc3RhdHVzSGVhZCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmludHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcmludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAgIGNvbnN0IGZpbGVuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IGZpbGVTaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IGZpbGFtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgY29uc3QgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgZG93bmxvYWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgY29uc3QgcXVldWVBZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBxdWV1ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjb25zdCBkZWxldGVCdXR0b25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3QgY3VycmVudFN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICBjb25zdCBjb21wbGV0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG5cblxuICAgIGZpbGVuYW1lLmlubmVySFRNTCA9IHByaW50c1tpXVtcImZpbGVuYW1lXCJdO1xuICAgIGZpbGVTaXplLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibnVtYmVyXCIpO1xuICAgIGZpbGVTaXplLmlubmVySFRNTCA9IGZvcm1hdEZpbGVTaXplKHByaW50c1tpXVtcImZpbGVzaXplXCJdKTtcbiAgICBmaWxhbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuICAgIGZpbGFtZW50LmlubmVySFRNTCA9IHByaW50c1tpXVtcImZpbGFtZW50XCJdO1xuICAgIG9wdGlvbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBxdWV1ZUFkZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWJ1dHRvbi1zZWNvbmRhcnlcIik7XG4gICAgcXVldWVBZGQuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJBZGQgdG8gUXVldWVcIilcbiAgICBxdWV1ZUFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgXG4gICAgfSwgZmFsc2UpO1xuICAgIHF1ZXVlSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLXBsdXMtY2lyY2xlXCIpO1xuICAgIHF1ZXVlQWRkLmFwcGVuZENoaWxkKHF1ZXVlSWNvbik7XG5cblxuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHByaW50c1tpXVtcInBhdGhcIl0pO1xuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBwcmludHNbaV1bXCJmaWxlbmFtZVwiXSk7XG4gICAgZG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZG93bmxvYWQtbGluayB0YWJsZS1idXR0b24tcHJpbWFyeVwiKTtcbiAgICBkb3dubG9hZEljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1kb3dubG9hZFwiKTtcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJEb3dubG9hZCBGaWxlXCIpO1xuICAgIGRvd25sb2FkTGluay5hcHBlbmRDaGlsZChkb3dubG9hZEljb24pO1xuICAgIFxuICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWJ1dHRvbiBkYW5nZXJcIik7XG4gICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgcHJpbnRzW2ldW1wiaWRcIl0pO1xuICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkRlbGV0ZSBQcmludFwiKTtcbiAgICBkZWxldGVCdXR0b25JY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtdHJhc2hcIik7XG4gICAgZGVsZXRlQnV0dG9uLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbkljb24pO1xuXG4gICAgb3B0aW9ucy5hcHBlbmRDaGlsZChxdWV1ZUFkZCk7XG4gICAgb3B0aW9ucy5hcHBlbmRDaGlsZChkb3dubG9hZExpbmspO1xuICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblxuICAgIGN1cnJlbnRTdGF0dXMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBzd2l0Y2ggKHByaW50c1tpXVtcInN0YXR1c1wiXSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjdXJyZW50U3RhdHVzLmlubmVySFRNTCA9IFwiUmVhZHkgdG8gUHJpbnRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGN1cnJlbnRTdGF0dXMuaW5uZXJIVE1MID0gXCJJbiBRdWV1ZVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgY3VycmVudFN0YXR1cy5pbm5lckhUTUwgPSBcIlByaW50aW5nXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBjdXJyZW50U3RhdHVzLmlubmVySFRNTCA9IFwiUHJpbnRlZFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgY3VycmVudFN0YXR1cy5pbm5lckhUTUwgPSBcIlBpY2tlZCB1cFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGN1cnJlbnRTdGF0dXMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGF0dXMtbWVzc2FnZSBkYW5nZXItbWVzc2FnZSB0YWJsZS1jb250cm9sc1wiKTtcbiAgICAgICAgY3VycmVudFN0YXR1cy5pbm5lckhUTUwgPSBcIk5vdCBBcHByb3ZlZFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBwcmludC5hcHBlbmRDaGlsZChmaWxlbmFtZSk7XG4gICAgcHJpbnQuYXBwZW5kQ2hpbGQoZmlsZVNpemUpO1xuICAgIHByaW50LmFwcGVuZENoaWxkKGZpbGFtZW50KTtcbiAgICBwcmludC5hcHBlbmRDaGlsZChvcHRpb25zKTtcbiAgICBwcmludC5hcHBlbmRDaGlsZChjb21wbGV0ZWQpO1xuICAgIHByaW50LmFwcGVuZENoaWxkKGN1cnJlbnRTdGF0dXMpO1xuXG5cbiAgICBwcmludHNCb2R5LmFwcGVuZENoaWxkKHByaW50KTtcbiAgfVxuXG4gIHByaW50c1RhYmxlLmFwcGVuZENoaWxkKHByaW50c0hlYWQpO1xuICBwcmludHNUYWJsZS5hcHBlbmRDaGlsZChwcmludHNCb2R5KTtcbiAgcHJpbnRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJpbnRzVGFibGUpO1xuICBwcmludFJvdy5hcHBlbmRDaGlsZChwcmludENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHByaW50Um93O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlKGRhdGE6IGFueSkge1xuICBjb25zdCBqb2JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2JzTGlzdFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIGNvbnN0IGlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgY29uc3QgbnVtT2ZQcmludHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgY29uc3QgY29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IGNvbXBsZXRlZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIGNvbnN0IGRvd25sb2FkQWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3QgZG93bmxvYWRBbGxJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgb3B0aW9ucy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuXG4gICAgZG93bmxvYWRBbGxCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1idXR0b24tc2Vjb25kYXJ5XCIpO1xuICAgIGRvd25sb2FkQWxsQnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiRG93bmxvYWQgYXMgWklQXCIpXG4gICAgZG93bmxvYWRBbGxJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtZmlsZS1hcmNoaXZlLW9cIik7XG4gICAgZG93bmxvYWRBbGxCdXR0b24uYXBwZW5kQ2hpbGQoZG93bmxvYWRBbGxJY29uKTtcblxuICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGRhdGFbaV1bXCJpZFwiXSk7XG4gICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtYnV0dG9uIGRhbmdlclwiKTtcbiAgICBkZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJEZWxldGUgSm9iXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS10cmFzaFwiKTtcbiAgICBkZWxldGVCdXR0b24uYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBkZWxldGVKb2I6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICBjb25zdCBidXR0b24gPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3Qgam9iSWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSA8SFRNTEVsZW1lbnQ+YnV0dG9uLnBhcmVudE5vZGU7XG4gICAgICBjb25zdCByb3cgPSA8SFRNTEVsZW1lbnQ+b3B0aW9ucy5wYXJlbnROb2RlO1xuXG4gICAgICBkZWxldGVKb2Iub3BlbihcIkRFTEVURVwiLCBgam9icy8ke2pvYklkfWApO1xuICAgICAgZGVsZXRlSm9iLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWFkeVN0YXRlQ2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgaWYgKGRlbGV0ZUpvYi5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgZGVsZXRlSm9iLnN0YXR1cyA9PSAyMDApIHtcblxuICAgICAgICB9IGVsc2UgaWYgKGRlbGV0ZUpvYi5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgZGVsZXRlSm9iLnN0YXR1cyA9PSA1MDApIHtcblxuICAgICAgICB9XG4gICAgICB9LCBmYWxzZSk7XG4gICAgICBkZWxldGVKb2Iuc2VuZCgpO1xuICAgICAgcm93LnJlbW92ZSgpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZG93bmxvYWRBbGxCdXR0b24pO1xuICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICBcbiAgICBjb25zdCBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICBjb25zdCBhcnJvd0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImpvYi10YWJsZVwiKTtcbiAgICBpZC5pbm5lckhUTUwgPSBkYXRhW2ldW1wiaWRcIl07XG4gICAgaWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBuYW1lLmlubmVySFRNTCA9IGRhdGFbaV1bXCJuYW1lXCJdO1xuICAgIG51bU9mUHJpbnRzLmlubmVySFRNTCA9IGRhdGFbaV1bXCJwcmludHNfZGF0YVwiXS5sZW5ndGg7XG4gICAgbnVtT2ZQcmludHMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJudW1iZXJcIik7XG4gICAgY29tcGxldGVkSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNsb3NlIGNvbnRyb2xzXCIpO1xuXG4gICAgaWYgKGRhdGFbaV1bXCJjb21wbGV0ZWRcIl0gPT09IFwidHJ1ZVwiKSB7XG4gICAgICBjb21wbGV0ZWQuYXBwZW5kQ2hpbGQoY29tcGxldGVkSWNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBsZXRlZC5hcHBlbmRDaGlsZChjb21wbGV0ZWRJY29uKTtcbiAgICB9XG4gICAgY29tcGxldGVkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG5cblxuICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgZGF0YVtpXVtcImlkXCJdKTtcbiAgICBhcnJvd0ljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1jaGV2cm9uLWRvd24gdGFibGUtZHJvcGRvd25cIik7XG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgIGFycm93LmFwcGVuZENoaWxkKGFycm93SWNvbik7XG5cbiAgICBjb25zdCBwcmludHMgPSBhZGRQcmludHMoZGF0YVtpXVtcInByaW50c19kYXRhXCJdKTtcbiAgICBwcmludHMuc2V0QXR0cmlidXRlKFwiZGF0YS1qb2ItaWRcIiwgZGF0YVtpXVtcImlkXCJdKTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChpZCk7XG4gICAgcm93LmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChudW1PZlByaW50cyk7XG4gICAgcm93LmFwcGVuZENoaWxkKGNvbXBsZXRlZCk7XG4gICAgcm93LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChhcnJvdyk7XG4gICAgam9icy5hcHBlbmRDaGlsZChyb3cpO1xuICAgIGpvYnMuYXBwZW5kQ2hpbGQocHJpbnRzKTtcblxuICB9XG59XG5cbmNvbnN0IGdldFByaW50SW5mbyA9ICh1cmw6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBzdHJpbmcpID0+IGFueSkgOiB2b2lkID0+IHtcbiAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgaWYgKHJlcS5yZWFkeVN0YXRlID09PSA0ICYmIHJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgY2FsbGJhY2socmVxLnJlc3BvbnNlVGV4dCk7XG4gICAgfVxuICB9XG4gIHJlcS5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG4gIHJlcS5zZW5kKCk7XG59XG5cbmdldFByaW50SW5mbyhcIi9qb2JzXCIsIChkYXRhKSA9PiB7XG4gIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xuICBnZW5lcmF0ZVRhYmxlKGpzb24pO1xufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL2Rhc2hib2FyZC50cyJdLCJzb3VyY2VSb290IjoiIn0=