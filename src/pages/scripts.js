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



const profileFormValidator = new FormValidator(formsConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formsConfig, cardForm);
cardFormValidator.enableValidation();

const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage ('.popup_open-img');
  popupWithImage.setEventListeners ();
  popupWithImage.open({name, link}); 
}

function createCard (item) {
  const card = new Card(item, '.card_sample_place', handleCardClick);
  const cardElemdent = card.generateCard();
  return cardElemdent;
} 

const defaultCardList = new Section(
  {items: initialCards, 
    renderer: (item) => {
      defaultCardList.renderCards (createCard (item))
    }
  },
 cardsContainer
);

defaultCardList.renderer();

const popupCardForm = new PopupWithForm ({selectorPopup: '.popup_add-cards',
  handleSubmitForm: (inputData) => {
    defaultCardList.addItem (createCard ({name: inputData.title, link: inputData.link})); 
    cardForm.reset();
    cardFormValidator.inactiveButtonState();
  }
});

popupCardForm.setEventListeners();

function openProfilePopup(selectorPopup) { 
  popupProfileForm.open();
  const dataUser = userInfo.getUserInfo ();
  nameInput.value = dataUser.userLogin;
  jobInput.value = dataUser.userActivity; 
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

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup('.popup_edit-profile'));
popupBtnOpenAddCard.addEventListener("click", () => popupCardForm.open());