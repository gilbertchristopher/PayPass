import firebase from "firebase";
import { User } from "../data/user.interface";
import { Buyer } from "../data/buyer.interface";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from "ionic-angular";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, private toastCtrl: ToastController) {

    }

    signup(email: string, password: string, user: User, buyer: Buyer) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                console.log("user before ", user);
                user.id = userData.user.uid;
                user.role = "Buyer";
                console.log("user after ", user);
                // buyer.user = user;
                this.storeUser(user);
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

    storeUser(user: User) {
        let toast = this.toastCtrl.create({
            message: "Register success",
            duration: 3000,
            position: 'bottom'

        });
        // console.log("store ", user.id);
        // console.log("user ", user)
        if(user.lastname == null) user.lastname = "";
        firebase.database().ref('user/' + user.id).set({
            "email": user.email,
            "password": user.password,
            "role": user.role,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "phoneNumber": user.phoneNumber,
            "isStoreFound": false,
        }, function (error) {
            if (error) {
                // The write failed...
                console.log("error")
            } else {
                // Data saved successfully!
                
                toast.present();
                console.log("success")
            }
        });
        // return this.http.put("https://paypass-id.firebaseio.com/" + user.id + "/userInfo", user);
        // return this.http.put("https://paypass-id.firebaseio.com/" + user.id + "/buyerInfo", buyer);
    }
    
}