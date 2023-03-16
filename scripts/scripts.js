import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './initialCards.js'
import { Section } from './Section.js'

const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error', 
}

const popupBtnOpenProfile = document.querySelector(".profile__edit");
const popupBtnOpenAddCard = document.querySelector(".profile__add");

const popupFormProfile = document.querySelector(".popup_edit-profile");
const popupFormAddCards = document.querySelector(".popup_add-cards");  

const popupFormImg = document.querySelector(".popup_open-img");
const cardDataLink = popupFormImg.querySelector('.popup__img')
const CardDataContent = popupFormImg.querySelector('.popup__description')
const userLogin = document.querySelector(".profile__login");
const userActivity = document.querySelector(".profile__activity");

const profileForm = document.querySelector(".popup__form_profile");
const cardForm = document.querySelector(".popup__form_add-cards");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_data"); 
const cardsContainer = '.elements__list'; 
const selectorPopup = '.popup';
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const popupList = document.querySelectorAll('.popup')
//const saveBtnCard = cardForm.querySelector('.popup__save_create')

const dataCard = (name, link) => {
  cardDataLink.src = link;
  cardDataLink.alt = name;
  CardDataContent.textContent = name; 
  openPopup(popupFormImg)       
}






function createCard (item) {
  const card = new Card(item, '.card_sample_place', dataCard);
  
  const cardElemdent = card.generateCard()
  return cardElemdent
 
} 



const profileFormValidator = new FormValidator(formsConfig, profileForm)
profileFormValidator.enableValidation()
const cardFormValidator = new FormValidator(formsConfig, cardForm)
cardFormValidator.enableValidation() 

///// тест




const defaultCardList = new Section({items: initialCards, renderer: (item) => {

              //const cardElemdent = createCard (item)



        //console.log(cardElemdent)


        defaultCardList.renderCards (createCard (item))

    }
  },
 cardsContainer

);

defaultCardList.renderer();


///// тест  

/*
initialCards.forEach(({name: name, link: link}) => {
  addClassCard ({name: name, link: link})
}); 
*/
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  addClassCard ({name: name, link: link})
 
  closePopup(popupFormAddCards);
  cardForm.reset();
  cardFormValidator.inactiveButtonState ();
});

popupList.forEach((popup) => {
  popup.addEventListener('click', function(evt) {
    if ( evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
      closePopup(popup);
    }  
  });
});

function addClassCard ({name: name, link: link}) {
  
   
  
 
  defaultCardList.addItem (createCard ({name: name, link: link}));
  
}

function closeEscapePopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened')
    closePopup(popupOpen); 
  }  
}

function openPopup (popup) {
  popup.classList.add("popup_opened"); 
  document.addEventListener('keydown', closeEscapePopup);
}

function openProfilePopup(popup) {
  nameInput.value = userLogin.textContent;
  jobInput.value = userActivity.textContent;
  openPopup(popup);
} 

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeEscapePopup); 
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userLogin.textContent = nameInput.value;
  userActivity.textContent = jobInput.value;
  closePopup(popupFormProfile);
}

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup(popupFormProfile));
popupBtnOpenAddCard.addEventListener("click", () => openPopup(popupFormAddCards));
profileForm.addEventListener('submit', handleProfileFormSubmit);