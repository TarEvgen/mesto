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

const profileForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_data"); 

const templateCard = document.querySelector('.card').content.querySelector('.element');

const cardsContainer = document.querySelector('.elements__list'); 

const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const cardFormSubmitButton = document.querySelector('.popup__save_create');

function openPopup(popup) {
  popup.classList.add("popup_opened");  
}

function openPropfilePopup(popup) { 
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
      popupFormImg.classList.add("popup_opened")
      popupFormImg.querySelector('.popup__img').src = cardData.link;
      popupFormImg.querySelector('.popup__img').alt = cardData.name;
      popupFormImg.querySelector('.popup__description').textContent = cardData.name;       
    })
  return cardElement;
}

popupBtnClose.addEventListener("click", () => closePopup(popupFormProfile));
popupBtnCloseAddCard.addEventListener("click", () => closePopup(popupFormAddCards));
popupBtnCloseImg.addEventListener("click", () => closePopup(popupFormImg));

popupBtnOpenProfile.addEventListener("click", () => openPropfilePopup(popupFormProfile));
popupBtnOpenAddCard.addEventListener("click", () => openPopup(popupFormAddCards));

profileForm.addEventListener ('submit', handleProfileFormSubmit);