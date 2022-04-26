import AbstractView from "./abstractview.js";
import { auth } from "../firebase/firebase.init.js";
import navigateTo from "../index.js";

export default class SignOut extends AbstractView {
    constructor(params) {
        super(params);
        auth.signOut().then(() => {
            console.log("User successfully logged out");
            navigateTo('/');
          }).catch((error) => {
            console.log(error.message);
          });
    };
    
    async addHandlers() {};

    async getHtml() {
        return "";
    };
};