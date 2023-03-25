import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { initialCards, formsConfig, 
         popupBtnOpenProfile, popupBtnOpenAddCard,
         profileForm, cardForm, nameInput, 
         jobInput, cardsContainer, inputTitle, 
        } from '../utils/constants.js'

import "./index.css";
const profileFormValidator = new FormValidator(formsConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formsConfig, cardForm);
cardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage ('.popup_open-img');
popupWithImage.setEventListeners ();

function createCard (item) {
  const card = new Card(item, '.card_sample_place', { openImg:  (data) => {
    popupWithImage.open(data.name, data.link);
  }});
  const cardElemdent = card.generateCard();
  return cardElemdent;
} 

const defaultCardList = new Section(
  {items: initialCards, 
    renderer: (item) => {
      defaultCardList.appendCard (createCard (item))
    }
  },
 cardsContainer
);

defaultCardList.renderItems();

const popupCardForm = new PopupWithForm ({selectorPopup: '.popup_add-cards',
  handleSubmitForm: (inputData) => {
    defaultCardList.addItem (createCard ({name: inputData.title, link: inputData.link})); 
   }
});

popupCardForm.setEventListeners();

function openProfilePopup(selectorPopup) { 
  popupProfileForm.open();
  const dataUser = userInfo.getUserInfo ();
  nameInput.value = dataUser.userLogin;
  jobInput.value = dataUser.userActivity; 
} 

function openCardForm() {
  popupCardForm.open()
  cardFormValidator.disableButton();
}

const popupProfileForm = new PopupWithForm ({selectorPopup: '.popup_edit-profile',
  handleSubmitForm: (inputData) => {
    userInfo.setUserInfo ({
      userLogin: inputData.user,
      userActivity: inputData.activity
    });
}});

popupProfileForm.setEventListeners()

const userInfo = new UserInfo ({userLoginSelector: '.profile__login', 
  userActivitySelector: '.profile__activity'
});

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup());
popupBtnOpenAddCard.addEventListener("click", () => openCardForm());