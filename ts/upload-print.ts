
"use strict";

declare var Resumable: any;

let model = <HTMLFormElement>document.getElementById("print-form");
let jobId = <HTMLInputElement>document.getElementById("jobId");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let number = document.getElementById("phoneNum");
let browse = document.getElementById("browseButton");
let uploader = <HTMLInputElement>document.getElementById("upload");
let progress = document.getElementById("uploadProgress");
let fileCount = 0;
let uploadedFiles: Array<any> = [];

let r = new Resumable({
  target:'/uploads/chunk',
});

r.assignBrowse(uploader, false);
browse.addEventListener("click", function(event) {
  uploader.click();
});

r.on("fileAdded", function(file: any) {
  let uploadContainer = document.getElementById("uploadContainer");
  let fileInfo = file.file;
  let fileContainer = document.createElement("div");
  let fileName = document.createElement("span");
  let fileClose = document.createElement("span");
  let fileCloseIcon = document.createElement("i");


  fileContainer.setAttribute("class", "file");
  fileCloseIcon.setAttribute("class", "fa fa-times-circle");
  fileClose.setAttribute("class", "file-close");
  
  fileCloseIcon.addEventListener("click", (event: Event) => {
    event.preventDefault();
    let close = <HTMLElement>event.target;
    let parentClose = <HTMLSpanElement>close.parentNode;
    let fileParent = <HTMLElement>parentClose.parentNode;
    r.files.pop();
    fileParent.remove();
  }, false);


  fileName.innerHTML = fileInfo.name;

  fileClose.appendChild(fileCloseIcon);
  fileContainer.appendChild(fileName);
  fileContainer.appendChild(fileClose);
  uploadContainer.appendChild(fileContainer);
  
});

r.on('fileProgress', function(file: any){
  let progress = Math.floor(file.progress() * 100);
});

r.on("fileSuccess", (file, message) => {
  uploadedFiles.push(JSON.parse(message));
})

let jsonToFormData = (formData: FormData, data: {}, parentKey: string) : void => {
  if (data && typeof data === "object" && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      jsonToFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value: any = data === null ? "" : data;
    formData.append(parentKey, value);
    console.log(`${parentKey}: ${value}`);
  }
};

model.addEventListener("submit", function(event: Event) {
  event.preventDefault();


 
  let file = uploader.files[0];
  let formData: any = new FormData(model);
  let fileUpload = new XMLHttpRequest;

  r.upload();

  r.on("complete", () => {
    fileUpload.open("POST", model.getAttribute("action"), true);
    jsonToFormData(formData,  uploadedFiles, "files");
    fileUpload.addEventListener("readystatechange", function() {
        if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 200) {
  
        } else if (fileUpload.readyState == XMLHttpRequest.DONE && fileUpload.status == 500) {
  
        }
    }, false);
  
    fileUpload.send(formData);
  });

  


}, false);