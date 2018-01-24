export class Overlay {
  public title: string;
  public overlay: HTMLElement;
  public modal: HTMLElement;

  constructor(title: string) {
    this.title = title;
    this.modal = document.createElement("div");
    this.modal.setAttribute("class", "modal");
    this.overlay = document.createElement("div");
    this.overlay.setAttribute("id", "overlay");
  }

  public generateModal() : void {
    const modalHeader = document.createElement("div");
    const modalTitle= document.createElement("div");
    const modalClose = document.createElement("div");
    const close = document.createElement("span");

    modalHeader.setAttribute("class", "grid modal-header");
    modalTitle.setAttribute("class", "grid-cell grid-1-2 modal-title");
    modalTitle.innerHTML = this.title;
    modalClose.setAttribute("class", "grid-cell grid-1-2 modal-close");
    close.setAttribute("class", "fa fa-times");

    close.addEventListener("click", () => {
      this.overlay.remove();
    }, false);

    modalClose.appendChild(close);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalClose);
    this.modal.appendChild(modalHeader);

  }

  public create() : void {
    const body = document.getElementById("dashboard");
    this.overlay.style.visibility = (this.overlay.style.visibility === "visible") ? "hidden" : "visible";
    this.overlay.appendChild(this.modal)
    body.appendChild(this.overlay);
  }
}

export class QueueModal extends Overlay {
  constructor(title: string) {
    super(title);
  }

  public generateForm = () => {
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const selectContainer = document.createElement("div");
    const selectOne = document.createElement("div");
    const selectTwo = document.createElement("div");
    const printerTitle = document.createElement("title");
    const selectPrinter = document.createElement("select");
    const printer = document.createElement("option");
    const daysContainer = document.createElement("div");
    const hoursContainer = document.createElement("div");
    const minContainer = document.createElement("div");
    const daysTitle = document.createElement("title");
    const hoursTitle = document.createElement("title");
    const minTitle = document.createElement("title");
    const selectDays = document.createElement("select");
    const selectHours = document.createElement("select");
    const selectMin = document.createElement("select");

    form.setAttribute("class", "modal-form");
    selectContainer.setAttribute("class", "modal-form-control grid");

    printer.innerHTML = "Printer 1";
    printerTitle.innerHTML = "Select a Printer"
    selectOne.setAttribute("class", "grid-cell grid-1-2");

    selectPrinter.appendChild(printer);
    selectOne.appendChild(printerTitle)
    selectOne.appendChild(selectPrinter);
    
    selectTwo.setAttribute("class", "grid-cell grid-1-2 grid");
    daysContainer.setAttribute("class", "grid-cell grid-1-3");
    daysContainer.setAttribute("style", "text-align: right");
    hoursContainer.setAttribute("class", "grid-cell grid-1-3");
    hoursContainer.setAttribute("style", "text-align: center");
    minContainer.setAttribute("class", "grid-cell grid-1-3");
    minContainer.setAttribute("style", "text-align: left");

    daysTitle.innerHTML = "Days"
    daysContainer.appendChild(daysTitle);
    daysContainer.appendChild(selectDays);

    hoursTitle.innerHTML = "Hours"
    hoursContainer.appendChild(hoursTitle);
    hoursContainer.appendChild(selectHours);

    minTitle.innerHTML = "Min"
    minContainer.appendChild(minTitle);
    minContainer.appendChild(selectMin);

    selectTwo.appendChild(daysContainer);
    selectTwo.appendChild(hoursContainer)
    selectTwo.appendChild(minContainer)

    selectContainer.appendChild(selectOne);
    selectContainer.appendChild(selectTwo);
    fieldset.appendChild(selectContainer);
    form.appendChild(fieldset);

    this.modal.appendChild(form);
  }

  public generateModal() {
    super.generateModal();
  }

  public create() {
    super.create();
  }
}