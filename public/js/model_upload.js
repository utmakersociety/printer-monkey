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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjNhMGMwODc2NWExMTJjZjBhMjAiLCJ3ZWJwYWNrOi8vLy4vdHMvdXBsb2FkLXByaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDL0RhO0FBSWIsSUFBSSxLQUFLLEdBQW9CLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbkUsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0QsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNyRCxJQUFJLFFBQVEsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuRSxJQUFJLFFBQVEsR0FBRyxR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QUFPLENBQUMsQ0FBQztRQUNsRCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7WUFDNUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxjQUFjLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUUvRSxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFdEYsQ0FBQztRQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVWLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFLTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL2pzL21vZGVsX3VwbG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjNhMGMwODc2NWExMTJjZjBhMjAiLCJcblwidXNlIHN0cmljdFwiO1xuXG5kZWNsYXJlIHZhciBSZXN1bWFibGU6IGFueTtcblxubGV0IG1vZGVsID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW50LWZvcm1cIik7XG5sZXQgam9iSWQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvYklkXCIpO1xubGV0IGZ1bGxOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmdWxsTmFtZVwiKTtcbmxldCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIik7XG5sZXQgbnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwaG9uZU51bVwiKTtcbmxldCBicm93c2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJyb3dzZUJ1dHRvblwiKTtcbmxldCB1cGxvYWRlciA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBsb2FkXCIpO1xubGV0IHByb2dyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRQcm9ncmVzc1wiKTtcbmxldCBmaWxlQ291bnQgPSAwO1xubGV0IHVwbG9hZGVkRmlsZXM6IEFycmF5PGFueT4gPSBbXTtcblxubGV0IHIgPSBuZXcgUmVzdW1hYmxlKHtcbiAgdGFyZ2V0OicvdXBsb2Fkcy9jaHVuaycsXG59KTtcblxuci5hc3NpZ25Ccm93c2UodXBsb2FkZXIsIGZhbHNlKTtcbmJyb3dzZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgdXBsb2FkZXIuY2xpY2soKTtcbn0pO1xuXG5yLm9uKFwiZmlsZUFkZGVkXCIsIGZ1bmN0aW9uKGZpbGU6IGFueSkge1xuICBsZXQgdXBsb2FkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRDb250YWluZXJcIik7XG4gIGxldCBmaWxlSW5mbyA9IGZpbGUuZmlsZTtcbiAgbGV0IGZpbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgZmlsZU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgbGV0IGZpbGVDbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBsZXQgZmlsZUNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG5cbiAgZmlsZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpbGVcIik7XG4gIGZpbGVDbG9zZUljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYSBmYS10aW1lcy1jaXJjbGVcIik7XG4gIGZpbGVDbG9zZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZpbGUtY2xvc2VcIik7XG4gIFxuICBmaWxlQ2xvc2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY2xvc2UgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGxldCBwYXJlbnRDbG9zZSA9IDxIVE1MU3BhbkVsZW1lbnQ+Y2xvc2UucGFyZW50Tm9kZTtcbiAgICBsZXQgZmlsZVBhcmVudCA9IDxIVE1MRWxlbWVudD5wYXJlbnRDbG9zZS5wYXJlbnROb2RlO1xuICAgIHIuZmlsZXMucG9wKCk7XG4gICAgZmlsZVBhcmVudC5yZW1vdmUoKTtcbiAgfSwgZmFsc2UpO1xuXG5cbiAgZmlsZU5hbWUuaW5uZXJIVE1MID0gZmlsZUluZm8ubmFtZTtcblxuICBmaWxlQ2xvc2UuYXBwZW5kQ2hpbGQoZmlsZUNsb3NlSWNvbik7XG4gIGZpbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsZU5hbWUpO1xuICBmaWxlQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGVDbG9zZSk7XG4gIHVwbG9hZENvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxlQ29udGFpbmVyKTtcbiAgXG59KTtcblxuci5vbignZmlsZVByb2dyZXNzJywgZnVuY3Rpb24oZmlsZTogYW55KXtcbiAgbGV0IHByb2dyZXNzID0gTWF0aC5mbG9vcihmaWxlLnByb2dyZXNzKCkgKiAxMDApO1xufSk7XG5cbnIub24oXCJmaWxlU3VjY2Vzc1wiLCAoZmlsZSwgbWVzc2FnZSkgPT4ge1xuICB1cGxvYWRlZEZpbGVzLnB1c2goSlNPTi5wYXJzZShtZXNzYWdlKSk7XG59KVxuXG5sZXQganNvblRvRm9ybURhdGEgPSAoZm9ybURhdGE6IEZvcm1EYXRhLCBkYXRhOiB7fSwgcGFyZW50S2V5OiBzdHJpbmcpIDogdm9pZCA9PiB7XG4gIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpICYmICEoZGF0YSBpbnN0YW5jZW9mIEZpbGUpKSB7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAganNvblRvRm9ybURhdGEoZm9ybURhdGEsIGRhdGFba2V5XSwgcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdmFsdWU6IGFueSA9IGRhdGEgPT09IG51bGwgPyBcIlwiIDogZGF0YTtcbiAgICBmb3JtRGF0YS5hcHBlbmQocGFyZW50S2V5LCB2YWx1ZSk7XG4gICAgY29uc29sZS5sb2coYCR7cGFyZW50S2V5fTogJHt2YWx1ZX1gKTtcbiAgfVxufTtcblxubW9kZWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihldmVudDogRXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXG4gXG4gIGxldCBmaWxlID0gdXBsb2FkZXIuZmlsZXNbMF07XG4gIGxldCBmb3JtRGF0YTogYW55ID0gbmV3IEZvcm1EYXRhKG1vZGVsKTtcbiAgbGV0IGZpbGVVcGxvYWQgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XG5cbiAgci51cGxvYWQoKTtcblxuICByLm9uKFwiY29tcGxldGVcIiwgKCkgPT4ge1xuICAgIGZpbGVVcGxvYWQub3BlbihcIlBPU1RcIiwgbW9kZWwuZ2V0QXR0cmlidXRlKFwiYWN0aW9uXCIpLCB0cnVlKTtcbiAgICBqc29uVG9Gb3JtRGF0YShmb3JtRGF0YSwgIHVwbG9hZGVkRmlsZXMsIFwiZmlsZXNcIik7XG4gICAgZmlsZVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGZpbGVVcGxvYWQucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIGZpbGVVcGxvYWQuc3RhdHVzID09IDIwMCkge1xuICBcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlVXBsb2FkLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSAmJiBmaWxlVXBsb2FkLnN0YXR1cyA9PSA1MDApIHtcbiAgXG4gICAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG4gIFxuICAgIGZpbGVVcGxvYWQuc2VuZChmb3JtRGF0YSk7XG4gIH0pO1xuXG4gIFxuXG5cbn0sIGZhbHNlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90cy91cGxvYWQtcHJpbnQudHMiXSwic291cmNlUm9vdCI6IiJ9