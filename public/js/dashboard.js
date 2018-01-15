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
    req.open("GET", url, true);
    req.send();
};
getPrintInfo("/jobs", function (data) {
    var json = JSON.parse(data);
    generateTable(json);
});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWQ1NGYwM2FhOGQwYTU2NzM4N2IiLCJ3ZWJwYWNrOi8vLy4vdHMvZGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRWE7QUFFYixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNDLG1EQUFtRDtBQUNuRCxpREFBaUQ7QUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLEtBQUs7SUFDM0MsSUFBSSxLQUFLLEdBQW9CLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM5RyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFL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QUksQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUzQixDQUFDO0FBQ0gsQ0FBQztBQUVELElBQUksWUFBWSxHQUFHLFVBQUMsR0FBVyxFQUFFLFFBQStCO0lBQzlELElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDL0IsR0FBRyxDQUFDLGtCQUFrQixHQUFHO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFRCxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQUMsSUFBSTtJQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL2pzL2Rhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMWQ1NGYwM2FhOGQwYTU2NzM4N2IiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGpvYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvYnNcIik7XG5cbi8vIHdhdGNoIGpvYiB0YWJsZSBhbmQgd2FpdCBmb3IgdXNlciB0byBjbGljayBhcnJvd1xuLy8gdGhlbiBnZW5lcmF0ZSBhIGNoaWxkIHJvd3Mgd2l0aCBhc3NpY2F0ZWQgZGF0YVxuam9icy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIGFycm93ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gIGlmIChhcnJvdy50YWdOYW1lID09PSBcInNwYW5cIiB8fCBhcnJvdy50YWdOYW1lID09PSBcIlNQQU5cIikge1xuICAgIHZhciBwcmludFRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRyLnByaW50cy1yb3dbZGF0YS1qb2ItaWQ9J1wiICsgYXJyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSArIFwiJ11cIik7XG4gICAgaWYgKGFycm93LmdldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiKSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrZWRcIiAsXCJ0cnVlXCIpO1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1jaGV2cm9uLXVwIHRhYmxlLWRyb3Bkb3duXCIpO1xuICAgICAgcHJpbnRUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50cy1yb3cgcHJpbnQtcm93XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi1kb3duIHRhYmxlLWRyb3Bkb3duXCIpXG4gICAgICBwcmludFRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnQtcm93LWhpZGRlbiBwcmludHMtcm93XCIpO1xuICAgIH1cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGZvcm1hdEZpbGVTaXplKGJ5dGVzOiBhbnkpIHtcbiAgdmFyIGV4cCA9IE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKDEwMjQpIHwgMDtcbiAgdmFyIHJlc3VsdCA9IChieXRlcyAvIE1hdGgucG93KDEwMjQsIGV4cCkpLnRvRml4ZWQoMik7XG5cbiAgcmV0dXJuIHJlc3VsdCArICcgJyArIChleHAgPT0gMCA/ICdieXRlcyc6ICdLTUdUUEVaWSdbZXhwIC0gMV0gKyAnQicpO1xufVxuXG4vLyB0YWtlIHRoZSBwcmludHMgcmVsYXRlZCB0byBhIGpvYiBhbmQgcG9wdWxhdGUgYSBoaWRkZW4gdGFibGVcbi8vIHdpdGggcHJpbnQgaW5mb3JtYXRpb24gZm9yIDNkIG1vZGVsc1xuZnVuY3Rpb24gYWRkUHJpbnRzKHByaW50czogYW55KSB7XG4gIHZhciBwcmludFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgcHJpbnRSb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludC1yb3ctaGlkZGVuIHByaW50cy1yb3dcIik7XG4gIHByaW50Um93LnNldEF0dHJpYnV0ZShcImRhdGEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG5cbiAgLy8gdGFibGVzIGluc2lkZSBvZiBhIHRhYmxlIGFyZSBvbmx5IHZhbGlkIGluc2lkZSBhIDx0ZD4gc28gY3JlYXRlIG9uZVxuICB2YXIgcHJpbnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHByaW50Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNvbHNwYW5cIiwgXCI1XCIpO1xuICBcbiAgdmFyIHByaW50c1RhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBwcmludHNUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50cy10YWJsZVwiKTtcblxuICB2YXIgcHJpbnRzSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiKTtcbiAgdmFyIHByaW50c0JvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG5cbiAgdmFyIG5hbWVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICB2YXIgc2l6ZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIHZhciBmaWxhbWVudEhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIHZhciBmaWxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgdmFyIGNvbXBsZXRlZEhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIFxuXG4gIG5hbWVIZWFkLmlubmVySFRNTCA9IFwiRmlsZW5hbWVcIjtcbiAgc2l6ZUhlYWQuaW5uZXJIVE1MID0gXCJGaWxlIFNpemVcIjtcbiAgZmlsYW1lbnRIZWFkLmlubmVySFRNTCA9IFwiRmlsYW1lbnQgVHlwZVwiO1xuICBmaWxlSGVhZC5pbm5lckhUTUwgPSBcIk9wdGlvbnNcIlxuICBjb21wbGV0ZWRIZWFkLmlubmVySFRNTCA9IFwiU3RhdHVzXCI7XG5cbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChuYW1lSGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoc2l6ZUhlYWQpO1xuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKGZpbGFtZW50SGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoZmlsZUhlYWQpO1xuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKGNvbXBsZXRlZEhlYWQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuXG4gICAgdmFyIGZpbGVuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBmaWxlU2l6ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICB2YXIgZmlsYW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdmFyIGRvd25sb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBkb3dubG9hZExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB2YXIgZG93bmxvYWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgdmFyIGNvbXBsZXRlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcblxuXG4gICAgZmlsZW5hbWUuaW5uZXJIVE1MID0gcHJpbnRzW2ldW1wiZmlsZW5hbWVcIl07XG4gICAgZmlsZVNpemUuaW5uZXJIVE1MID0gZm9ybWF0RmlsZVNpemUocHJpbnRzW2ldW1wiZmlsZXNpemVcIl0pO1xuICAgIGZpbGFtZW50LmlubmVySFRNTCA9IHByaW50c1tpXVtcImZpbGFtZW50XCJdO1xuXG4gICAgZG93bmxvYWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBwcmludHNbaV1bXCJwYXRoXCJdKTtcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgcHJpbnRzW2ldW1wiZmlsZW5hbWVcIl0pO1xuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRvd25sb2FkLWxpbmsgdGFibGUtcHJpbWFyeVwiKTtcbiAgICBkb3dubG9hZEljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1kb3dubG9hZFwiKTtcbiAgICBkb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJEb3dubG9hZCBGaWxlXCIpO1xuICAgIGRvd25sb2FkTGluay5hcHBlbmRDaGlsZChkb3dubG9hZEljb24pO1xuICAgIGRvd25sb2FkLmFwcGVuZENoaWxkKGRvd25sb2FkTGluayk7XG5cbiAgICBwcmludC5hcHBlbmRDaGlsZChmaWxlbmFtZSk7XG4gICAgcHJpbnQuYXBwZW5kQ2hpbGQoZmlsZVNpemUpO1xuICAgIHByaW50LmFwcGVuZENoaWxkKGZpbGFtZW50KTtcbiAgICBwcmludC5hcHBlbmRDaGlsZChkb3dubG9hZCk7XG5cbiAgICBwcmludHNCb2R5LmFwcGVuZENoaWxkKHByaW50KTtcbiAgfVxuXG4gIHByaW50c1RhYmxlLmFwcGVuZENoaWxkKHByaW50c0hlYWQpO1xuICBwcmludHNUYWJsZS5hcHBlbmRDaGlsZChwcmludHNCb2R5KTtcbiAgcHJpbnRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJpbnRzVGFibGUpO1xuICBwcmludFJvdy5hcHBlbmRDaGlsZChwcmludENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHByaW50Um93O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlKGRhdGE6IGFueSkge1xuICB2YXIgam9icyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9ic0xpc3RcIik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgdmFyIGlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBudW1PZlByaW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICB2YXIgY29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBjb21wbGV0ZWRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgdmFyIGFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBhcnJvd0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIHJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImpvYi10YWJsZVwiKTtcbiAgICBpZC5pbm5lckhUTUwgPSBkYXRhW2ldW1wiaWRcIl07XG4gICAgaWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBuYW1lLmlubmVySFRNTCA9IGRhdGFbaV1bXCJuYW1lXCJdO1xuICAgIG51bU9mUHJpbnRzLmlubmVySFRNTCA9IGRhdGFbaV1bXCJwcmludHNfZGF0YVwiXS5sZW5ndGg7XG4gICAgbnVtT2ZQcmludHMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJudW1iZXJcIik7XG4gICAgY29tcGxldGVkSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNsb3NlIGNvbnRyb2xzXCIpO1xuXG4gICAgaWYgKGRhdGFbaV1bXCJjb21wbGV0ZWRcIl0gPT09IFwidHJ1ZVwiKSB7XG4gICAgICBjb21wbGV0ZWQuYXBwZW5kQ2hpbGQoY29tcGxldGVkSWNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBsZXRlZC5hcHBlbmRDaGlsZChjb21wbGV0ZWRJY29uKTtcbiAgICB9XG4gICAgY29tcGxldGVkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidGFibGUtY29udHJvbHNcIik7XG4gICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBhcnJvd0ljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBkYXRhW2ldW1wiaWRcIl0pO1xuICAgIGFycm93SWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNoZXZyb24tZG93biB0YWJsZS1kcm9wZG93blwiKTtcbiAgICBhcnJvd0ljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIsIFwiZmFsc2VcIik7XG4gICAgYXJyb3cuYXBwZW5kQ2hpbGQoYXJyb3dJY29uKTtcbiAgICB2YXIgcHJpbnRzID0gYWRkUHJpbnRzKGRhdGFbaV1bXCJwcmludHNfZGF0YVwiXSk7XG4gICAgcHJpbnRzLnNldEF0dHJpYnV0ZShcImRhdGEtam9iLWlkXCIsIGRhdGFbaV1bXCJpZFwiXSk7XG5cbiAgICByb3cuYXBwZW5kQ2hpbGQoaWQpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICByb3cuYXBwZW5kQ2hpbGQobnVtT2ZQcmludHMpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChjb21wbGV0ZWQpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChhcnJvdyk7XG4gICAgam9icy5hcHBlbmRDaGlsZChyb3cpO1xuICAgIGpvYnMuYXBwZW5kQ2hpbGQocHJpbnRzKTtcblxuICB9XG59XG5cbmxldCBnZXRQcmludEluZm8gPSAodXJsOiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogc3RyaW5nKSA9PiBhbnkpIDogdm9pZCA9PiB7XG4gIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBjYWxsYmFjayhyZXEucmVzcG9uc2VUZXh0KTtcbiAgICB9XG4gIH1cbiAgcmVxLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgcmVxLnNlbmQoKTtcbn1cblxuZ2V0UHJpbnRJbmZvKFwiL2pvYnNcIiwgKGRhdGEpID0+IHtcbiAgbGV0IGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xuICBnZW5lcmF0ZVRhYmxlKGpzb24pO1xufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL2Rhc2hib2FyZC50cyJdLCJzb3VyY2VSb290IjoiIn0=