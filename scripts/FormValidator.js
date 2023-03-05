export class FormValidator {

  constructor(formsConfig, listPopupForm) {
        this._listPopupForm = listPopupForm

        this._formsConfig = formsConfig

      



       // console.log(this._formsConfig)
        //console.log("конфиг")
        //console.log(this._listPopupForm)
       // console.log("лист попапов")
      

     //console.log(this._listPopupForm)   

  }

  /*const formsConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input_type_error', 
  }*/
  
  

  /*_toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      inactiveButtonState (buttonElement);
    } else {
      buttonElement.removeAttribute('disabled');
    } 
  }
*/
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }
  
_checkInputValidity  (formElement, inputElement)  {
    
    if (!inputElement.validity.valid) {
        console.log("ошибка")
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        console.log("нет ошибки")
        this._hideInputError(formElement, inputElement);
    } 
  
}



_showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this._formsConfig.inputErrorClass);
    errorElement.textContent = errorMessage; 
  }





  //const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));

  _setEventListeners(formElement) {
    //console.log(this._formsConfig.inputSelector)
       // console.log("массив инпутов")
    const inputList = Array.from(formElement.querySelectorAll(this._formsConfig.inputSelector));
   // console.log(inputList)

    const buttonElement = formElement.querySelector(this._formsConfig.submitButtonSelector);
    //console.log(inputList)
   
    /*this._toggleButtonState(inputList, buttonElement);*/
    inputList.forEach((inputElement) => {
        //  console.log(inputElement)
        inputElement.addEventListener('input', () => {
          console.log( inputElement)
          console.log(inputList, buttonElement)
          
          this._checkInputValidity(formElement, inputElement);
          //toggleButtonState(inputList, buttonElement);
        });
       
        
    
        
      });
  }

/*_tupo (inputList, buttonElement) {
    inputList.forEach((inputElement) => {
    //  console.log(inputElement)
    inputElement.addEventListener('input', () => {
      console.log( inputElement)
      console.log(inputList, buttonElement)
      
      this._checkInputValidity(inputElement);
      //toggleButtonState(inputList, buttonElement);
    });
   
    

    
  });
}
*/
/// слушатели






 /* _checkInputValidity(inputElement) {

    console.log("проверка")
    



  }
  

*/


  enableValidation() {

    const formList = Array.from(this._listPopupForm);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      //console.log(formElement)
      //console.log("Формы передаются в список событий")
      this._setEventListeners(formElement);
    }); 




  }


}


/*

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
  const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
  const buttonElement = formElement.querySelector(formsConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  }); 
}

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
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
  if (hasInvalidInput(inputList)) {
    inactiveButtonState (buttonElement);
  } else {
    buttonElement.removeAttribute('disabled');
  } 
}

function inactiveButtonState (buttonElement) {
  buttonElement.setAttribute('disabled', 'disabled');
}

*/


/////////////////////
/*
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
    const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
    const buttonElement = formElement.querySelector(formsConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    }); 
  }
  
  function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
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
    if (hasInvalidInput(inputList)) {
      inactiveButtonState (buttonElement);
    } else {
      buttonElement.removeAttribute('disabled');
    } 
  }
  
  function inactiveButtonState (buttonElement) {
    buttonElement.setAttribute('disabled', 'disabled');
  }*/