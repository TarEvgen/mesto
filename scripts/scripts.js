const popupBtnOpenProfile = document.querySelector(".profile__edit");
const popupBtnOpenAddCard = document.querySelector(".profile__add");

const popupFormProfile = document.querySelector(".popup_edit-profile");
const popupFormAddCards = document.querySelector(".popup_add-cards");  
const popupFormImg = document.querySelector(".popup_open-img");

const popupBtnClose = document.querySelector(".popup__close_edit-profile");
const popupBtnCloseAddCard = document.querySelector(".popup__close_add-cards");  
const popupBtnCloseImg = document.querySelector(".popup__close_img");

const userLogin = document.querySelector(".profile__login");
const userActivity = document.querySelector(".profile__activity");

const profileForm = document.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_data"); 

const templateCard = document.querySelector('.card').content.querySelector('.element');

const cardsContainer = document.querySelector('.elements__list'); 

const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const cardFormSubmitButton = document.querySelector('.popup__save_create');


const cardDataLink = popupFormImg.querySelector('.popup__img')
const cardDataName =  popupFormImg.querySelector('.popup__img')
const CardDataContent = popupFormImg.querySelector('.popup__description')



//const bbb = document.querySelectorAll('.popup__form')
//profileForm
//console.log(bbb)

//const ccc = 








//const aaa = document.querySelector('.ааа')
//const formPlaceFields = Array.from(aaa.querySelectorAll('.popup__input'))
//const battonSaveForm = aaa.querySelector('.popup__save')

//const aaa = document.querySelector(config.form)









//console.log(formPlaceFields)
//console.log(battonSaveForm)
//console.log(profileForm)


// const formInput = profileForm.querySelectorAll('.popup__input')
// const formError = profileForm.querySelector(`#${formInput.id} + .popup__input-error`)

// console.log(formError)
enableValidation(formsConfig);

function openPopup(popup) {
  popup.classList.add("popup_opened"); 
  
  
}

function openProfilePopup(popup) { 
  nameInput.value = userLogin.textContent;
  jobInput.value = userActivity.textContent;
  openPopup(popup)
} 

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userLogin.textContent = nameInput.value;
  userActivity.textContent = jobInput.value;
  closePopup(popupFormProfile)  
}

function renderInitialCards() {
  const cards = initialCards.map((cardData) => {
    return createCard(cardData) 
  });
  cardsContainer.append(...cards); 
}

renderInitialCards();

cardFormSubmitButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  const cardElement = createCard({name: name, link: link});
  cardsContainer.prepend(cardElement); 
  closePopup(popupFormAddCards);
  inputTitle.value = "";
  inputLink.value = "";
  
});

function createCard(cardData) {
  const cardElement = templateCard.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = cardData.name;
    cardElement.querySelector('.element__img').src = cardData.link;
    cardElement.querySelector('.element__img').alt = cardData.name;
    cardElement.querySelector('.element__delete').addEventListener('click',() => {
      cardElement.remove();
    });
      
    const buttonLike = cardElement.querySelector('.element__button');
    buttonLike.addEventListener('click',() => {
      buttonLike.classList.toggle("element__button_active");
    });   
    
    cardElement.querySelector('.element__img').addEventListener('click',() => {
      openPopup(popupFormImg)           
      cardDataLink.src = cardData.link;
      cardDataName.alt = cardData.name;
      CardDataContent.textContent = cardData.name;       
    })
  return cardElement;
}




popupBtnClose.addEventListener("click", () => closePopup(popupFormProfile));
popupBtnCloseAddCard.addEventListener("click", () => closePopup(popupFormAddCards));
popupBtnCloseImg.addEventListener("click", () => closePopup(popupFormImg));

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup(popupFormProfile));
popupBtnOpenAddCard.addEventListener("click", () => openPopup(popupFormAddCards));

profileForm.addEventListener ('submit', handleProfileFormSubmit);


 

//consol.log(formError);

//////////////////////////////////////////////////////////////////////

// const showError = (input, errorMessage) => {
//   input.classList.add('form__input_type_error'); 
//   formError.textContent = errorMessage;
//   formError.classList.add('form__input-error_active');
//   showError(formInput, formInput.validationMessage); 
  
// };


// const hideError = (input) => {
//    input.classList.remove('form__input_type_error'); 
//    formError.classList.remove('form__input-error_active');
//    formError.textContent = '';
// };


// const checkInputValidity = () => {
//   if (!formInput.validity.valid) {
//    showError(formInput, showError );
//  } else {
//    hideError(formInput);
//  } 
//  };

//  formInput.addEventListener('input', function () {    ///слушатель ввода
//   checkInputValidity();
// });




///////////////////////////////////////////////////////////////////////////////////////////////



//console.log(formPlaceFields)


// const handleProfileFormSubmit = (evt) => {
//   evt.preventDefault();
//   const formIsValid = formPlaceFields.every(({validity}) => validity.valid);

//   battonSaveForm.setAttribute('disabled', 'disabled');
// if (formIsValid) {
//   const user = e.target.user.value;
//   const data = e.target.data.value;


//  // closePopup(popupFormProfile)

//   //const

// }


// }