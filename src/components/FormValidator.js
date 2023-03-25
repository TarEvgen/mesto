export class FormValidator {
  constructor(formsConfig, PopupForm) {
    this._PopupForm = PopupForm;
    this._formsConfig = formsConfig;
    this._buttonElement = this._PopupForm.querySelector(this._formsConfig.submitButtonSelector);
    this._inputList = Array.from(this._PopupForm.querySelectorAll(this._formsConfig.inputSelector));
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButton ();
    } else {
      this._buttonElement.removeAttribute('disabled');
    } 
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  disableButton () {
    this._buttonElement.setAttribute('disabled', 'disabled');
  }

  _checkInputValidity  (inputElement)  {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }  
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._PopupForm.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this._formsConfig.inputErrorClass);
    errorElement.textContent = errorMessage; 
  }

  _hideInputError (inputElement)  {
    const errorElement = this._PopupForm.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(this._formsConfig.inputErrorClass);
    errorElement.textContent = '';   
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  
  enableValidation() {
    this._setEventListeners();
  }
}

