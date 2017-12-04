var jobs = document.getElementById("jobs");

jobs.addEventListener("click", function(event) {
  var arrow = event.target;
  //console.log(arrow);
  if (arrow.tagName === "span" || arrow.tagName === "span") {
    console.log(arrow);
  }
});

function showControls(arrow) {

}

function generateTable(data) {
   prints = document.getElementById("jobsList");
   for(var i = 0; i < data.length; i++) {
    var row = document.createElement("tr");
    var id = document.createElement("td");
    var name = document.createElement("td");
    var numOfPrints = document.createElement("td");
    var approved = document.createElement("td");
    var approvedIcon = document.createElement("i");
    var arrow = document.createElement("td");
    var arrowIcon = document.createElement("span");

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
    arrowIcon.setAttribute("class", "fa fa-chevron-down");
    arrow.appendChild(arrowIcon);
    
    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(numOfPrints);
    row.appendChild(approved);
    row.appendChild(arrow);
    prints.appendChild(row);
   }
}

$.get("/jobs", function(data) {
   generateTable(data);
});