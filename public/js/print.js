"use strict";

var print = document.getElementById("print-form");
var jobId = document.getElementById("jobId");
var fullName = document.getElementById("fullName");
var email = document.getElementById("email");
var number = document.getElementById("phoneNum");
var browse = document.getElementById("browseButton")
var uploader = document.getElementById("upload");
var progress = document.getElementById("uploadProgress")

jobId.addEventListener("change", function(event) {
    if (jobId.value.length !== "" ) {
        fullName.setAttribute("disabled", "true");
        email.setAttribute("disabled", "true");
    } else {
        fullName.setAttribute("disabled", "false");
        email.setAttribute("disabled", "false");
    }
});
var r = new Resumable({
    target:'/uploads/chunk',
});

r.assignBrowse(uploader);
browseButton.addEventListener("click", function(event) {
    uploader.click();
});

r.on("fileAdded", function(file) {
    r.upload();
});

var progressText = document.querySelectorAll(".meter > .meter-text");
var progressBars = document.querySelectorAll(".meter > .bar");

console.log(progressBars);
progressBars[0].style.width = 0;
r.on('fileProgress', function(file){
    var progress = Math.floor(file.progress() * 100);
    progressText[0].innerHTML = progress + "%";
    progressBars[0].style.width = progress + "%";
});


print.addEventListener("submit", function(event) {
    event.preventDefault();

 
   
    var file = uploader.files[0];
    var formData = new FormData(print);
    var fileUpload = new XMLHttpRequest;
    
    fileUpload.open("POST", print.getAttribute("action"), true);




    fileUpload.addEventListener("readystatechange", function() {
        if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 200) {

        } else if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 500) {

        }
    }, false);

    fileUpload.send(formData);
    


}, false);