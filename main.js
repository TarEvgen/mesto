/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": () => (/* binding */ Api)
/* harmony export */ });
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    }).then(res => {
      return this._checkRes(res);
    });
  }
  loadDataUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then(res => {
      return this._checkRes(res);
    });
  }
  editProfile(inputData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.user,
        about: inputData.activity
      })
    }).then(res => {
      return this._checkRes(res);
    });
  }
  updataAvatar(inputData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputData
      })
    }).then(res => {
      return this._checkRes(res);
    });
  }
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    }).then(res => {
      return this._checkRes(res);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(res => {
      return this._checkRes(res);
    });
  }
  addLikes(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(res => {
      return this._checkRes(res);
    });
  }
  deleteLikes(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(res => {
      return this._checkRes(res);
    });
  }
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }
}

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
class Card {
  constructor(cardData, templateSelector, {
    openImg,
    openDeleteCard,
    addLike,
    deleteLike
  }, userId) {
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
    this._elementButtonLike = this._element.querySelector(".element__like-button");
    this._elementDeleteCard = this._element.querySelector(".element__delete");
    this._likesСounter = this._element.querySelector(".element__like-counter");
    this._addLikeCard = addLike;
    this._deleteLike = deleteLike;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
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
    this._element.querySelector(".element__delete").addEventListener("click", () => {
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
    this._openImg({
      name: this._name,
      link: this._link
    });
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
    return this._likes.some(likes => likes._id === this._userId);
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

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidator": () => (/* binding */ FormValidator)
/* harmony export */ });
class FormValidator {
  constructor(formsConfig, form) {
    this._form = form;
    this._formsConfig = formsConfig;
    this._buttonElement = this._form.querySelector(this._formsConfig.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._formsConfig.inputSelector));
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._buttonElement.disabled = "";
    }
  }
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  disableButton() {
    this._buttonElement.disabled = "disabled";
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formsConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
  }
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formsConfig.inputErrorClass);
    errorElement.textContent = "";
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popup": () => (/* binding */ Popup)
/* harmony export */ });
class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = evt => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._popup.addEventListener("mousedown", evt => {
      if (evt.target.classList.contains("popup__close") || evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}

/***/ }),

/***/ "./src/components/PopupDeleteCard.js":
/*!*******************************************!*\
  !*** ./src/components/PopupDeleteCard.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupDeleteCard": () => (/* binding */ PopupDeleteCard)
/* harmony export */ });
/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup.js */ "./src/components/Popup.js");

class PopupDeleteCard extends _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {
  constructor(selectorPopup, {
    handleSubmitForm
  }) {
    super(selectorPopup);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
  }
  openPopupDeleteCard(card) {
    super.open();
    this._card = card;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleSubmitForm();
    });
  }
  getCard() {
    return this._card;
  }
}

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithForm": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup.js */ "./src/components/Popup.js");

