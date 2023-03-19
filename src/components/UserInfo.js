export class UserInfo {
    constructor({userLoginSelector, userActivitySelector}) {

        this._userLogin = document.querySelector(userLoginSelector);
        this._userActivity = document.querySelector(userActivitySelector);
        console.log (userLoginSelector)
    }

    getUserInfo () {
      



        return { userLogin: this._userLogin.textContent,  userActivity: this._userActivity.textContent }
       

    }

    setUserInfo ({userLogin, userActivity}) {

        

        this._userLogin.textContent = userLogin
        this._userActivity.textContent = userActivity

    }




}