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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
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
    // delete removed file from resumable files[]
    // and remove the element when fileClose Icon is clicked
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
// format file progress
r.on('fileProgress', function (file) {
    var progress = Math.floor(file.progress() * 100);
});
r.on("fileSuccess", function (file, message) {
    uploadedFiles.push(JSON.parse(message));
});
// loop through properties and transform it into form data to append to the form to send
var jsonToFormData = function (formData, data, parentKey) {
    if (data && typeof data === "object" && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(function (key) {
            jsonToFormData(formData, data[key], parentKey ? parentKey + "[" + key + "]" : key);
        });
    }
    else {
        var value = data === null ? "" : data;
        formData.append(parentKey, value);
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

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDZkZGY1YWMyMzQ3OGI1ZGY3ZTE/NWFkZiIsIndlYnBhY2s6Ly8vLi90cy91cGxvYWQtcHJpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUMvRGE7QUFJYixJQUFNLEtBQUssR0FBb0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyRSxJQUFNLEtBQUssR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqRSxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0MsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3ZELElBQU0sUUFBUSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JFLElBQU0sUUFBUSxH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QUUsT0FBTyxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFL0UsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLGNBQWMsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXRGLENBQUM7UUFDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFVixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0FBS0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9qcy9tb2RlbF91cGxvYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA2ZGRmNWFjMjM0NzhiNWRmN2UxIiwiXG5cInVzZSBzdHJpY3RcIjtcblxuZGVjbGFyZSB2YXIgUmVzdW1hYmxlOiBhbnk7XG5cbmNvbnN0IG1vZGVsID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW50LWZvcm1cIik7XG5jb25zdCBqb2JJZCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9iSWRcIik7XG5jb25zdCBmdWxsTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnVsbE5hbWVcIik7XG5jb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIik7XG5jb25zdCBudW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBob25lTnVtXCIpO1xuY29uc3QgYnJvd3NlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJicm93c2VCdXR0b25cIik7XG5jb25zdCB1cGxvYWRlciA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkXCIpO1xuY29uc3QgcHJvZ3Jlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZFByb2dyZXNzXCIpO1xuY29uc3QgZmlsZUNvdW50ID0gMDtcbmNvbnN0IHVwbG9hZGVkRmlsZXM6IEFycmF5PGFueT4gPSBbXTtcblxuY29uc3QgciA9IG5ldyBSZXN1bWFibGUoe1xuICB0YXJnZXQ6Jy9wcmludHMvY2h1bmsnLFxufSk7XG5cbnIuYXNzaWduQnJvd3NlKHVwbG9hZGVyLCBmYWxzZSk7XG5icm93c2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogRXZlbnQpIDogdm9pZCA9PiB7XG4gIHVwbG9hZGVyLmNsaWNrKCk7XG59KTtcblxuci5vbihcImZpbGVBZGRlZFwiLCAoZmlsZTogYW55KSA6IHZvaWQgPT4ge1xuICBjb25zdCB1cGxvYWRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZENvbnRhaW5lclwiKTtcbiAgY29uc3QgZmlsZUluZm8gPSBmaWxlLmZpbGU7XG4gIGNvbnN0IGZpbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBmaWxlTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25zdCBmaWxlQ2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uc3QgZmlsZUNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG5cbiAgZmlsZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpbGVcIik7XG4gIGZpbGVDbG9zZUljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS10aW1lcy1jaXJjbGVcIik7XG4gIGZpbGVDbG9zZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpbGUtY2xvc2VcIik7XG4gIFxuICAvLyBkZWxldGUgcmVtb3ZlZCBmaWxlIGZyb20gcmVzdW1hYmxlIGZpbGVzW11cbiAgLy8gYW5kIHJlbW92ZSB0aGUgZWxlbWVudCB3aGVuIGZpbGVDbG9zZSBJY29uIGlzIGNsaWNrZWRcbiAgZmlsZUNsb3NlSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgY2xvc2UgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHBhcmVudENsb3NlID0gPEhUTUxTcGFuRWxlbWVudD5jbG9zZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGZpbGVQYXJlbnQgPSA8SFRNTEVsZW1lbnQ+cGFyZW50Q2xvc2UucGFyZW50Tm9kZTtcbiAgICByLmZpbGVzLnBvcCgpO1xuICAgIGZpbGVQYXJlbnQucmVtb3ZlKCk7XG4gIH0sIGZhbHNlKTtcblxuXG4gIGZpbGVOYW1lLmlubmVySFRNTCA9IGZpbGVJbmZvLm5hbWU7XG5cbiAgZmlsZUNsb3NlLmFwcGVuZENoaWxkKGZpbGVDbG9zZUljb24pO1xuICBmaWxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGVOYW1lKTtcbiAgZmlsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxlQ2xvc2UpO1xuICB1cGxvYWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsZUNvbnRhaW5lcik7XG4gIFxufSk7XG5cbi8vIGZvcm1hdCBmaWxlIHByb2dyZXNzXG5yLm9uKCdmaWxlUHJvZ3Jlc3MnLCAoZmlsZTogYW55KSA6IHZvaWQgPT4ge1xuICBjb25zdCBwcm9ncmVzcyA9IE1hdGguZmxvb3IoZmlsZS5wcm9ncmVzcygpICogMTAwKTtcbn0pO1xuXG5yLm9uKFwiZmlsZVN1Y2Nlc3NcIiwgKGZpbGUsIG1lc3NhZ2UpIDogdm9pZCA9PiB7XG4gIHVwbG9hZGVkRmlsZXMucHVzaChKU09OLnBhcnNlKG1lc3NhZ2UpKTtcbn0pXG5cbi8vIGxvb3AgdGhyb3VnaCBwcm9wZXJ0aWVzIGFuZCB0cmFuc2Zvcm0gaXQgaW50byBmb3JtIGRhdGEgdG8gYXBwZW5kIHRvIHRoZSBmb3JtIHRvIHNlbmRcbmNvbnN0IGpzb25Ub0Zvcm1EYXRhID0gKGZvcm1EYXRhOiBGb3JtRGF0YSwgZGF0YToge30sIHBhcmVudEtleTogc3RyaW5nKSA6IHZvaWQgPT4ge1xuICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBGaWxlKSkge1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGpzb25Ub0Zvcm1EYXRhKGZvcm1EYXRhLCBkYXRhW2tleV0sIHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXkpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHZhbHVlOiBhbnkgPSBkYXRhID09PSBudWxsID8gXCJcIiA6IGRhdGE7XG4gICAgZm9ybURhdGEuYXBwZW5kKHBhcmVudEtleSwgdmFsdWUpO1xuICB9XG59O1xuXG5tb2RlbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGZpbGUgPSB1cGxvYWRlci5maWxlc1swXTtcbiAgY29uc3QgZm9ybURhdGE6IGFueSA9IG5ldyBGb3JtRGF0YShtb2RlbCk7XG4gIGNvbnN0IGZpbGVVcGxvYWQgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XG5cbiAgci51cGxvYWQoKTtcblxuICByLm9uKFwiY29tcGxldGVcIiwgKCkgOiB2b2lkID0+IHtcbiAgICBmaWxlVXBsb2FkLm9wZW4oXCJQT1NUXCIsIG1vZGVsLmdldEF0dHJpYnV0ZShcImFjdGlvblwiKSwgdHJ1ZSk7XG4gICAganNvblRvRm9ybURhdGEoZm9ybURhdGEsICB1cGxvYWRlZEZpbGVzLCBcImZpbGVzXCIpO1xuICAgIGZpbGVVcGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoZmlsZVVwbG9hZC5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgZmlsZVVwbG9hZC5zdGF0dXMgPT0gMjAwKSB7XG4gIFxuICAgICAgICB9IGVsc2UgaWYgKGZpbGVVcGxvYWQucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGZpbGVVcGxvYWQuc3RhdHVzID09IDUwMCkge1xuICBcbiAgICAgICAgfVxuICAgIH0sIGZhbHNlKTtcbiAgXG4gICAgZmlsZVVwbG9hZC5zZW5kKGZvcm1EYXRhKTtcbiAgfSk7XG5cbiAgXG5cblxufSwgZmFsc2UpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RzL3VwbG9hZC1wcmludC50cyJdLCJzb3VyY2VSb290IjoiIn0=