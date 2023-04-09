import { Popup } from '../components/Popup.js'

export class PopupDeleteCard extends Popup {
    constructor(selectorPopup, {handleSubmitForm}) {
      super(selectorPopup);
      this._form = this._popup.querySelector('.popup__form');
     this._handleSubmitForm = handleSubmitForm;
      
    }

  openPopupDeleteCard(card) {
    super.open();
    
    this._card = card
 
  }

  setEventListeners() {
    super.setEventListeners()
  
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._handleSubmitForm()
      //this.close();
    });

   

  }
 
  transferCardId() {
      
    return this._card

  }


}

