const formsConfig = {

    formSelector: '.popup__form',
    
    inputSelector: '.popup__input',
    
    submitButtonSelector: '.popup__save',
    
    /*inactiveButtonClass: 'popup__button_disabled',
   
    inputErrorClass: 'popup__input_type_error',
    
    errorClass: 'popup__error_visible'*/
    
  };



//console.log(formsConfig)





/*const enableValidation = (config) => {
    const formPlaceFields = Array.from(aaa.querySelectorAll(config.input))
    const battonSaveForm = aaa.querySelector(config.batton)
  };










*/

const enableValidation = (config) => {
    


    const aaa = Array.from(document.querySelectorAll(config.formSelector))
    console.log(aaa)

    aaa.forEach((popupForm) => {


        console.log(popupForm, config)
            
        const formPlaceFields = Array.from(popupForm.querySelectorAll(config.inputSelector))
        const battonSaveForm = popupForm.querySelector(config.submitButtonSelector)
    
        formPlaceFields.forEach((elementField) => {
            const elementError = popupForm.querySelector(`#${elementField.id} + .popup__input-error`);
            
            elementField.addEventListener('input', (e) => {
               const field = e.target;
                  //console.log(field.validity)
                  //console.log(field.validationMessage)
                  
            
            const fieldIsValid = field.validity.valid;
             elementError.textContent = field.validationMessage;
                    
            
              if (!fieldIsValid) {
               field.classList.add('hhhhhhh');
            } else {
                 field.classList.remove('hhhhhhh');
              }
                 
            
            
              const formIsValid = formPlaceFields.every(({validity}) => validity.valid);
                if (formIsValid) {
            
                  battonSaveForm.removeAttribute('disabled');
                  } else {
                  battonSaveForm.setAttribute('disabled', 'disabled');
                  }
            
            
            })
            
            
            })
            
            
            
            
            
            })

}

    //const formPlaceFields = Array.from(aaa.querySelectorAll(config.input))
   // const battonSaveForm = aaa.querySelector(config.batton)





/*const enableValidation = (config) => {
    console.log(config)


    const aaa = config.querySelector(openO)
    console.log(aaa)
    
    const formPlaceFields = Array.from(aaa.querySelectorAll(config.input))
    const battonSaveForm = aaa.querySelector(config.batton)

    formPlaceFields.forEach((elementField) => {
        const elementError = aaa.querySelector(`#${elementField.id} + .popup__input-error`);
        
        elementField.addEventListener('input', (e) => {
           const field = e.target;
              //console.log(field.validity)
              //console.log(field.validationMessage)
              
        
        const fieldIsValid = field.validity.valid;
         elementError.textContent = field.validationMessage;
                
        
          if (!fieldIsValid) {
           field.classList.add('hhhhhhh');
        } else {
             field.classList.remove('hhhhhhh');
          }
             
        
        
          const formIsValid = formPlaceFields.every(({validity}) => validity.valid);
            if (formIsValid) {
        
              battonSaveForm.removeAttribute('disabled');
              } else {
              battonSaveForm.setAttribute('disabled', 'disabled');
              }
        
        
        })
        
        
        })
    
  };
  

  /*
// решение в лоб
formPlaceFields.forEach((elementField) => {
  const elementError = formPlace.querySelector(`#${elementField.id} + .form__item-error`);

  elementField.addEventListener('input', (e) => {
    const field = e.target;
    //console.log(field.validity);
    //console.log(field.validationMessage);

    const minLength = elementField.getAttribute('minlength');
    const customErrorText = elementField.getAttribute('title');
    if (elementField.value.length < minLength) {
      elementField.setCustomValidity(customErrorText);
    } else {
      elementField.setCustomValidity('');
    }

    //checkFieldValidity(field, elementError, "form__item-input_invalid");
    const fieldIsValid = field.validity.valid;
    elementError.textContent = field.validationMessage;

    if (!fieldIsValid) {
      field.classList.add('form__item-input_invalid');
    } else {
      field.classList.remove('form__item-input_invalid');
    }

    const formIsValid = formPlaceFields.every(({ validity }) => validity.valid);
    //toggleFormSubmit(buttonSubmitFormPlace, { disable: formIsValid });
    if (formIsValid) {
      buttonSubmitFormPlace.removeAttribute('disabled');
    } else {
      buttonSubmitFormPlace.setAttribute('disabled', 'disabled');
    }
  });
});
*/