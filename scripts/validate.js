const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error',
}

const enableValidation = (config) => {
  const formsPopup = Array.from(document.querySelectorAll(config.formSelector))
  formsPopup.forEach((popupForm) => {
    const formPlaceFields = Array.from(popupForm.querySelectorAll(config.inputSelector))
    const formBattonSave = popupForm.querySelector(config.submitButtonSelector)
    formPlaceFields.forEach((elementField) => {
      const elementError = popupForm.querySelector(`#${elementField.id} + .popup__input-error`);
      elementField.addEventListener('input', (evt) => {
        const field = evt.target;
        const fieldIsValid = field.validity.valid;
        elementError.textContent = field.validationMessage;
          if (!fieldIsValid) {
            field.classList.add(config.inputErrorClass);
          } 
          else {
            field.classList.remove(config.inputErrorClass);
          }
        const formIsValid = formPlaceFields.every(({validity}) => validity.valid);
          if (formIsValid) {
            formBattonSave.removeAttribute('disabled');
          } 
          else {
            formBattonSave.setAttribute('disabled', 'disabled');
          }
      });
    });
  });
}
