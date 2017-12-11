"use strict";

//var jobs = document.getElementById("jobs");

// watch job table and wait for user to click arrow
// then generate a child rows with assicated data
jobs.addEventListener("click", function(event) {
  var arrow = event.target;
  if (arrow.tagName === "span" || arrow.tagName === "SPAN") {
    if (arrow.getAttribute("data-clicked") === "false") {
      console.log(arrow);
      arrow.setAttribute("data-clicked" ,"true");
      arrow.setAttribute("class", "fa fa-chevron-up table-dropdown")
    } else {
      console.log(arrow);
      arrow.setAttribute("data-clicked", false);
      arrow.setAttribute("class", "fa fa-chevron-down table-dropdown")
    }
  }
});

function addPrints(prints) {
  var printRow = document.createElement("tr");
  printRow.setAttribute("class", "print-row-hidden");
  printRow.setAttribute("data-hidden", "false");
  
  var printsTable = document.createElement("table");
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
  fileHead.innerHTML = "Download Link"
  completedHead.innerHTML = "Not Completed";

  printsHead.appendChild(nameHead);
  printsHead.appendChild(sizeHead);
  printsHead.appendChild(filamentHead);
  printsHead.appendChild(fileHead);
  printsHead.appendChild(completedHead);

  printsTable.appendChild(printsHead);
  printsTable.appendChild(printsBody);
  printRow.appendChild(printsTable);

  return printRow;
}

function generateTable(data) {
  var jobs = document.getElementById("jobsList");
  for (var i = 0; i < data.length; i++) {
    var row = document.createElement("tr");
    var id = document.createElement("td");
    var name = document.createElement("td");
    var numOfPrints = document.createElement("td");
    var approved = document.createElement("td");
    var approvedIcon = document.createElement("i");
    var arrow = document.createElement("td");
    var arrowIcon = document.createElement("span");

    row.setAttribute("data-id", data[i]["id"]);
    id.innerHTML = data[i]["id"];
    id.setAttribute("class", "number");
    name.innerHTML = data[i]["name"];
    numOfPrints.innerHTML = data[i]["prints_data"].length;
    numOfPrints.setAttribute("class", "number");
    approvedIcon.setAttribute("class", "fa fa-close");
    if (data[i]["completed"] === "true") {
      approved.appendChild(approvedIcon);
    } else {
      approved.appendChild(approvedIcon);
    }
    arrowIcon.setAttribute("class", "fa fa-chevron-down table-dropdown");
    arrowIcon.setAttribute("data-clicked", "false");
    arrow.appendChild(arrowIcon);
    console.log(addPrints(data["prints_data"]))
    var prints = addPrints(data["prints_data"]);

    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(numOfPrints);
    row.appendChild(approved);
    row.appendChild(arrow);
    jobs.appendChild(row);
    jobs.appendChild(prints);

  }
}

$.get("/jobs", function(data) {
   generateTable(data);
});