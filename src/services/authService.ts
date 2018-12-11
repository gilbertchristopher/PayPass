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

    signupBuyer(email: string, password: string, user: any) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                // console.log("user before ", user);
                user.id = userData.user.uid;
                user.role = "Buyer";
                if(user.lng == undefined) user.lng = 106.62987113335271;
                if(user.lat == undefined) user.lat = -6.236581450428308;
                // console.log("user after ", user);
                // buyer.user = user;
                this.storeUser(user);
            }).catch((error) => {
                console.log("error ", error);
            });
    }

    signupSeller(email: string, password: string, user: any) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                console.log("user before ", user);
                user.id = userData.user.uid;
                user.role = "Seller";
                if(user.lng == undefined) user.lng = 106.62987113335271;
                if(user.lat == undefined) user.lat = -6.236581450428308;
                
                console.log("user after ", user);
                // buyer.user = user;
                this.storeSeller(user);
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

    changePassword(){

    }



    storeSeller(user: any){
        let toast = this.toastCtrl.create({
            message: "Register success",
            duration: 3000,
            position: 'bottom'
        })
        firebase.database().ref('seller/' + user.id).set({
            "email": user.email,
            "password": user.password,
            "role": user.role,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "storename": user.storename,
            "phoneNumber": user.phoneNumber,
            "address": user.address,
            "lng": user.lng,
            "lat": user.lat,
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
    }

    storeUser(user: any) {
        let toast = this.toastCtrl.create({
            message: "Register success",
            duration: 3000,
            position: 'bottom'

        });
        // console.log("store ", user.id);
        // console.log("user ", user)
        if(user.lastname == null) user.lastname = "";
        firebase.database().ref('buyer/' + user.id).set({
            "email": user.email,
            "password": user.password,
            "role": user.role,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "phoneNumber": user.phoneNumber,
            "address": user.address,
            "transactionIdNow": "",
            "storeIdNow": "",
            "lng": user.lng,
            "lat": user.lat,
        }   , function (error) {
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