class PopupWithForm extends _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {
  constructor({
    selectorPopup,
    handleSubmitForm
  }) {
    super(selectorPopup);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    this._inputValue = {};
    this._inputList.forEach(input => this._inputValue[input.name] = input.value);
    return this._inputValue;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithImage": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup.js */ "./src/components/Popup.js");

class PopupWithImage extends _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._cardDataLink = this._popup.querySelector(".popup__img");
    this._cardDataContent = this._popup.querySelector(".popup__description");
  }
  open(name, link) {
    super.open();
    this._cardDataLink.src = link;
    this._cardDataLink.alt = name;
    this._cardDataContent.textContent = name;
  }
}

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Section": () => (/* binding */ Section)
/* harmony export */ });
class Section {
  constructor({
    items,
    renderer
  }, cardContainerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardContainerSelector);
  }
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }
  appendElement(element) {
    this._container.append(element);
  }
  addItem(element) {
    this._container.prepend(element);
  }
}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserInfo": () => (/* binding */ UserInfo)
/* harmony export */ });
class UserInfo {
  constructor({
    userLoginSelector,
    userActivitySelector,
    userAvatarSelector
  }) {
    this._userLogin = document.querySelector(userLoginSelector);
    this._userActivity = document.querySelector(userActivitySelector);
    this._avatarLink = document.querySelector(userAvatarSelector);
    this._userId = null;
  }
  getUserInfo() {
    return {
      userLogin: this._userLogin.textContent,
      userActivity: this._userActivity.textContent,
      avatarLink: this._avatarLink
    };
  }
  setUserInfo({
    userLogin,
    userActivity,
    userId,
    avatarLink
  }) {
    this._userLogin.textContent = userLogin;
    this._userActivity.textContent = userActivity;
    this._avatarLink.src = avatarLink;
    this._userId = userId;
  }
  updataAvatarInfo(avatarLink) {
    this._avatarLink.src = avatarLink;
  }
  getUserId() {
    return this._userId;
  }
}

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "avatarForm": () => (/* binding */ avatarForm),
/* harmony export */   "buttonSubmitAddCard": () => (/* binding */ buttonSubmitAddCard),
/* harmony export */   "buttonSubmitAddProfile": () => (/* binding */ buttonSubmitAddProfile),
/* harmony export */   "buttonSubmitUpdataAvatar": () => (/* binding */ buttonSubmitUpdataAvatar),
/* harmony export */   "cardContainerSelector": () => (/* binding */ cardContainerSelector),
/* harmony export */   "cardForm": () => (/* binding */ cardForm),
/* harmony export */   "formsConfig": () => (/* binding */ formsConfig),
/* harmony export */   "initialCards": () => (/* binding */ initialCards),
/* harmony export */   "inputTitle": () => (/* binding */ inputTitle),
/* harmony export */   "jobInput": () => (/* binding */ jobInput),
/* harmony export */   "nameInput": () => (/* binding */ nameInput),
/* harmony export */   "popupBtnOpenAddCard": () => (/* binding */ popupBtnOpenAddCard),
/* harmony export */   "popupBtnOpenProfile": () => (/* binding */ popupBtnOpenProfile),
/* harmony export */   "popupBtnOpenUpdataAvatar": () => (/* binding */ popupBtnOpenUpdataAvatar),
/* harmony export */   "profileForm": () => (/* binding */ profileForm)
/* harmony export */ });
const initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
}, {
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
}, {
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
}, {
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
}, {
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
}, {
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
}];
const formsConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input_type_error"
};
const popupBtnOpenProfile = document.querySelector(".profile__edit");
const popupBtnOpenAddCard = document.querySelector(".profile__add");
const popupBtnOpenUpdataAvatar = document.querySelector(".profile__button-edit");
const profileForm = document.querySelector(".popup__form_profile");
const avatarForm = document.querySelector(".popup__form_avatar-updata");
const cardForm = document.querySelector(".popup__form_add-cards");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_data");
const cardContainerSelector = ".elements__list";
const inputTitle = document.querySelector(".popup__input_type_title");
const buttonSubmitAddCard = cardForm.querySelector(formsConfig.submitButtonSelector);
const buttonSubmitAddProfile = profileForm.querySelector(formsConfig.submitButtonSelector);
const buttonSubmitUpdataAvatar = avatarForm.querySelector(formsConfig.submitButtonSelector);

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Api.js */ "./src/components/Api.js");
/* harmony import */ var _components_PopupDeleteCard_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PopupDeleteCard.js */ "./src/components/PopupDeleteCard.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");










