import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { PopupDeleteCard } from '../components/PopupDeleteCard.js'


import {  formsConfig, 
         popupBtnOpenProfile, popupBtnOpenAddCard,
         profileForm, cardForm, nameInput, 
         jobInput, cardsContainer, inputTitle, 
        } from '../utils/constants.js'

import "./index.css";
let defaultCardList =[];

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    'content-type': 'application/json',
    Authorization: 'dac2ff7d-9ecf-480c-a9f0-aeb4dc4991bc'
  }
})
///////////////////////////////////////////////

/////////////////////
/*
const defaultCardList = new Section(
  {items: initialCards, 
    renderer: (item) => {
      defaultCardList.appendCard (createCard (item))
    }
  },
 cardsContainer
);

defaultCardList.renderItems();
*/

/////////////////////////////




const cards = api.getAllCards()
cards.then((data) => {
  defaultCardList = new Section(
  {items: data, 
    renderer: (item) => {
      defaultCardList.appendCard (createCard (item))
    }
  },
 cardsContainer
);

defaultCardList.renderItems();
})
.catch((err) => alert(err))

const dataUser = api.loadDataUser();





dataUser
.then((data) => {

    userInfo.setUserInfo ({
      userLogin: data.name,
      userActivity: data.about, 
      avatarLink: data.avatar,
      userId: data._id 
      })
   })


   
////////////////////////////////////////////





const profileFormValidator = new FormValidator(formsConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formsConfig, cardForm);
cardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage ('.popup_open-img');
popupWithImage.setEventListeners ();

const popupDeleteCard = new PopupDeleteCard ('.popup_delete-cards');
popupDeleteCard.setEventListeners ();
function createCard (item) {
 console.log(dataUser)
  const userId = userInfo.transferUserId()

  const card = new Card(item, '.card_sample_place', { openImg:  (data) => {
    popupWithImage.open(data.name, data.link);
  }, dcard}, userId);
 
  const cardElemdent = card.generateCard();
 
  return cardElemdent;

} 

const dcard = (element) =>{

popupDeleteCard.openPopupDeleteCard(element)

}
/*
const defaultCardList = new Section(
  {items: initialCards, 
    renderer: (item) => {
      defaultCardList.appendCard (createCard (item))
    }
  },
 cardsContainer
);

defaultCardList.renderItems();
*/
const popupCardForm = new PopupWithForm ({selectorPopup: '.popup_add-cards',
  handleSubmitForm: (inputData) => {
   
  // api.addCard()
   //console.log(api.addCard())
   //console.log(j)
//defaultCardList.addItem (createCard ({name: inputData.title, link: inputData.link})); 
   api.addCard(inputData)
   .then(res =>{
/**/
  


    
    defaultCardList.addItem(createCard ({name: res.name, link: res.link}))
    
    //createCard (console.log(res)/*{
     // createCard ({name: res.title, link: res.link})
     /* userLogin: res.name,
      userActivity: res.about
    })*/
   
  })
  .catch((err) => alert(err))

   /*.then(res =>{
    userInfo.setUserInfo ({
      userLogin: res.name,

      .then(res =>{
      userInfo.setUserInfo ({
        userLogin: res.name,
        userActivity: res.about
      })
     
    })
    .catch((err) => alert(err))
    
    






      userActivity: res.about
    })
  })

*/
/*console.log('defaultCardList')*/
   
    //defaultCardList.addItem (createCard ({name: inputData.title, link: inputData.link})); 



   }
});

popupCardForm.setEventListeners();

function openProfilePopup(selectorPopup) { 
  popupProfileForm.open();
  const dataUser = userInfo.getUserInfo ();
  nameInput.value = dataUser.userLogin;
  jobInput.value = dataUser.userActivity; 
} 

function openCardForm() {
  popupCardForm.open()
  cardFormValidator.disableButton();
}


///const r = api.editProfile()
//console.log(r)

const popupProfileForm = new PopupWithForm ({selectorPopup: '.popup_edit-profile',
  handleSubmitForm: (inputData) => {
    //console.log(inputData, 'inputData')
    /*userInfo.setUserInfo ({
      userLogin: inputData.user,
      userActivity: inputData.activity
    });*/
    api.editProfile(inputData)
   .then(res =>{
      userInfo.setUserInfo ({
        userLogin: res.name,
        userActivity: res.about,
        
      })
      
     
    })
    .catch((err) => alert(err))
    
    


}});

popupProfileForm.setEventListeners()

const userInfo = new UserInfo ({userLoginSelector: '.profile__login', 
  userActivitySelector: '.profile__activity', userAvatarSelector: '.profile__avatar'
});

popupBtnOpenProfile.addEventListener("click", () => openProfilePopup());
popupBtnOpenAddCard.addEventListener("click", () => openCardForm());


/*
fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
  headers: {
    authorization: 'dac2ff7d-9ecf-480c-a9f0-aeb4dc4991bc'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); */