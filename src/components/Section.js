//import { Card } from './Card.js'


export class Section {
    constructor({ items, renderer }) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector('.elements__list');
      
    }


    renderer () {
     
  

      this._renderedItems.forEach(item => this._renderer(item))
      }
   

      renderCards (cardElemdent) {

      this._container.append(cardElemdent);


    }

     addItem (cardElemdent) {

      this._container.prepend(cardElemdent);


    }



}


