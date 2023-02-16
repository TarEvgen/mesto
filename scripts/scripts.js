const popupBtnOpenProfile = document.querySelector(".profile__edit");
const popupBtnOpenAddCard = document.querySelector(".profile__add");

const popupFormProfile = document.querySelector(".popup_edit-profile");
const popupFormAddCards = document.querySelector(".popup_add-cards");  
const popupFormImg = document.querySelector(".popup_open-img");

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
const popupContener = document.querySelectorAll('.popup')

popupContener.forEach((popup) =>{
  const popupBtnClose = popup.querySelector('.popup__close')
  popup.addEventListener('click', function(evt) {
    if (evt.target === popupBtnClose || evt.target === evt.currentTarget) {
      closePopup(popup);
    }  
  });
});

function closeEscapePopup(evt) {
  const popupOpen = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popupOpen); 
  }  
}

function openPopup(popup) {
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
  document.removeEventListener('keydown', closePopupEscape); 
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userLogin.textContent = nameInput.value;
  userActivity.textContent = jobInput.value;
  closePopup(popupFormProfile); 
}

renderInitialCards();

function renderInitialCards() {
  const cards = initialCards.map((cardData) => {
    return createCard(cardData) 
  });
  cardsContainer.append(...cards); 
}

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

enableValidation(formsConfig);

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup(popupFormProfile));
popupBtnOpenAddCard.addEventListener("click", () => openPopup(popupFormAddCards));
profileForm.addEventListener('submit', handleProfileFormSubmit);

