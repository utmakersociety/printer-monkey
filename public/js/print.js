var print = document.getElementById("print-form");
var jobId = document.getElementById("jobId");
var fullName = document.getElementById("fullName");
var email = document.getElementById("email");
var number = document.getElementById("phoneNum");
var uploader = document.getElementById("upload");

jobId.addEventListener("change", function(event) {
    if (jobId.value.length !== "" ) {
        fullName.setAttribute("disabled", "true");
        email.setAttribute("disabled", "true");
    } else {
        fullName.setAttribute("disabled", "false");
        email.setAttribute("disabled", "false");
    }
});


uploader.addEventListener("change", function(event) {
    var files = event.target.files;
    for (var i = 0; i < files.length; i++) {
        file["name"] = files[i].name;
        file["size"] = files[i].size;
    }
}, false);

print.addEventListener("submit", function(event) {
    event.preventDefault();
    var file = uploader.files[0];
    var formData = new FormData(print);
    
    formData.append('file', file);

    var fileUpload = new XMLHttpRequest;
    fileUpload.open("POST", print.getAttribute("action"), true);
    
    fileUpload.addEventListener("readystatechange", function() {
        if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 200) {

        } else if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 500``) {

        }
    })

    fileUpload.send(formData);
    


}, false);