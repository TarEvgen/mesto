export class Card {
  constructor(initialCards, templateSelector, {openImg, openDeleteCard}, userId) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._likes = initialCards.likes;
    console.log(this._likes.length, 'this._likes')

    this._cardId = initialCards._id
    console.log(initialCards._id, 'initialCards._id')
    this._idOwner = initialCards.owner._id
    this._userId = userId
    this._templateSelector = templateSelector; 
    this._openImg = openImg;
    this._deleteCard = openDeleteCard;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__img');
    this._elementButtonLike = this._element.querySelector('.element__like-button');
    this._elementDeleteCard = this._element.querySelector('.element__delete')
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
    //console.log(this._idOwner, 'this._idOwner')
    if(this._userId === this._idOwner) {
      console.log("Есть карточки добавленные мной")
      this._elementDeleteCard.classList.add('element__delete_active')

    }
    this._element.querySelector('.element__title').textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.id = this._cardId
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click',() => {
      //this._deleteCard();
      this._openPopupDeleteCard ()

    });
    this._elementButtonLike.addEventListener('click',() => {
      this._likeCard();
    });
    this._imageElement.addEventListener('click',() => {
      this._openPopupImg();
    })
  }

  /*_deleteCard() {
    this._element.remove();
  }
*/
  _likeCard() {
    this._elementButtonLike.classList.toggle("element__button_active");
  }

  _openPopupImg () {
    this._openImg({name: this._name, link: this._link});
  }

  _openPopupDeleteCard () {
    this._deleteCard(this._element)
    console.log(this._element,'нажал на удалить')
  }


}


