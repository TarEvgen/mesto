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

const cards = api.getAllCards()
cards
.then((data) => { defaultCardList = new Section({
  items: data, 
  renderer: (item) => { defaultCardList.appendCard (createCard (item))}},
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
.catch((err) => alert(err))


   
////////////////////////////////////////////





const profileFormValidator = new FormValidator(formsConfig, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(formsConfig, cardForm);
cardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage ('.popup_open-img');
popupWithImage.setEventListeners ();

const popupDeleteCard = new PopupDeleteCard ('.popup_delete-cards',
{handleSubmitForm: (data)=>{api.deleteCard(popupDeleteCard.transferCardId(data).id)
.then(()=>{
  popupDeleteCard.transferCardId().remove()
  popupDeleteCard.close ()
})
.catch((err) => alert(err))

}});


function createCard (item) {
 console.log(dataUser)
  const userId = userInfo.transferUserId()

  const card = new Card(item, '.card_sample_place', { openImg:  (data) => {
    popupWithImage.open(data.name, data.link);
  }, openDeleteCard: (data)=>{popupDeleteCard.openPopupDeleteCard(data);
    popupDeleteCard.setEventListeners ();}, addLike: (cardId) =>{api.addLikes(cardId)
      .then(res =>{
        console.log(res.likes, 'лайк встал')
        card.toggleLikeUser (res.likes)

          })
          .catch((err) => alert(err))
    
    
    
    }, deleteLike: (cardId) => {api.deleteLikes(cardId)
    
      .then(res =>{
        console.log(res, 'лайк ушел')
        card.toggleLikeUser (res.likes)
          })
          .catch((err) => alert(err))
    
    
    } }, userId);
 
  const cardElemdent = card.generateCard();
 
  return cardElemdent;

} 
/*
const dcard = (element) =>{



}*/
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
/*
export const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error', 
}
*/


const buttonSubmit = cardForm.querySelector(formsConfig.submitButtonSelector)
buttonSubmit.textContent ='Сохранение...'
   api.addCard(inputData)
   .then(res =>{
/**/
  
//this.close();
popupCardForm.close();
    
    defaultCardList.addItem(createCard (res))
    
    //createCard (console.log(res)/*{
     // createCard ({name: res.title, link: res.link})
     /* userLogin: res.name,
      userActivity: res.about
    })*/
   
  })
  .catch((err) => alert(err))
  .finally(()=> buttonSubmit.textContent ='Создать')

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
/*
export const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error', 
}
*/


const buttonSubmit2 = profileForm.querySelector(formsConfig.submitButtonSelector)


buttonSubmit2.textContent ='Сохранение...'
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