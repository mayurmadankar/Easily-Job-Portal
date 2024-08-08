//THIS CLASS IS FOR RECRUITERS DATA 
export default class UserModel {
    constructor(id, userName, userEmail, userPassword) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }
    pushUserModelArray(userName, userEmail, userPassword) {
        const newUser = new UserModel(
            userModelArray.length + 1,
            userName,
            userEmail,
            userPassword
        );
        userModelArray.push(newUser);
    }
    getUserModelArray() {
        return userModelArray;
    }
    isValidUser(userEmail, userPassword) {
        return userModelArray.find(u => u.userEmail == userEmail && u.userPassword == userPassword);
    }
}
const userModelArray = [

];


