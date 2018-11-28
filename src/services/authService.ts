import firebase from "firebase";
import { User } from "../data/user.interface";

export class AuthService {
    signup(email: string, password: string, user: User) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                console.log("user ", userData);
            }).catch((error) => {
                console.log("error ", error);
            });
    }

    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logout() {
        firebase.auth().signOut();
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }
}