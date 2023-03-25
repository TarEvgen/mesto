export class Section {
  constructor({ items, renderer }) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector('.elements__list');
  }

  renderItems () {
    this._renderedItems.forEach(item => this._renderer(item));
  }
 
  appendCard (cardElemdent) {
    this._container.append(cardElemdent);
  }

  addItem (cardElemdent) {
    this._container.prepend(cardElemdent);
  }
}