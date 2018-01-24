export class Overlay {
  public title: string;
  public overlay;
  public modal;

  constructor(title: string) {
    this.title = title;
    this.modal = document.createElement("div");
    this.modal.setAttribute("class", "modal");
    this.overlay = document.createElement("div");
    this.overlay.setAttribute("id", "overlay");
  }

  public generateModal = () => {
    const modalTitleHeader = document.createElement("div");
    const modalTitle = document.createElement("div");
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    modalTitle.innerHTML = this.title;
    modalTitleHeader.appendChild(modalTitle);
    this.modal.appendChild(modalTitleHeader);
  }

  public create = () => {
    const body = document.getElementById("dashboard");
    this.overlay.style.visibility = (this.overlay.style.visibility === "visible") ? "hidden" : "visible";
    this.overlay.appendChild(this.modal)
    body.appendChild(this.overlay);
  }
}