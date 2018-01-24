import { Helper } from "./helper";
import { Print } from "./print";

"use strict";

const jobs = document.getElementById("jobs");

// watch job table and wait for user to click arrow
// then generate a child rows with associated data
jobs.addEventListener("click", (event) => {
  const arrow = <HTMLSpanElement>event.target;
  if ((arrow.tagName === "span" || arrow.tagName === "SPAN") && arrow.getAttribute("data-id") !== null) {
    const printTable = document.querySelector("tr.prints-row[data-job-id='" + arrow.getAttribute("data-id") + "']");
    if (arrow.getAttribute("data-clicked") === "false" && printTable !== null) {
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

// take the prints related to a job and populate a hidden table
// with print information for 3d models
function addPrints(prints: any) : HTMLTableRowElement {
  const printRow = document.createElement("tr");
  const printContainer = document.createElement("td");
  const printsTable = document.createElement("table");
  const printsHead = document.createElement("thead");
  const printsBody = document.createElement("tbody");

  printRow.setAttribute("class", "print-row-hidden prints-row");
  printRow.setAttribute("data-hidden", "false");
  // tables inside of a table are only valid inside a <td> so create one
  
  printContainer.setAttribute("class", "print-container");
  printContainer.setAttribute("colspan", "6");
  printsTable.setAttribute("class", "prints-table");

  const nameHead = document.createElement("th");
  const sizeHead = document.createElement("th");
  const filamentHead = document.createElement("th");
  const fileHead = document.createElement("th");
  const approved = document.createElement("th");
  const statusHead = document.createElement("th");

  nameHead.innerHTML = "Filename";
  nameHead.setAttribute("class", "letter");

  sizeHead.innerHTML = "File Size";
  sizeHead.setAttribute("class", "number");

  filamentHead.innerHTML = "Filament Type";
  filamentHead.setAttribute("class", "table-controls");

  fileHead.innerHTML = "Options";
  approved.innerHTML = "Approved";
  statusHead.innerHTML = "Status";

  printsHead.appendChild(nameHead);
  printsHead.appendChild(sizeHead);
  printsHead.appendChild(filamentHead);
  printsHead.appendChild(fileHead);
  printsHead.appendChild(approved);
  printsHead.appendChild(statusHead);

  for (let i = 0; i < prints.length; i++) {
    const print = new Print(prints[i]);
    print.addOptions();
    print.formatStatus();
    print.generate();
    printsBody.appendChild(print.row);
  }

  printsTable.appendChild(printsHead);
  printsTable.appendChild(printsBody);
  printContainer.appendChild(printsTable);
  printRow.appendChild(printContainer);

  return printRow;
}

function generateTable(data: any) {
  const jobs = document.getElementById("jobsList");
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");
    const id = document.createElement("td");
    const name = document.createElement("td");
    const numOfPrints = document.createElement("td");
    const completed = document.createElement("td");
    const completedIcon = document.createElement("i");
    const options = document.createElement("td");
    const downloadAllButton = document.createElement("span");
    const downloadAllIcon = document.createElement("span");
    const deleteButton = document.createElement("span");
    const deleteIcon = document.createElement("span");

    options.setAttribute("class", "table-controls");

    downloadAllButton.setAttribute("class", "table-button-secondary");
    downloadAllButton.setAttribute("title", "Download as ZIP")
    downloadAllIcon.setAttribute("class", "fa fa-file-archive-o");
    downloadAllButton.appendChild(downloadAllIcon);

    deleteButton.setAttribute("data-id", data[i]["id"]);
    deleteButton.setAttribute("class", "table-button danger");
    deleteButton.setAttribute("title", "Delete Job");
    deleteIcon.setAttribute("class", "fa fa-trash");
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener("click", (event: Event) => {
      event.preventDefault();
      const deleteJob: XMLHttpRequest = new XMLHttpRequest();
      const button = <HTMLElement>event.target;
      const jobId = button.getAttribute("data-id");
      const options = <HTMLElement>button.parentNode;
      const row = <HTMLElement>options.parentNode;

      deleteJob.open("DELETE", `jobs/${jobId}`);
      deleteJob.addEventListener("readyStateChange", () => {
        if (deleteJob.readyState == XMLHttpRequest.DONE && deleteJob.status == 200) {

        } else if (deleteJob.readyState == XMLHttpRequest.DONE && deleteJob.status == 500) {

        }
      }, false);
      deleteJob.send();
      row.remove();
    }, false);

    options.appendChild(downloadAllButton);
    options.appendChild(deleteButton);
    
    const arrow = document.createElement("td");
    const arrowIcon = document.createElement("span");

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

    const prints = addPrints(data[i]["prints_data"]);
    prints.setAttribute("data-job-id", data[i]["id"]);

    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(numOfPrints);
    row.appendChild(completed);
    row.appendChild(options);
    row.appendChild(arrow);
    jobs.appendChild(row);
    jobs.appendChild(prints);

  }
}

const getPrintInfo = (url: string, callback: (data: string) => any) : void => {
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      callback(req.responseText);
    }
  }
  req.open("GET", url, true);
  req.send();
}

getPrintInfo("/jobs", (data) => {
  const json = JSON.parse(data);
  generateTable(json);
})
