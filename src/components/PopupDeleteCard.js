import { Popup } from '../components/Popup.js'

export class PopupDeleteCard extends Popup {
    constructor(selectorPopup, {handleSubmitForm}) {
      super(selectorPopup);
      this._form = this._popup.querySelector('.popup__form');
     this._handleSubmitForm = handleSubmitForm;
      
    }

  openPopupDeleteCard(card) {
    super.open();
    console.log(card, 'card')
    this._card = card
 
  }

  setEventListeners() {
    super.setEventListeners()
   // console.log('навешиваем слушатель на кнопку')
    //console.log(this._form, 'this._form')
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('нажал да')
      this._handleSubmitForm()
      //this.close();
    });

   

  }
 
  transferCardId() {
      
    return this._card

  }


}

