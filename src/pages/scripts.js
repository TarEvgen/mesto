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
         inputLink } from '../components/initialCards.js'

const profileFormValidator = new FormValidator(formsConfig, profileForm)
profileFormValidator.enableValidation()
const cardFormValidator = new FormValidator(formsConfig, cardForm)
cardFormValidator.enableValidation() 

const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage ('.popup_open-img')
  popupWithImage.setEventListeners ()
  popupWithImage.open({name, link})    
}

function createCard (item) {
  const card = new Card(item, '.card_sample_place', handleCardClick);
  const cardElemdent = card.generateCard()
  return cardElemdent
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

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  addClassCard ({name: name, link: link})
  const popupWithForm = new PopupWithForm ({selectorPopup: '.popup_add-cards'}) 
  popupWithForm.close ();
  cardForm.reset();
  cardFormValidator.inactiveButtonState ();
});

function addClassCard ({name: name, link: link}) { 
  defaultCardList.addItem (createCard ({name: name, link: link})); 
}


function openPopup (selectorPopup) {
  const popupWithForm = new PopupWithForm ({selectorPopup}) 
  popupWithForm.open()
  popupWithForm.setEventListeners()
}

const userInfo = new UserInfo ({userLoginSelector: '.profile__login', 
userActivitySelector: '.profile__activity'
})

function openProfilePopup(selectorPopup) { 
  const popupWithForm = new PopupWithForm ({selectorPopup}) 
  popupWithForm.open()
  popupWithForm.setEventListeners()
  const dataUser = userInfo.getUserInfo ()
  nameInput.value = dataUser.userLogin;
  jobInput.value = dataUser.userActivity; 
} 

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userInfo.setUserInfo ({
    userLogin: nameInput.value,
    userActivity: jobInput.value,
  })
  const popupWithForm = new PopupWithForm ({selectorPopup: '.popup_edit-profile'}) 
  popupWithForm.close ();
}

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup('.popup_edit-profile'));
popupBtnOpenAddCard.addEventListener("click", () => openPopup('.popup_add-cards'));
profileForm.addEventListener('submit', handleProfileFormSubmit);