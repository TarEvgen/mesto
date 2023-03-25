export class Card {
  constructor(initialCards, templateSelector, {openImg}) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector; 
    this._openImg = openImg;
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
      this._deleteCard();
    });
    this._elementButtonLike.addEventListener('click',() => {
      this._likeCard();
    });
    this._imageElement.addEventListener('click',() => {
      this._openPopupImg();
    })
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._elementButtonLike.classList.toggle("element__button_active");
  }

  _openPopupImg () {
    this._openImg({name: this._name, link: this._link});
  }
}


