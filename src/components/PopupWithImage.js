import { Popup } from '../components/Popup.js'

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
      super(selectorPopup);
      this._cardDataLink = this._popup.querySelector('.popup__img');
      this._CardDataContent = this._popup.querySelector('.popup__description');
    }

  open({name, link}) {
    super.open();
    this._cardDataLink.src = link;
    this._cardDataLink.alt = name;
    this._CardDataContent.textContent = name;
  }
}

