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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjUwZWJmYWVjMzJiOTdhZDliZTk/MzdmNSIsIndlYnBhY2s6Ly8vLi90cy9kYXNoYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ2hFYTtBQUViLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0MsbURBQW1EO0FBQ25ELGlEQUFpRDtBQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBSztJQUMzQyxJQUFJLEtBQUssR0FBb0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzlHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFD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QUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTNCLENBQUM7QUFDSCxDQUFDO0FBRUQsSUFBSSxZQUFZLEdBQUcsVUFBQyxHQUFXLEVBQUUsUUFBK0I7SUFDOUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUMvQixHQUFHLENBQUMsa0JBQWtCLEdBQUc7UUFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2IsQ0FBQztBQUVELFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFJO0lBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvanMvZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNTBlYmZhZWMzMmI5N2FkOWJlOSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgam9icyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9ic1wiKTtcblxuLy8gd2F0Y2ggam9iIHRhYmxlIGFuZCB3YWl0IGZvciB1c2VyIHRvIGNsaWNrIGFycm93XG4vLyB0aGVuIGdlbmVyYXRlIGEgY2hpbGQgcm93cyB3aXRoIGFzc2ljYXRlZCBkYXRhXG5qb2JzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICB2YXIgYXJyb3cgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgaWYgKGFycm93LnRhZ05hbWUgPT09IFwic3BhblwiIHx8IGFycm93LnRhZ05hbWUgPT09IFwiU1BBTlwiKSB7XG4gICAgdmFyIHByaW50VGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidHIucHJpbnRzLXJvd1tkYXRhLWpvYi1pZD0nXCIgKyBhcnJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpICsgXCInXVwiKTtcbiAgICBpZiAoYXJyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1jbGlja2VkXCIpID09PSBcImZhbHNlXCIpIHtcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiICxcInRydWVcIik7XG4gICAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWNoZXZyb24tdXAgdGFibGUtZHJvcGRvd25cIik7XG4gICAgICBwcmludFRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnRzLXJvdyBwcmludC1yb3dcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFycm93LnNldEF0dHJpYnV0ZShcImRhdGEtY2xpY2tlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgYXJyb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS1jaGV2cm9uLWRvd24gdGFibGUtZHJvcGRvd25cIilcbiAgICAgIHByaW50VGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmludC1yb3ctaGlkZGVuIHByaW50cy1yb3dcIik7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gZm9ybWF0RmlsZVNpemUoYnl0ZXM6IGFueSkge1xuICB2YXIgZXhwID0gTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coMTAyNCkgfCAwO1xuICB2YXIgcmVzdWx0ID0gKGJ5dGVzIC8gTWF0aC5wb3coMTAyNCwgZXhwKSkudG9GaXhlZCgyKTtcblxuICByZXR1cm4gcmVzdWx0ICsgJyAnICsgKGV4cCA9PSAwID8gJ2J5dGVzJzogJ0tNR1RQRVpZJ1tleHAgLSAxXSArICdCJyk7XG59XG5cbi8vIHRha2UgdGhlIHByaW50cyByZWxhdGVkIHRvIGEgam9iIGFuZCBwb3B1bGF0ZSBhIGhpZGRlbiB0YWJsZVxuLy8gd2l0aCBwcmludCBpbmZvcm1hdGlvbiBmb3IgM2QgbW9kZWxzXG5mdW5jdGlvbiBhZGRQcmludHMocHJpbnRzOiBhbnkpIHtcbiAgdmFyIHByaW50Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICBwcmludFJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByaW50LXJvdy1oaWRkZW4gcHJpbnRzLXJvd1wiKTtcbiAgcHJpbnRSb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcblxuICAvLyB0YWJsZXMgaW5zaWRlIG9mIGEgdGFibGUgYXJlIG9ubHkgdmFsaWQgaW5zaWRlIGEgPHRkPiBzbyBjcmVhdGUgb25lXG4gIHZhciBwcmludENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgcHJpbnRDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY29sc3BhblwiLCBcIjVcIik7XG4gIFxuICB2YXIgcHJpbnRzVGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHByaW50c1RhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJpbnRzLXRhYmxlXCIpO1xuXG4gIHZhciBwcmludHNIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xuICB2YXIgcHJpbnRzQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcblxuICB2YXIgbmFtZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIHZhciBzaXplSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgdmFyIGZpbGFtZW50SGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgdmFyIGZpbGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICB2YXIgY29tcGxldGVkSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgXG5cbiAgbmFtZUhlYWQuaW5uZXJIVE1MID0gXCJGaWxlbmFtZVwiO1xuICBzaXplSGVhZC5pbm5lckhUTUwgPSBcIkZpbGUgU2l6ZVwiO1xuICBmaWxhbWVudEhlYWQuaW5uZXJIVE1MID0gXCJGaWxhbWVudCBUeXBlXCI7XG4gIGZpbGVIZWFkLmlubmVySFRNTCA9IFwiT3B0aW9uc1wiXG4gIGNvbXBsZXRlZEhlYWQuaW5uZXJIVE1MID0gXCJTdGF0dXNcIjtcblxuICBwcmludHNIZWFkLmFwcGVuZENoaWxkKG5hbWVIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChzaXplSGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoZmlsYW1lbnRIZWFkKTtcbiAgcHJpbnRzSGVhZC5hcHBlbmRDaGlsZChmaWxlSGVhZCk7XG4gIHByaW50c0hlYWQuYXBwZW5kQ2hpbGQoY29tcGxldGVkSGVhZCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmludHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcHJpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG5cbiAgICB2YXIgZmlsZW5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdmFyIGZpbGVTaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBmaWxhbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICB2YXIgZG93bmxvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdmFyIGRvd25sb2FkTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHZhciBkb3dubG9hZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICB2YXIgY29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuXG5cbiAgICBmaWxlbmFtZS5pbm5lckhUTUwgPSBwcmludHNbaV1bXCJmaWxlbmFtZVwiXTtcbiAgICBmaWxlU2l6ZS5pbm5lckhUTUwgPSBmb3JtYXRGaWxlU2l6ZShwcmludHNbaV1bXCJmaWxlc2l6ZVwiXSk7XG4gICAgZmlsYW1lbnQuaW5uZXJIVE1MID0gcHJpbnRzW2ldW1wiZmlsYW1lbnRcIl07XG5cbiAgICBkb3dubG9hZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHByaW50c1tpXVtcInBhdGhcIl0pO1xuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBwcmludHNbaV1bXCJmaWxlbmFtZVwiXSk7XG4gICAgZG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZG93bmxvYWQtbGluayB0YWJsZS1wcmltYXJ5XCIpO1xuICAgIGRvd25sb2FkSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLWRvd25sb2FkXCIpO1xuICAgIGRvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkRvd25sb2FkIEZpbGVcIik7XG4gICAgZG93bmxvYWRMaW5rLmFwcGVuZENoaWxkKGRvd25sb2FkSWNvbik7XG4gICAgZG93bmxvYWQuYXBwZW5kQ2hpbGQoZG93bmxvYWRMaW5rKTtcblxuICAgIHByaW50LmFwcGVuZENoaWxkKGZpbGVuYW1lKTtcbiAgICBwcmludC5hcHBlbmRDaGlsZChmaWxlU2l6ZSk7XG4gICAgcHJpbnQuYXBwZW5kQ2hpbGQoZmlsYW1lbnQpO1xuICAgIHByaW50LmFwcGVuZENoaWxkKGRvd25sb2FkKTtcblxuICAgIHByaW50c0JvZHkuYXBwZW5kQ2hpbGQocHJpbnQpO1xuICB9XG5cbiAgcHJpbnRzVGFibGUuYXBwZW5kQ2hpbGQocHJpbnRzSGVhZCk7XG4gIHByaW50c1RhYmxlLmFwcGVuZENoaWxkKHByaW50c0JvZHkpO1xuICBwcmludENvbnRhaW5lci5hcHBlbmRDaGlsZChwcmludHNUYWJsZSk7XG4gIHByaW50Um93LmFwcGVuZENoaWxkKHByaW50Q29udGFpbmVyKTtcblxuICByZXR1cm4gcHJpbnRSb3c7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGFibGUoZGF0YTogYW55KSB7XG4gIHZhciBqb2JzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2JzTGlzdFwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB2YXIgaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdmFyIG51bU9mUHJpbnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgIHZhciBjb21wbGV0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdmFyIGNvbXBsZXRlZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICB2YXIgYXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgdmFyIGFycm93SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgcm93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiam9iLXRhYmxlXCIpO1xuICAgIGlkLmlubmVySFRNTCA9IGRhdGFbaV1bXCJpZFwiXTtcbiAgICBpZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuICAgIG5hbWUuaW5uZXJIVE1MID0gZGF0YVtpXVtcIm5hbWVcIl07XG4gICAgbnVtT2ZQcmludHMuaW5uZXJIVE1MID0gZGF0YVtpXVtcInByaW50c19kYXRhXCJdLmxlbmd0aDtcbiAgICBudW1PZlByaW50cy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm51bWJlclwiKTtcbiAgICBjb21wbGV0ZWRJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2xvc2UgY29udHJvbHNcIik7XG5cbiAgICBpZiAoZGF0YVtpXVtcImNvbXBsZXRlZFwiXSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgIGNvbXBsZXRlZC5hcHBlbmRDaGlsZChjb21wbGV0ZWRJY29uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGVkLmFwcGVuZENoaWxkKGNvbXBsZXRlZEljb24pO1xuICAgIH1cbiAgICBjb21wbGV0ZWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0YWJsZS1jb250cm9sc1wiKTtcbiAgICBhcnJvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRhYmxlLWNvbnRyb2xzXCIpO1xuICAgIGFycm93SWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGRhdGFbaV1bXCJpZFwiXSk7XG4gICAgYXJyb3dJY29uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmEgZmEtY2hldnJvbi1kb3duIHRhYmxlLWRyb3Bkb3duXCIpO1xuICAgIGFycm93SWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNsaWNrZWRcIiwgXCJmYWxzZVwiKTtcbiAgICBhcnJvdy5hcHBlbmRDaGlsZChhcnJvd0ljb24pO1xuICAgIHZhciBwcmludHMgPSBhZGRQcmludHMoZGF0YVtpXVtcInByaW50c19kYXRhXCJdKTtcbiAgICBwcmludHMuc2V0QXR0cmlidXRlKFwiZGF0YS1qb2ItaWRcIiwgZGF0YVtpXVtcImlkXCJdKTtcblxuICAgIHJvdy5hcHBlbmRDaGlsZChpZCk7XG4gICAgcm93LmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIHJvdy5hcHBlbmRDaGlsZChudW1PZlByaW50cyk7XG4gICAgcm93LmFwcGVuZENoaWxkKGNvbXBsZXRlZCk7XG4gICAgcm93LmFwcGVuZENoaWxkKGFycm93KTtcbiAgICBqb2JzLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgam9icy5hcHBlbmRDaGlsZChwcmludHMpO1xuXG4gIH1cbn1cblxubGV0IGdldFByaW50SW5mbyA9ICh1cmw6IHN0cmluZywgY2FsbGJhY2s6IChkYXRhOiBzdHJpbmcpID0+IGFueSkgOiB2b2lkID0+IHtcbiAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVRleHQpO1xuICAgIH1cbiAgfVxuICByZXEub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICByZXEuc2VuZCgpO1xufVxuXG5nZXRQcmludEluZm8oXCIvam9ic1wiLCAoZGF0YSkgPT4ge1xuICBsZXQganNvbiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGdlbmVyYXRlVGFibGUoanNvbik7XG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdHMvZGFzaGJvYXJkLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==