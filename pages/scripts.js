const popupBtnOpen = document.querySelector(".profile__edit");

const popup2BtnOpen = document.querySelector(".profile__add");






const popupFormProfile = document.querySelector(".popup_edit-profile");

const popupFormAddCards = document.querySelector(".popup_add-cards");

const popupBtnClose = document.querySelector(".popup__close");


const popupLogin = document.querySelector(".profile__login");
const popupAtivity = document.querySelector(".profile__activity");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_data"); 


const initialCards = [
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

const template = document
  .querySelector('.card')
  .content.querySelector('.element');


const elements__list = document.querySelector('.elements__list');

// добавить сабмит для кнопки в модалке 
//добавить переменную полей ввода 


function renderCards() {

  const cards = initialCards.map((name, link) =>{

    const cardElement = template.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = name.name;
    cardElement.querySelector('.element__img').src = name.link;
    cardElement.querySelector('.element__img').alt = name.name;

    return cardElement;
    //elements__list.append(cardElement)
  });
  elements__list.append(...cards); 
}


renderCards()


function openPopup(openPopupForm) {
  
  openPopupForm.classList.add("popup_opened");  
 nameInput.value = popupLogin.textContent;
 jobInput.value = popupAtivity.textContent;





}

function closePopup() {
  

  popupFormProfile.classList.remove("popup_opened");
 
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  popupLogin.textContent = nameInput.value;
  popupAtivity.textContent = jobInput.value;

  closePopup(close);  
}



//popupBtnClose.forEach(function (BtnClose) {BtnClose.addEventListener("click", () => closePopup(evt))})

//popupBtnClose.forEach(function (BtnClose) {BtnClose.addEventListener("click", () => closePopup( ?????    )})

//BtnClose.addEventListener("click", () => closePopup())

//popupBtnClose.forEach(BtnClose => {BtnClose.addEventListener("click", () => closePopup ( e.target))})
//console.log(popupFormAddCards)
//console.log(popupFormAddCards)

popupBtnClose.addEventListener("click", closePopup);
//popupBtnClose.addEventListener("click", () => closePopup (popupFormAddCards));



popupBtnOpen.addEventListener("click", () => openPopup(popupFormProfile));

popup2BtnOpen.addEventListener("click", () => openPopup(popupFormAddCards));

formElement.addEventListener ('submit', handleFormSubmit);







