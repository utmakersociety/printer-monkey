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
    target: '/prints/chunk',
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
});
r.on('fileProgress', function (file) {
    var progress = Math.floor(file.progress() * 100);
});
r.on("fileSuccess", function (file, message) {
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
    r.upload();
    r.on("complete", function () {
        fileUpload.open("POST", model.getAttribute("action"), true);
        jsonToFormData(formData, uploadedFiles, "files");
        fileUpload.addEventListener("readystatechange", function () {
            if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 200) {
            }
            else if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 500) {
            }
        }, false);
        fileUpload.send(formData);
    });
}, false);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTZjZWE5YzNhYWQxZGQxZDZjZGQiLCJ3ZWJwYWNrOi8vLy4vdHMvdXBsb2FkLXByaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDL0RhO0FBSWIsSUFBTSxLQUFLLEdBQW9CLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckUsSUFBTSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakUsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyRCxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkQsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN2RCxJQUFNLFFBQVEsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyRSxJQUFNLFFBQVEsR0FBRyxR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TyxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFL0UsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLGNBQWMsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXRGLENBQUM7UUFDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFVixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0FBS0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9qcy9tb2RlbF91cGxvYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU2Y2VhOWMzYWFkMWRkMWQ2Y2RkIiwiXG5cInVzZSBzdHJpY3RcIjtcblxuZGVjbGFyZSB2YXIgUmVzdW1hYmxlOiBhbnk7XG5cbmNvbnN0IG1vZGVsID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW50LWZvcm1cIik7XG5jb25zdCBqb2JJZCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9iSWRcIik7XG5jb25zdCBmdWxsTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnVsbE5hbWVcIik7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIik7XG5jb25zdCBudW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBob25lTnVtXCIpO1xuY29uc3QgYnJvd3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJicm93c2VCdXR0b25cIik7XG5jb25zdCB1cGxvYWRlciA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkXCIpO1xuY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZFByb2dyZXNzXCIpO1xuY29uc3QgZmlsZUNvdW50ID0gMDtcbmNvbnN0IHVwbG9hZGVkRmlsZXM6IEFycmF5PGFueT4gPSBbXTtcblxuY29uc3QgciA9IG5ldyBSZXN1bWFibGUoe1xuICB0YXJnZXQ6Jy9wcmludHMvY2h1bmsnLFxufSk7XG5cbnIuYXNzaWduQnJvd3NlKHVwbG9hZGVyLCBmYWxzZSk7XG5icm93c2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogRXZlbnQpIDogdm9pZCA9PiB7XG4gIHVwbG9hZGVyLmNsaWNrKCk7XG59KTtcblxuci5vbihcImZpbGVBZGRlZFwiLCAoZmlsZTogYW55KSA6IHZvaWQgPT4ge1xuICBjb25zdCB1cGxvYWRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZENvbnRhaW5lclwiKTtcbiAgY29uc3QgZmlsZUluZm8gPSBmaWxlLmZpbGU7XG4gIGNvbnN0IGZpbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBmaWxlTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25zdCBmaWxlQ2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uc3QgZmlsZUNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG5cbiAgZmlsZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpbGVcIik7XG4gIGZpbGVDbG9zZUljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS10aW1lcy1jaXJjbGVcIik7XG4gIGZpbGVDbG9zZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpbGUtY2xvc2VcIik7XG4gIFxuICBmaWxlQ2xvc2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBjbG9zZSA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgY29uc3QgcGFyZW50Q2xvc2UgPSA8SFRNTFNwYW5FbGVtZW50PmNsb3NlLnBhcmVudE5vZGU7XG4gICAgY29uc3QgZmlsZVBhcmVudCA9IDxIVE1MRWxlbWVudD5wYXJlbnRDbG9zZS5wYXJlbnROb2RlO1xuICAgIHIuZmlsZXMucG9wKCk7XG4gICAgZmlsZVBhcmVudC5yZW1vdmUoKTtcbiAgfSwgZmFsc2UpO1xuXG5cbiAgZmlsZU5hbWUuaW5uZXJIVE1MID0gZmlsZUluZm8ubmFtZTtcblxuICBmaWxlQ2xvc2UuYXBwZW5kQ2hpbGQoZmlsZUNsb3NlSWNvbik7XG4gIGZpbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsZU5hbWUpO1xuICBmaWxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGVDbG9zZSk7XG4gIHVwbG9hZENvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxlQ29udGFpbmVyKTtcbiAgXG59KTtcblxuci5vbignZmlsZVByb2dyZXNzJywgKGZpbGU6IGFueSkgOiB2b2lkID0+IHtcbiAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKGZpbGUucHJvZ3Jlc3MoKSAqIDEwMCk7XG59KTtcblxuci5vbihcImZpbGVTdWNjZXNzXCIsIChmaWxlLCBtZXNzYWdlKSA6IHZvaWQgPT4ge1xuICB1cGxvYWRlZEZpbGVzLnB1c2goSlNPTi5wYXJzZShtZXNzYWdlKSk7XG59KVxuXG5jb25zdCBqc29uVG9Gb3JtRGF0YSA9IChmb3JtRGF0YTogRm9ybURhdGEsIGRhdGE6IHt9LCBwYXJlbnRLZXk6IHN0cmluZykgOiB2b2lkID0+IHtcbiAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkgJiYgIShkYXRhIGluc3RhbmNlb2YgRmlsZSkpIHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBqc29uVG9Gb3JtRGF0YShmb3JtRGF0YSwgZGF0YVtrZXldLCBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gIDoga2V5KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB2YWx1ZTogYW55ID0gZGF0YSA9PT0gbnVsbCA/IFwiXCIgOiBkYXRhO1xuICAgIGZvcm1EYXRhLmFwcGVuZChwYXJlbnRLZXksIHZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyhgJHtwYXJlbnRLZXl9OiAke3ZhbHVlfWApO1xuICB9XG59O1xuXG5tb2RlbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cbiBcbiAgY29uc3QgZmlsZSA9IHVwbG9hZGVyLmZpbGVzWzBdO1xuICBjb25zdCBmb3JtRGF0YTogYW55ID0gbmV3IEZvcm1EYXRhKG1vZGVsKTtcbiAgY29uc3QgZmlsZVVwbG9hZCA9IG5ldyBYTUxIdHRwUmVxdWVzdDtcblxuICByLnVwbG9hZCgpO1xuXG4gIHIub24oXCJjb21wbGV0ZVwiLCAoKSA6IHZvaWQgPT4ge1xuICAgIGZpbGVVcGxvYWQub3BlbihcIlBPU1RcIiwgbW9kZWwuZ2V0QXR0cmlidXRlKFwiYWN0aW9uXCIpLCB0cnVlKTtcbiAgICBqc29uVG9Gb3JtRGF0YShmb3JtRGF0YSwgIHVwbG9hZGVkRmlsZXMsIFwiZmlsZXNcIik7XG4gICAgZmlsZVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGZpbGVVcGxvYWQucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGZpbGVVcGxvYWQuc3RhdHVzID09IDIwMCkge1xuICBcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlVXBsb2FkLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSAmJiBmaWxlVXBsb2FkLnN0YXR1cyA9PSA1MDApIHtcbiAgXG4gICAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG4gIFxuICAgIGZpbGVVcGxvYWQuc2VuZChmb3JtRGF0YSk7XG4gIH0pO1xuXG4gIFxuXG5cbn0sIGZhbHNlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy91cGxvYWQtcHJpbnQudHMiXSwic291cmNlUm9vdCI6IiJ9