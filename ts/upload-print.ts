
"use strict";

declare var Resumable: any;

const model = <HTMLFormElement>document.getElementById("print-form");
const jobId = <HTMLInputElement>document.getElementById("jobId");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const number = document.getElementById("phoneNum");
const browse = document.getElementById("browseButton");
const uploader = <HTMLInputElement>document.getElementById("upload");
const progress = document.getElementById("uploadProgress");
const fileCount = 0;
const uploadedFiles: Array<any> = [];

const r = new Resumable({
  target:'/prints/chunk',
});

r.assignBrowse(uploader, false);
browse.addEventListener("click", (event: Event) : void => {
  uploader.click();
});

r.on("fileAdded", (file: any) : void => {
  const uploadContainer = document.getElementById("uploadContainer");
  const fileInfo = file.file;
  const fileContainer = document.createElement("div");
  const fileName = document.createElement("span");
  const fileClose = document.createElement("span");
  const fileCloseIcon = document.createElement("i");


  fileContainer.setAttribute("class", "file");
  fileCloseIcon.setAttribute("class", "fa fa-times-circle");
  fileClose.setAttribute("class", "file-close");
  
  fileCloseIcon.addEventListener("click", (event: Event) => {
    event.preventDefault();
    const close = <HTMLElement>event.target;
    const parentClose = <HTMLSpanElement>close.parentNode;
    const fileParent = <HTMLElement>parentClose.parentNode;
    r.files.pop();
    fileParent.remove();
  }, false);


  fileName.innerHTML = fileInfo.name;

  fileClose.appendChild(fileCloseIcon);
  fileContainer.appendChild(fileName);
  fileContainer.appendChild(fileClose);
  uploadContainer.appendChild(fileContainer);
  
});

r.on('fileProgress', (file: any) : void => {
  const progress = Math.floor(file.progress() * 100);
});

r.on("fileSuccess", (file, message) : void => {
  uploadedFiles.push(JSON.parse(message));
})

const jsonToFormData = (formData: FormData, data: {}, parentKey: string) : void => {
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


 
  const file = uploader.files[0];
  const formData: any = new FormData(model);
  const fileUpload = new XMLHttpRequest;

  r.upload();

  r.on("complete", () : void => {
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