"use strict";

var jobs = document.getElementById("jobs");

// watch job table and wait for user to click arrow
// then generate a child rows with assicated data
jobs.addEventListener("click", function(event) {
  var arrow = <HTMLSpanElement>event.target;
  if (arrow.tagName === "span" || arrow.tagName === "SPAN") {
    var printTable = document.querySelector("tr.prints-row[data-job-id='" + arrow.getAttribute("data-id") + "']");
    if (arrow.getAttribute("data-clicked") === "false") {
      arrow.setAttribute("data-clicked" ,"true");
      arrow.setAttribute("class", "fa fa-chevron-up table-dropdown");
      printTable.setAttribute("class", "prints-row print-row");
    } else {
      arrow.setAttribute("data-clicked", "false");
      arrow.setAttribute("class", "fa fa-chevron-down table-dropdown")
      printTable.setAttribute("class", "print-row-hidden prints-row");
    }
  }
});

function formatFileSize(bytes: any) {
  var exp = Math.log(bytes) / Math.log(1024) | 0;
  var result = (bytes / Math.pow(1024, exp)).toFixed(2);

  return result + ' ' + (exp == 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
}

// take the prints related to a job and populate a hidden table
// with print information for 3d models
function addPrints(prints: any) {
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
  fileHead.innerHTML = "Options"
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

function generateTable(data: any) {
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
    } else {
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

let getPrintInfo = (url: string, callback: (data: string) => any) : void => {
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      callback(req.responseText);
    }
  }
  req.open("GET", url, true);
  req.send();
}

getPrintInfo("/jobs", (data) => {
  let json = JSON.parse(data);
  generateTable(json);
})
