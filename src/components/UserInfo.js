export class UserInfo {
  constructor({userLoginSelector, userActivitySelector, userAvatarSelector}) {
    this._userLogin = document.querySelector(userLoginSelector);
    this._userActivity = document.querySelector(userActivitySelector);
    this._avatarLink = document.querySelector(userAvatarSelector);
    this._userId = null;
   
  }
  
  getUserInfo () {
    return { userLogin: this._userLogin.textContent,  userActivity: this._userActivity.textContent };   
  }
  
  setUserInfo ({userLogin, userActivity, avatarLink, userId}) {
    this._userLogin.textContent = userLogin;
    this._userActivity.textContent = userActivity;
    this._avatarLink.src = avatarLink;
    this._userId = userId
    
   // console.log(userId, 'userId')
  }

  transferUserId () {
    return this._userId;
  }





}