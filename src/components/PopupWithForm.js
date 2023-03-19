import { Popup } from '../components/Popup.js'

export class PopupWithForm extends Popup {
    constructor({ selectorPopup, handleSubmitForm }) {
        super(selectorPopup);
        this._handleSubmitForm = handleSubmitForm;

              
    }

    _getInputValues () {

    }

    setEventListeners () {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
           
          });



    }

    close () {
        super.close();

    }




}



  