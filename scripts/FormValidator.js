export class FormValidator {
  constructor(formsConfig, listPopupForm) {
    this._listPopupForm = listPopupForm
    this._formsConfig = formsConfig
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.inactiveButtonState (buttonElement);
    } else {
      buttonElement.removeAttribute('disabled');
    } 
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  inactiveButtonState (buttonElement) {
    buttonElement.setAttribute('disabled', 'disabled');
  }

  _checkInputValidity  (formElement, inputElement)  {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }  
  }

  _showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this._formsConfig.inputErrorClass);
    errorElement.textContent = errorMessage; 
  }

  _hideInputError (formElement, inputElement)  {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(this._formsConfig.inputErrorClass);
    errorElement.textContent = '';   
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._formsConfig.inputSelector));
    const buttonElement = formElement.querySelector(this._formsConfig.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  enableValidation() {
    const formList = Array.from(this._listPopupForm);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    }); 
  }
}

