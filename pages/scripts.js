const popupBtnOpen = document.querySelector(".profile__edit");
const popupForm = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__close");
const popupLogin = document.querySelector(".profile__login");
const popupAtivity = document.querySelector(".profile__activity");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_data"); 

function openPopup() {
  popupForm.classList.add("popup_opened");  
  nameInput.value = popupLogin.textContent;
  jobInput.value = popupAtivity.textContent;
}

function closePopup() {
  popupForm.classList.remove("popup_opened");  
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  popupLogin.textContent = nameInput.value;
  popupAtivity.textContent = jobInput.value;

  closePopup();  
}

popupBtnClose.addEventListener("click", closePopup);
popupBtnOpen.addEventListener("click", openPopup);
formElement.addEventListener ('submit', handleFormSubmit);







