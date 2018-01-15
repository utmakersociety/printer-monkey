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
// then generate a child rows with assicated data
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
    return result + ' ' + (exp == 0 ? 'bytes' : 'KMGTPEZY'[exp - 1] + 'B');
}
// take the prints related to a job and populate a hidden table
// with print information for 3d models
function addPrints(prints) {
    var printRow = document.createElement("tr");
    printRow.setAttribute("class", "print-row-hidden prints-row");
    printRow.setAttribute("data-hidden", "false");
    // tables inside of a table are only valid inside a <td> so create one
    var printContainer = document.createElement("td");
    printContainer.setAttribute("colspan", "5");
    var printsTable = document.createElement("table");
    printsTable.setAttribute("class", "prints-table");
    var printsHead = document.createElement("thead");
    var printsBody = document.createElement("tbody");
    var nameHead = document.createElement("th");
    var sizeHead = document.createElement("th");
    var filamentHead = document.createElement("th");
    var fileHead = document.createElement("th");
    var completedHead = document.createElement("th");
    nameHead.innerHTML = "Filename";
    sizeHead.innerHTML = "File Size";
    filamentHead.innerHTML = "Filament Type";
    fileHead.innerHTML = "Options";
    completedHead.innerHTML = "Status";
    printsHead.appendChild(nameHead);
    printsHead.appendChild(sizeHead);
    printsHead.appendChild(filamentHead);
    printsHead.appendChild(fileHead);
    printsHead.appendChild(completedHead);
    for (var i = 0; i < prints.length; i++) {
        var print = document.createElement("tr");
        var filename = document.createElement("td");
        var fileSize = document.createElement("td");
        var filament = document.createElement("td");
        var download = document.createElement("td");
        var downloadLink = document.createElement("a");
        var downloadIcon = document.createElement("i");
        var completed = document.createElement("td");
        filename.innerHTML = prints[i]["filename"];
        fileSize.innerHTML = formatFileSize(prints[i]["filesize"]);
        filament.innerHTML = prints[i]["filament"];
        download.setAttribute("class", "table-controls");
        downloadLink.setAttribute("href", prints[i]["path"]);
        downloadLink.setAttribute("download", prints[i]["filename"]);
        downloadLink.setAttribute("class", "download-link table-primary");
        downloadIcon.setAttribute("class", "fa fa-download");
        downloadLink.setAttribute("title", "Download File");
        downloadLink.appendChild(downloadIcon);
        download.appendChild(downloadLink);
        print.appendChild(filename);
        print.appendChild(fileSize);
        print.appendChild(filament);
        print.appendChild(download);
        printsBody.appendChild(print);
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
        var name = document.createElement("td");
        var numOfPrints = document.createElement("td");
        var completed = document.createElement("td");
        var completedIcon = document.createElement("i");
        var arrow = document.createElement("td");
        var arrowIcon = document.createElement("span");
        row.setAttribute("class", "job-table");
        id.innerHTML = data[i]["id"];
        id.setAttribute("class", "table-controls");
        name.innerHTML = data[i]["name"];
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
        row.appendChild(name);
        row.appendChild(numOfPrints);
        row.appendChild(completed);
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
};
getPrintInfo("/jobs", function (data) {
    var json = JSON.parse(data);
    generateTable(json);
});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzhmZmMyYzY3ZDgzYzFkYWEyNGY/MDk2MSIsIndlYnBhY2s6Ly8vLi90cy9kYXNoYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ2hFYTtBQUViLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0MsbURBQW1EO0FBQ25ELGlEQUFpRDtBQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBSztJQUMzQyxJQUFJLEtBQUssR0FBb0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzlHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFD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QUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTNCLENBQUM7QUFDSCxDQUFDO0FBRUQsSUFBSSxZQUFZLEdBQUcsVUFBQyxHQUFXLEVBQUUsUUFBK0I7SUFDOUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUMvQixHQUFHLENBQUMsa0JBQWtCLEdBQUc7UUFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsWUFBWSxDQUFDLE9BQU8sRUFBRSxVQUFDLElBQUk7SUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9qcy9kYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc4ZmZjMmM2N2Q4M2MxZGFhMjRmIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgam9icyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9ic1wiKTtcclxuXHJcbi8vIHdhdGNoIGpvYiB0YWJsZSBhbmQgd2FpdCBmb3IgdXNlciB0byBjbGljayBhcnJvd1xyXG4vLyB0aGVuIGdlbmVyYXRlIGEgY2hpbGQgcm93cyB3aXRoIGFzc2ljYXRlZCBkYXRhXHJcbmpvYnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgdmFyIGFycm93ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XHJcbiAgaWYgKGFycm93LnRhZ05hbWUgPT09IFwic3BhblwiIHx8IGFycm93LnRhZ05hbWUgPT09IFwiU1BBTlwiKSB7XHJcbiAgICB2YXIgcHJpbnRUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ci5wcmludHMtcm93W2RhdGEtam9iLWlkPSdcIiArIGFycm93LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgKyBcIiddXCIpO1xyXG4gICAgaWYgKGFycm93LmdldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiKSA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiICxcInRydWVcIik7XHJcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi11cCB0YWJsZS1kcm9wZG93blwiKTtcclxuICAgICAgcHJpbnRUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50cy1yb3cgcHJpbnQtcm93XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi1kb3duIHRhYmxlLWRyb3Bkb3duXCIpXHJcbiAgICAgIHByaW50VGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludC1yb3ctaGlkZGVuIHByaW50cy1yb3dcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGZvcm1hdEZpbGVTaXplKGJ5dGVzOiBhbnkpIHtcclxuICB2YXIgZXhwID0gTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkgfCAwO1xyXG4gIHZhciByZXN1bHQgPSAoYnl0ZXMgLyBNYXRoLnBvdygxMDI0LCBleHApKS50b0ZpeGVkKDIpO1xyXG5cclxuICByZXR1cm4gcmVzdWx0ICsgJyAnICsgKGV4cCA9PSAwID8gJ2J5dGVzJzogJ0tNR1RQRVpZJ1tleHAgLSAxXSArICdCJyk7XHJcbn1cclxuXHJcbi8vIHRha2UgdGhlIHByaW50cyByZWxhdGVkIHRvIGEgam9iIGFuZCBwb3B1bGF0ZSBhIGhpZGRlbiB0YWJsZVxyXG4vLyB3aXRoIHByaW50IGluZm9ybWF0aW9uIGZvciAzZCBtb2RlbHNcclxuZnVuY3Rpb24gYWRkUHJpbnRzKHByaW50czogYW55KSB7XHJcbiAgdmFyIHByaW50Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gIHByaW50Um93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnQtcm93LWhpZGRlbiBwcmludHMtcm93XCIpO1xyXG4gIHByaW50Um93LnNldEF0dHJpYnV0ZShcImRhdGEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcblxyXG4gIC8vIHRhYmxlcyBpbnNpZGUgb2YgYSB0YWJsZSBhcmUgb25seSB2YWxpZCBpbnNpZGUgYSA8dGQ+IHNvIGNyZWF0ZSBvbmVcclxuICB2YXIgcHJpbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgcHJpbnRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY29sc3BhblwiLCBcIjVcIik7XHJcbiAgXHJcbiAgdmFyIHByaW50c1RhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xyXG4gIHByaW50c1RhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnRzLXRhYmxlXCIpO1xyXG5cclxuICB2YXIgcHJpbnRzSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiKTtcclxuICB2YXIgcHJpbnRzQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcclxuXHJcbiAgdmFyIG5hbWVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gIHZhciBzaXplSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICB2YXIgZmlsYW1lbnRIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xyXG4gIHZhciBmaWxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICB2YXIgY29tcGxldGVkSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICBcclxuXHJcbiAgbmFtZUhlYWQuaW5uZXJIVE1MID0gXCJGaWxlbmFtZVwiO1xyXG4gIHNpemVIZWFkLmlubmVySFRNTCA9IFwiRmlsZSBTaXplXCI7XHJcbiAgZmlsYW1lbnRIZWFkLmlubmVySFRNTCA9IFwiRmlsYW1lbnQgVHlwZVwiO1xyXG4gIGZpbGVIZWFkLmlubmVySFRNTCA9IFwiT3B0aW9uc1wiXHJcbiAgY29tcGxldGVkSGVhZC5pbm5lckhUTUwgPSBcIlN0YXR1c1wiO1xyXG5cclxuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKG5hbWVIZWFkKTtcclxuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKHNpemVIZWFkKTtcclxuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKGZpbGFtZW50SGVhZCk7XHJcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChmaWxlSGVhZCk7XHJcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChjb21wbGV0ZWRIZWFkKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBwcmludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcbiAgICB2YXIgZmlsZW5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICB2YXIgZmlsZVNpemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICB2YXIgZmlsYW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICB2YXIgZG93bmxvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICB2YXIgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICB2YXIgZG93bmxvYWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICB2YXIgY29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG5cclxuXHJcbiAgICBmaWxlbmFtZS5pbm5lckhUTUwgPSBwcmludHNbaV1bXCJmaWxlbmFtZVwiXTtcclxuICAgIGZpbGVTaXplLmlubmVySFRNTCA9IGZvcm1hdEZpbGVTaXplKHByaW50c1tpXVtcImZpbGVzaXplXCJdKTtcclxuICAgIGZpbGFtZW50LmlubmVySFRNTCA9IHByaW50c1tpXVtcImZpbGFtZW50XCJdO1xyXG5cclxuICAgIGRvd25sb2FkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XHJcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBwcmludHNbaV1bXCJwYXRoXCJdKTtcclxuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBwcmludHNbaV1bXCJmaWxlbmFtZVwiXSk7XHJcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkb3dubG9hZC1saW5rIHRhYmxlLXByaW1hcnlcIik7XHJcbiAgICBkb3dubG9hZEljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1kb3dubG9hZFwiKTtcclxuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkRvd25sb2FkIEZpbGVcIik7XHJcbiAgICBkb3dubG9hZExpbmsuYXBwZW5kQ2hpbGQoZG93bmxvYWRJY29uKTtcclxuICAgIGRvd25sb2FkLmFwcGVuZENoaWxkKGRvd25sb2FkTGluayk7XHJcblxyXG4gICAgcHJpbnQuYXBwZW5kQ2hpbGQoZmlsZW5hbWUpO1xyXG4gICAgcHJpbnQuYXBwZW5kQ2hpbGQoZmlsZVNpemUpO1xyXG4gICAgcHJpbnQuYXBwZW5kQ2hpbGQoZmlsYW1lbnQpO1xyXG4gICAgcHJpbnQuYXBwZW5kQ2hpbGQoZG93bmxvYWQpO1xyXG5cclxuICAgIHByaW50c0JvZHkuYXBwZW5kQ2hpbGQocHJpbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpbnRzVGFibGUuYXBwZW5kQ2hpbGQocHJpbnRzSGVhZCk7XHJcbiAgcHJpbnRzVGFibGUuYXBwZW5kQ2hpbGQocHJpbnRzQm9keSk7XHJcbiAgcHJpbnRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJpbnRzVGFibGUpO1xyXG4gIHByaW50Um93LmFwcGVuZENoaWxkKHByaW50Q29udGFpbmVyKTtcclxuXHJcbiAgcmV0dXJuIHByaW50Um93O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlKGRhdGE6IGFueSkge1xyXG4gIHZhciBqb2JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2JzTGlzdFwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICB2YXIgaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICB2YXIgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgIHZhciBudW1PZlByaW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICB2YXIgY29tcGxldGVkSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgdmFyIGFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgdmFyIGFycm93SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG5cclxuICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImpvYi10YWJsZVwiKTtcclxuICAgIGlkLmlubmVySFRNTCA9IGRhdGFbaV1bXCJpZFwiXTtcclxuICAgIGlkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XHJcbiAgICBuYW1lLmlubmVySFRNTCA9IGRhdGFbaV1bXCJuYW1lXCJdO1xyXG4gICAgbnVtT2ZQcmludHMuaW5uZXJIVE1MID0gZGF0YVtpXVtcInByaW50c19kYXRhXCJdLmxlbmd0aDtcclxuICAgIG51bU9mUHJpbnRzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibnVtYmVyXCIpO1xyXG4gICAgY29tcGxldGVkSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNsb3NlIGNvbnRyb2xzXCIpO1xyXG5cclxuICAgIGlmIChkYXRhW2ldW1wiY29tcGxldGVkXCJdID09PSBcInRydWVcIikge1xyXG4gICAgICBjb21wbGV0ZWQuYXBwZW5kQ2hpbGQoY29tcGxldGVkSWNvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb21wbGV0ZWQuYXBwZW5kQ2hpbGQoY29tcGxldGVkSWNvbik7XHJcbiAgICB9XHJcbiAgICBjb21wbGV0ZWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcclxuICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XHJcbiAgICBhcnJvd0ljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBkYXRhW2ldW1wiaWRcIl0pO1xyXG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi1kb3duIHRhYmxlLWRyb3Bkb3duXCIpO1xyXG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgYXJyb3cuYXBwZW5kQ2hpbGQoYXJyb3dJY29uKTtcclxuICAgIHZhciBwcmludHMgPSBhZGRQcmludHMoZGF0YVtpXVtcInByaW50c19kYXRhXCJdKTtcclxuICAgIHByaW50cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWpvYi1pZFwiLCBkYXRhW2ldW1wiaWRcIl0pO1xyXG5cclxuICAgIHJvdy5hcHBlbmRDaGlsZChpZCk7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQobmFtZSk7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQobnVtT2ZQcmludHMpO1xyXG4gICAgcm93LmFwcGVuZENoaWxkKGNvbXBsZXRlZCk7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQoYXJyb3cpO1xyXG4gICAgam9icy5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgam9icy5hcHBlbmRDaGlsZChwcmludHMpO1xyXG5cclxuICB9XHJcbn1cclxuXHJcbmxldCBnZXRQcmludEluZm8gPSAodXJsOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogc3RyaW5nKSA9PiBhbnkpIDogdm9pZCA9PiB7XHJcbiAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVRleHQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZ2V0UHJpbnRJbmZvKFwiL2pvYnNcIiwgKGRhdGEpID0+IHtcclxuICBsZXQganNvbiA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgZ2VuZXJhdGVUYWJsZShqc29uKTtcclxufSlcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvZGFzaGJvYXJkLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==