let cardsSection = [];
const api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_6__.Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    "content-type": "application/json",
    Authorization: "dac2ff7d-9ecf-480c-a9f0-aeb4dc4991bc"
  }
});
Promise.all([api.getAllCards(), api.loadDataUser()]).then(([dataCards, dataUser]) => {
  cardsSection = new _components_Section_js__WEBPACK_IMPORTED_MODULE_2__.Section({
    items: dataCards,
    renderer: cardData => {
      cardsSection.appendElement(createCard(cardData));
    }
  }, _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.cardContainerSelector);
  userInfo.setUserInfo({
    userLogin: dataUser.name,
    userActivity: dataUser.about,
    avatarLink: dataUser.avatar,
    userId: dataUser._id
  });
  cardsSection.renderItems();
}).catch(err => alert(err));
const profileFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.formsConfig, _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.formsConfig, _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.cardForm);
cardFormValidator.enableValidation();
const avatarFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_1__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.formsConfig, _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.avatarForm);
avatarFormValidator.enableValidation();
const popupWithImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__.PopupWithImage(".popup_open-img");
popupWithImage.setEventListeners();
const popupDeleteCard = new _components_PopupDeleteCard_js__WEBPACK_IMPORTED_MODULE_7__.PopupDeleteCard(".popup_delete-cards", {
  handleSubmitForm: () => {
    api.deleteCard(popupDeleteCard.getCard().getId()).then(() => {
      popupDeleteCard.getCard().removeCard();
      popupDeleteCard.close();
    }).catch(err => alert(err));
  }
});
popupDeleteCard.setEventListeners();
function createCard(cardData) {
  const userId = userInfo.getUserId();
  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_0__.Card(cardData, ".card_sample_place", {
    openImg: data => {
      popupWithImage.open(data.name, data.link);
    },
    openDeleteCard: data => {
      popupDeleteCard.openPopupDeleteCard(data);
    },
    addLike: cardId => {
      api.addLikes(cardId).then(res => {
        card.updateLikes(res.likes);
      }).catch(err => alert(err));
    },
    deleteLike: cardId => {
      api.deleteLikes(cardId).then(res => {
        card.updateLikes(res.likes);
      }).catch(err => alert(err));
    }
  }, userId);
  const cardElemdent = card.generateCard();
  return cardElemdent;
}
const popupCardForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__.PopupWithForm({
  selectorPopup: ".popup_add-cards",
  handleSubmitForm: inputData => {
    _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.buttonSubmitAddCard.textContent = "Сохранение...";
    api.addCard(inputData).then(res => {
      cardsSection.addItem(createCard(res));
      popupCardForm.close();
    }).catch(err => alert(err)).finally(() => _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.buttonSubmitAddCard.textContent = "Создать");
  }
});
popupCardForm.setEventListeners();
function openProfilePopup() {
  popupProfileForm.open();
  const dataUser = userInfo.getUserInfo();
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.nameInput.value = dataUser.userLogin;
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.jobInput.value = dataUser.userActivity;
}
function openCardForm() {
  popupCardForm.open();
  cardFormValidator.disableButton();
}
function openUpdateAvatarPopup() {
  popupAvatarForm.open();
  avatarFormValidator.disableButton();
}
const popupProfileForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__.PopupWithForm({
  selectorPopup: ".popup_edit-profile",
  handleSubmitForm: inputData => {
    _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.buttonSubmitAddProfile.textContent = "Сохранение...";
    api.editProfile(inputData).then(res => {
      userInfo.setUserInfo({
        userLogin: res.name,
        userActivity: res.about,
        avatarLink: res.avatar,
        userId: res._id
      });
      popupProfileForm.close();
    }).catch(err => alert(err)).finally(() => _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.buttonSubmitAddProfile.textContent = "Сохранить");
  }
});
popupProfileForm.setEventListeners();
const popupAvatarForm = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_3__.PopupWithForm({
  selectorPopup: ".popup_updata-avatar",
  handleSubmitForm: data => {
    _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.buttonSubmitUpdataAvatar.textContent = "Сохранение...";
    api.updataAvatar(data.avatar).then(res => {
      userInfo.updataAvatarInfo(res.avatar);
      popupAvatarForm.close();
    }).catch(err => alert(err)).finally(() => _utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.buttonSubmitUpdataAvatar.textContent = "Сохранить");
  }
});
popupAvatarForm.setEventListeners();
const userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_5__.UserInfo({
  userLoginSelector: ".profile__login",
  userActivitySelector: ".profile__activity",
  userAvatarSelector: ".profile__avatar"
});
_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.popupBtnOpenProfile.addEventListener("click", () => openProfilePopup());
_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.popupBtnOpenAddCard.addEventListener("click", () => openCardForm());
_utils_constants_js__WEBPACK_IMPORTED_MODULE_8__.popupBtnOpenUpdataAvatar.addEventListener("click", () => openUpdateAvatarPopup());
})();

/******/ })()
;
//# sourceMappingURL=main.js.map