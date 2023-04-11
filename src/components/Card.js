export class Card {
  constructor(
    cardData,
    templateSelector,
    { openImg, openDeleteCard, addLike, deleteLike },
    userId
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._idOwner = cardData.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._openImg = openImg;
    this._deleteCard = openDeleteCard;
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".element__img");
    this._elementButtonLike = this._element.querySelector(
      ".element__like-button"
    );
    this._elementDeleteCard = this._element.querySelector(".element__delete");
    this._likesСounter = this._element.querySelector(".element__like-counter");
    this._addLikeCard = addLike;
    this._deleteLike = deleteLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    if (this._userId === this._idOwner) {
      this._elementDeleteCard.classList.add("element__delete_active");
    }
    this._element.querySelector(".element__title").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.id = this._cardId;
    this._countLikes();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._openPopupDeleteCard();
      });
    this._elementButtonLike.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._imageElement.addEventListener("click", () => {
      this._openPopupImg();
    });
  }

  _handleLikeClick() {
    if (this._checkLikeUser()) {
      this._deleteLike(this._cardId);
    } else {
      this._addLikeCard(this._cardId);
    }
  }

  _openPopupImg() {
    this._openImg({ name: this._name, link: this._link });
  }

  _openPopupDeleteCard() {
    this._deleteCard(this);
  }

  updateLikes(likes) {
    this._likes = likes;
    this._countLikes();
  }

  _countLikes() {
    this._likesСounter.textContent = this._likes.length;
    this._setLikeButtonStatus();
  }

  _checkLikeUser() {
    return this._likes.some((likes) => likes._id === this._userId);
  }

  _setLikeButtonStatus() {
    if (this._checkLikeUser()) {
      this._elementButtonLike.classList.add("element__button_active");
    } else {
      this._elementButtonLike.classList.remove("element__button_active");
    }
  }

  removeCard() {
    this._element.remove();
  }

  getId() {
    return this._cardId;
  }
}
