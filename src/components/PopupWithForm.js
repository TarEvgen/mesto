import { Popup } from '../components/Popup.js'

export class PopupWithForm extends Popup {
  constructor( {selectorPopup, handleSubmitForm} ) {
    super(selectorPopup);
    this._handleSubmitForm = handleSubmitForm;
  }
  
  _getInputValues () {
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this._inputValue = {};   
    this._inputList.forEach(input => this._inputValue[input.name] = input.value);
    return this._inputValue;
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues())
      super.close();
    });
  }
}