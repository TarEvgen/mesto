export class Card {
  constructor(data, templateSelector, dataCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector; 
    this._dataCard = dataCard;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__img');
    this._elementButtonLike = this._element.querySelector('.element__button');
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
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click',() => {
      this._deleteCard()
    });
    this._elementButtonLike.addEventListener('click',() => {
      this._likeCard()
    });
    this._imageElement.addEventListener('click',() => {
      this._dataCard(this._name, this._link)
    })
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._elementButtonLike.classList.toggle("element__button_active");
  }
};


