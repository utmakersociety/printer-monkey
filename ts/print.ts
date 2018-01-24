import { Helper } from "./helper";
import { Overlay, QueueModal } from "./overlay";

export class Print {
  public row: HTMLTableRowElement;
  public printInfo: HTMLTableCellElement;
  public filename: HTMLTableCellElement;
  public fileSize: HTMLTableCellElement;
  public filament: HTMLTableCellElement;
  public options: HTMLTableCellElement;
  public currentStatus;
  public completed;

  constructor(printInfo: any) {
    // set initalize some properties and set table cells that won't be changed much
    // but might need to be seperated at a later date
    this.printInfo = printInfo;
    this.row = document.createElement("tr");
    this.filename = document.createElement("td");
    this.fileSize = document.createElement("td");
    this.filament = document.createElement("td");
    this.options = document.createElement("td");
    this.currentStatus = document.createElement("td");
    this.completed = document.createElement("td");

    this.filename.innerHTML = this.printInfo["filename"];
    this.fileSize.setAttribute("class", "number");
    this.fileSize.innerHTML = Helper.formatFileSize(this.printInfo["filesize"]);
    this.filament.setAttribute("class", "table-controls");
    this.filament.innerHTML = this.printInfo["filament"];
  }

  public addOptions = () => {
    const downloadLink = document.createElement("a");
    const downloadIcon = document.createElement("i");
    const queueAdd = document.createElement("span");
    const queueIcon = document.createElement("span");
    const deleteButton = document.createElement("span");
    const deleteButtonIcon = document.createElement("span");

    this.options.setAttribute("class", "table-controls");
    // create a queue button for each print and then add an click event listener
    // with an overlay instance that will be removed when closed
    queueAdd.setAttribute("class", "table-button-secondary");
    queueAdd.setAttribute("title", "Add to Queue")
    queueAdd.addEventListener("click", (event: Event) => {
      const overlay = new QueueModal("Add to Queue");
      overlay.generateModal();
      overlay.generateForm();
      overlay.create();
    }, false);
    queueIcon.setAttribute("class", "fa fa-plus-circle");
    queueAdd.appendChild(queueIcon);

    downloadLink.setAttribute("href", this.printInfo["relative_path"]);
    downloadLink.setAttribute("download", this.printInfo["filename"]);
    downloadLink.setAttribute("class", "download-link table-button-primary");
    downloadIcon.setAttribute("class", "fa fa-download");
    downloadLink.setAttribute("title", "Download File");
    downloadLink.appendChild(downloadIcon);
    
    deleteButton.setAttribute("class", "table-button danger");
    deleteButton.setAttribute("data-id", this.printInfo["id"]);
    deleteButton.setAttribute("title", "Delete Print");
    deleteButtonIcon.setAttribute("class", "fa fa-trash");
    deleteButton.appendChild(deleteButtonIcon);
    this.options.appendChild(queueAdd);
    this.options.appendChild(downloadLink);
    this.options.appendChild(deleteButton);
  }

  public formatStatus() {
    // TODO: Add other status colors
    this.currentStatus.setAttribute("class", "table-controls");
    switch (this.printInfo["status"]) {
      case 1:
        this.currentStatus.innerHTML = "Ready to Print";
        break;
      case 2:
        this.currentStatus.innerHTML = "In Queue";
        break;
      case 3:
        this.currentStatus.innerHTML = "Printing";
        break;
      case 4:
        this.currentStatus.innerHTML = "Printed";
        break;
      case 5:
        this.currentStatus.innerHTML = "Picked up";
        break;
      default:
        this.currentStatus.setAttribute("class", "status-message danger-message table-controls");
        this.currentStatus.innerHTML = "Not Approved";
        break;
    }
  }

  public generate() {
    this.row.appendChild(this.filename);
    this.row.appendChild(this.fileSize);
    this.row.appendChild(this.filament);
    this.row.appendChild(this.options);
    this.row.appendChild(this.completed);
    this.row.appendChild(this.currentStatus);
  }
}