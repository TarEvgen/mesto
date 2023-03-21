import { Popup } from '../components/Popup.js'

export class PopupWithForm extends Popup {
  constructor( {selectorPopup, handleSubmitForm} ) {
    super(selectorPopup);
    this._handleSubmitForm = handleSubmitForm;
    this._imputs = Array.from(this._popup.querySelectorAll('.popup__input'))
  }
  
  _getInputValues () {
    this._inputValue = {};
    
    this._imputs.forEach(
      (item, index, arr) => {

        console.log('Текущий элемент ' + item)
  console.log('Его индекс ' + index)
  console.log('Исходный массив ' + arr)
      })
    
    
   
   //return this._inputValue
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      
      this._inputData=this._getInputValues()
     console.log(this._inputData)
      this._handleSubmitForm(this._inputData)
      super.close()
      
    });
  }



}


/*cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputLink.value;
  addClassCard ({name: name, link: link})
  const popupWithForm = new PopupWithForm ({selectorPopup: '.popup_add-cards'}) 
  popupWithForm.close ();
  cardForm.reset();
  cardFormValidator.inactiveButtonState ();
});*/

/*
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  userInfo.setUserInfo ({
    userLogin: nameInput.value,
    userActivity: jobInput.value,
  })
  const popupWithForm = new PopupWithForm ({selectorPopup: '.popup_edit-profile'});
  popupWithForm.close ();
}
*/
  