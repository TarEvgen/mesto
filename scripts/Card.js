export class Card {
  constructor(data, templateSelector, dataCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; 
    this._dataCard = dataCard;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)
    return cardElement; 
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click',() => {
      this._deleteCard()
    });
    this._element.querySelector('.element__button').addEventListener('click',() => {
      this._likeCard()
    });
    this._element.querySelector('.element__img').addEventListener('click',() => {
      this._dataCard(this._name, this._link)
    })
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element.querySelector('.element__button').classList.toggle("element__button_active");
  }
};


