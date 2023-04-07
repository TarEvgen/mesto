import { Popup } from '../components/Popup.js'

export class PopupWithForm extends Popup {
  constructor( {selectorPopup, handleSubmitForm} ) {
    super(selectorPopup);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._popup.querySelectorAll('.popup__input')
  }
  
  _getInputValues () {
    this._inputValue = {};   
    this._inputList.forEach(input => this._inputValue[input.name] = input.value);
    return this._inputValue;
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('нажал сохранить')
      this._handleSubmitForm(this._getInputValues())
      //this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}