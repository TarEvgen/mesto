import { Popup } from '../components/Popup.js'

export class PopupDeleteCard extends Popup {
    constructor(selectorPopup) {
      super(selectorPopup);
      
    }

  openPopupDeleteCard() {
    super.open();
    
  }
}

