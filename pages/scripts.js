const popupBtnOpen = document.querySelector(".profile__edit");
const popupForm = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__close");
const popupLogin = document.querySelector(".profile__login");
const popupAtivity = document.querySelector(".profile__activity");

popupBtnClose.addEventListener("click", closePopup);
popupBtnOpen.addEventListener("click", openPopup);

function openPopup() {
    popupForm.classList.add("popup_opened");  
    nameInput.value = popupLogin.textContent;
    jobInput.value = popupAtivity.textContent;
}

function closePopup() {
    popupForm.classList.remove("popup_opened");  
}

let formElement = document.querySelector(".popup__user-data");
let nameInput = document.querySelector(".popup__user");
let jobInput = document.querySelector(".popup__data"); 

function handleFormSubmit (evt) {
    evt.preventDefault(); 
        popupLogin.textContent = nameInput.value;
        popupAtivity.textContent = jobInput.value;
        
    closePopup();  
}

formElement.addEventListener ('submit', handleFormSubmit);







