export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  export const formsConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input_type_error', 
  }

  export const popupBtnOpenProfile = document.querySelector(".profile__edit");
  export const popupBtnOpenAddCard = document.querySelector(".profile__add");
  export const profileForm = document.querySelector(".popup__form_profile");
  export const cardForm = document.querySelector(".popup__form_add-cards");
  export const nameInput = document.querySelector(".popup__input_type_name");
  export const jobInput = document.querySelector(".popup__input_type_data"); 
  export const cardsContainer = '.elements__list'; 
  export const inputTitle = document.querySelector('.popup__input_type_title');