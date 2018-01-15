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
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var model = document.getElementById("print-form");
var jobId = document.getElementById("jobId");
var fullName = document.getElementById("fullName");
var email = document.getElementById("email");
var number = document.getElementById("phoneNum");
var browse = document.getElementById("browseButton");
var uploader = document.getElementById("upload");
var progress = document.getElementById("uploadProgress");
var fileCount = 0;
var uploadedFiles = [];
var r = new Resumable({
    target: '/uploads/chunk',
});
r.assignBrowse(uploader, false);
browse.addEventListener("click", function (event) {
    uploader.click();
});
r.on("fileAdded", function (file) {
    var uploadContainer = document.getElementById("uploadContainer");
    var fileInfo = file.file;
    var fileContainer = document.createElement("div");
    var fileName = document.createElement("span");
    var fileClose = document.createElement("span");
    var fileCloseIcon = document.createElement("i");
    fileContainer.setAttribute("class", "file");
    fileCloseIcon.setAttribute("class", "fa fa-times-circle");
    fileClose.setAttribute("class", "file-close");
    fileCloseIcon.addEventListener("click", function (event) {
        event.preventDefault();
        var close = event.target;
        var parentClose = close.parentNode;
        var fileParent = parentClose.parentNode;
        r.files.pop();
        fileParent.remove();
    }, false);
    fileName.innerHTML = fileInfo.name;
    fileClose.appendChild(fileCloseIcon);
    fileContainer.appendChild(fileName);
    fileContainer.appendChild(fileClose);
    uploadContainer.appendChild(fileContainer);
    r.upload();
});
r.on('fileProgress', function (file) {
    var progress = Math.floor(file.progress() * 100);
});
r.on("fileSuccess", function (file, message) {
    console.log(message);
    uploadedFiles.push(JSON.parse(message));
});
var jsonToFormData = function (formData, data, parentKey) {
    if (data && typeof data === "object" && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(function (key) {
            jsonToFormData(formData, data[key], parentKey ? parentKey + "[" + key + "]" : key);
        });
    }
    else {
        var value = data === null ? "" : data;
        formData.append(parentKey, value);
        console.log(parentKey + ": " + value);
    }
};
model.addEventListener("submit", function (event) {
    event.preventDefault();
    var file = uploader.files[0];
    var formData = new FormData(model);
    var fileUpload = new XMLHttpRequest;
    fileUpload.open("POST", model.getAttribute("action"), true);
    jsonToFormData(formData, uploadedFiles, "files");
    fileUpload.addEventListener("readystatechange", function () {
        if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 200) {
        }
        else if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 500) {
        }
    }, false);
    fileUpload.send(formData);
}, false);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjIzYzczNDRmOTkwMjA5NWRiZGEiLCJ3ZWJwYWNrOi8vLy4vdHMvdXBsb2FkLXByaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDL0RhO0FBSWIsSUFBSSxLQUFLLEdBQW9CLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbkUsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0QsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNyRCxJQUFJLFFBQVEsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuRSxJQUFJLFFBQVEsR0FBRyxR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RUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7UUFDNUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxjQUFjLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUvRSxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFdEYsQ0FBQztJQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUVWLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFJNUIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9qcy9tb2RlbF91cGxvYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIyM2M3MzQ0Zjk5MDIwOTVkYmRhIiwiXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuZGVjbGFyZSB2YXIgUmVzdW1hYmxlOiBhbnk7XHJcblxyXG5sZXQgbW9kZWwgPSA8SFRNTEZvcm1FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpbnQtZm9ybVwiKTtcclxubGV0IGpvYklkID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2JJZFwiKTtcclxubGV0IGZ1bGxOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmdWxsTmFtZVwiKTtcclxubGV0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKTtcclxubGV0IG51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGhvbmVOdW1cIik7XHJcbmxldCBicm93c2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJyb3dzZUJ1dHRvblwiKTtcclxubGV0IHVwbG9hZGVyID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRcIik7XHJcbmxldCBwcm9ncmVzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkUHJvZ3Jlc3NcIik7XHJcbmxldCBmaWxlQ291bnQgPSAwO1xyXG5sZXQgdXBsb2FkZWRGaWxlczogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxubGV0IHIgPSBuZXcgUmVzdW1hYmxlKHtcclxuICB0YXJnZXQ6Jy91cGxvYWRzL2NodW5rJyxcclxufSk7XHJcblxyXG5yLmFzc2lnbkJyb3dzZSh1cGxvYWRlciwgZmFsc2UpO1xyXG5icm93c2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgdXBsb2FkZXIuY2xpY2soKTtcclxufSk7XHJcblxyXG5yLm9uKFwiZmlsZUFkZGVkXCIsIGZ1bmN0aW9uKGZpbGU6IGFueSkge1xyXG4gIGxldCB1cGxvYWRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZENvbnRhaW5lclwiKTtcclxuICBsZXQgZmlsZUluZm8gPSBmaWxlLmZpbGU7XHJcbiAgbGV0IGZpbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGxldCBmaWxlTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIGxldCBmaWxlQ2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICBsZXQgZmlsZUNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG5cclxuXHJcbiAgZmlsZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpbGVcIik7XHJcbiAgZmlsZUNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhIGZhLXRpbWVzLWNpcmNsZVwiKTtcclxuICBmaWxlQ2xvc2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmaWxlLWNsb3NlXCIpO1xyXG4gIFxyXG4gIGZpbGVDbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogRXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgY2xvc2UgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG4gICAgbGV0IHBhcmVudENsb3NlID0gPEhUTUxTcGFuRWxlbWVudD5jbG9zZS5wYXJlbnROb2RlO1xyXG4gICAgbGV0IGZpbGVQYXJlbnQgPSA8SFRNTEVsZW1lbnQ+cGFyZW50Q2xvc2UucGFyZW50Tm9kZTtcclxuICAgIHIuZmlsZXMucG9wKCk7XHJcbiAgICBmaWxlUGFyZW50LnJlbW92ZSgpO1xyXG4gIH0sIGZhbHNlKTtcclxuXHJcblxyXG4gIGZpbGVOYW1lLmlubmVySFRNTCA9IGZpbGVJbmZvLm5hbWU7XHJcblxyXG4gIGZpbGVDbG9zZS5hcHBlbmRDaGlsZChmaWxlQ2xvc2VJY29uKTtcclxuICBmaWxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGVOYW1lKTtcclxuICBmaWxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGVDbG9zZSk7XHJcbiAgdXBsb2FkQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGVDb250YWluZXIpO1xyXG4gIHIudXBsb2FkKCk7XHJcbn0pO1xyXG5cclxuci5vbignZmlsZVByb2dyZXNzJywgZnVuY3Rpb24oZmlsZTogYW55KXtcclxuICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKGZpbGUucHJvZ3Jlc3MoKSAqIDEwMCk7XHJcbn0pO1xyXG5cclxuci5vbihcImZpbGVTdWNjZXNzXCIsIChmaWxlLCBtZXNzYWdlKSA9PiB7XHJcbiAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgdXBsb2FkZWRGaWxlcy5wdXNoKEpTT04ucGFyc2UobWVzc2FnZSkpO1xyXG59KVxyXG5cclxubGV0IGpzb25Ub0Zvcm1EYXRhID0gKGZvcm1EYXRhOiBGb3JtRGF0YSwgZGF0YToge30sIHBhcmVudEtleTogc3RyaW5nKSA6IHZvaWQgPT4ge1xyXG4gIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpICYmICEoZGF0YSBpbnN0YW5jZW9mIEZpbGUpKSB7XHJcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGpzb25Ub0Zvcm1EYXRhKGZvcm1EYXRhLCBkYXRhW2tleV0sIHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXkpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHZhbHVlOiBhbnkgPSBkYXRhID09PSBudWxsID8gXCJcIiA6IGRhdGE7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQocGFyZW50S2V5LCB2YWx1ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhgJHtwYXJlbnRLZXl9OiAke3ZhbHVlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZXZlbnQ6IEV2ZW50KSB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG4gXHJcbiAgbGV0IGZpbGUgPSB1cGxvYWRlci5maWxlc1swXTtcclxuICBsZXQgZm9ybURhdGE6IGFueSA9IG5ldyBGb3JtRGF0YShtb2RlbCk7XHJcbiAgbGV0IGZpbGVVcGxvYWQgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XHJcblxyXG4gIGZpbGVVcGxvYWQub3BlbihcIlBPU1RcIiwgbW9kZWwuZ2V0QXR0cmlidXRlKFwiYWN0aW9uXCIpLCB0cnVlKTtcclxuICBqc29uVG9Gb3JtRGF0YShmb3JtRGF0YSwgIHVwbG9hZGVkRmlsZXMsIFwiZmlsZXNcIik7XHJcbiAgZmlsZVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKGZpbGVVcGxvYWQucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGZpbGVVcGxvYWQuc3RhdHVzID09IDIwMCkge1xyXG5cclxuICAgICAgfSBlbHNlIGlmIChmaWxlVXBsb2FkLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSAmJiBmaWxlVXBsb2FkLnN0YXR1cyA9PSA1MDApIHtcclxuXHJcbiAgICAgIH1cclxuICB9LCBmYWxzZSk7XHJcblxyXG4gIGZpbGVVcGxvYWQuc2VuZChmb3JtRGF0YSk7XHJcbiAgXHJcblxyXG5cclxufSwgZmFsc2UpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL3VwbG9hZC1wcmludC50cyJdLCJzb3VyY2VSb290IjoiIn0=