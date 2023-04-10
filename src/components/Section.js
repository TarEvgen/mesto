export class Section {
  constructor({ items, renderer }, cardContainerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardContainerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  appendElement(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
