import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupDeleteCard } from "../components/PopupDeleteCard.js";

import {
  formsConfig,
  popupBtnOpenProfile,
  popupBtnOpenAddCard,
  profileForm,
  cardForm,
  avatarForm,
  nameInput,
  jobInput,
  cardContainerSelector,
  buttonSubmitAddCard,
  buttonSubmitUpdataAvatar,
  buttonSubmitAddProfile,
  popupBtnOpenUpdataAvatar,
} from "../utils/constants.js";

import "./index.css";
let cardsSection = [];

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    "content-type": "application/json",
    Authorization: "dac2ff7d-9ecf-480c-a9f0-aeb4dc4991bc",
  },
});

Promise.all([api.getAllCards(), api.loadDataUser()])
  .then(([dataCards, dataUser]) => {
    cardsSection = new Section(
      {
        items: dataCards,
        renderer: (cardData) => {
          cardsSection.appendElement(createCard(cardData));
        },
      },
      cardContainerSelector
    );

    userInfo.setUserInfo({
      userLogin: dataUser.name,
      userActivity: dataUser.about,
      avatarLink: dataUser.avatar,
      userId: dataUser._id,
    });
    cardsSection.renderItems();
  })
  .catch((err) => alert(err));

const profileFormValidator = new FormValidator(formsConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formsConfig, cardForm);
cardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(formsConfig, avatarForm);
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_open-img");
popupWithImage.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(".popup_delete-cards", {
  handleSubmitForm: () => {
    api
      .deleteCard(popupDeleteCard.getCard().getId())
      .then(() => {
        popupDeleteCard.getCard().removeCard();
        popupDeleteCard.close();
      })
      .catch((err) => alert(err));
  },
});
popupDeleteCard.setEventListeners();

function createCard(cardData) {
  const userId = userInfo.getUserId();
  const card = new Card(
    cardData,
    ".card_sample_place",
    {
      openImg: (data) => {
        popupWithImage.open(data.name, data.link);
      },
      openDeleteCard: (data) => {
        popupDeleteCard.openPopupDeleteCard(data);
      },
      addLike: (cardId) => {
        api
          .addLikes(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => alert(err));
      },
      deleteLike: (cardId) => {
        api
          .deleteLikes(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => alert(err));
      },
    },
    userId
  );

  const cardElemdent = card.generateCard();
  return cardElemdent;
}

const popupCardForm = new PopupWithForm({
  selectorPopup: ".popup_add-cards",
  handleSubmitForm: (inputData) => {
    buttonSubmitAddCard.textContent = "Сохранение...";
    api
      .addCard(inputData)
      .then((res) => {
        cardsSection.addItem(createCard(res));
        popupCardForm.close();
      })
      .catch((err) => alert(err))
      .finally(() => (buttonSubmitAddCard.textContent = "Создать"));
  },
});

popupCardForm.setEventListeners();

function openProfilePopup() {
  popupProfileForm.open();
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.userLogin;
  jobInput.value = dataUser.userActivity;
}

function openCardForm() {
  popupCardForm.open();
  cardFormValidator.disableButton();
}

function openUpdateAvatarPopup() {
  popupAvatarForm.open();
  avatarFormValidator.disableButton();
}

const popupProfileForm = new PopupWithForm({
  selectorPopup: ".popup_edit-profile",
  handleSubmitForm: (inputData) => {
    buttonSubmitAddProfile.textContent = "Сохранение...";
    api
      .editProfile(inputData)
      .then((res) => {
        userInfo.setUserInfo({
          userLogin: res.name,
          userActivity: res.about,
          avatarLink: res.avatar,
          userId: res._id,
        });
        popupProfileForm.close();
      })
      .catch((err) => alert(err))
      .finally(() => (buttonSubmitAddProfile.textContent = "Сохранить"));
  },
});

popupProfileForm.setEventListeners();

const popupAvatarForm = new PopupWithForm({
  selectorPopup: ".popup_updata-avatar",
  handleSubmitForm: (data) => {
    buttonSubmitUpdataAvatar.textContent = "Сохранение...";
    api
      .updataAvatar(data.avatar)
      .then((res) => {
        userInfo.updataAvatarInfo(res.avatar);
        popupAvatarForm.close();
      })
      .catch((err) => alert(err))
      .finally(() => (buttonSubmitUpdataAvatar.textContent = "Сохранить"));
  },
});

popupAvatarForm.setEventListeners();

const userInfo = new UserInfo({
  userLoginSelector: ".profile__login",
  userActivitySelector: ".profile__activity",
  userAvatarSelector: ".profile__avatar",
});

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup());
popupBtnOpenAddCard.addEventListener("click", () => openCardForm());
popupBtnOpenUpdataAvatar.addEventListener("click", () =>
  openUpdateAvatarPopup()
);
