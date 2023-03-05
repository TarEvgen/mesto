const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error', 
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorElement.textContent = errorMessage; 
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(formsConfig.inputErrorClass);
  errorElement.textContent = '';   
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  } 
}

function setEventListeners(formElement) {
  console.log("setEventListeners")
  const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
  const buttonElement = formElement.querySelector(formsConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    
    console.log("inputList")
    console.log(inputList)

console.log("inputElement")
console.log(inputElement)
    inputElement.addEventListener('input', function () {

      console.log("sddввод")
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  }); 
}

function enableValidation (config) {

  console.log("enableValidation")
  const formList = Array.from(document.querySelectorAll(config.formSelector));


  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      console.log("formElement.addEventListener('submit'")
      evt.preventDefault();
    });
    setEventListeners(formElement);
  }); 
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

function toggleButtonState (inputList, buttonElement) {
  console.log("toggleButtonState ")

  if (hasInvalidInput(inputList)) {
    inactiveButtonState (buttonElement);
  } else {
    buttonElement.removeAttribute('disabled');
  } 
}

function inactiveButtonState (buttonElement) {
  buttonElement.setAttribute('disabled', 'disabled');
}