import firebase from "firebase";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from "ionic-angular";
import { OneSignal } from "@ionic-native/onesignal";

@Injectable()
export class AuthService {
    playerId: string;
    constructor(private http: HttpClient, private toastCtrl: ToastController, private oneSignal: OneSignal) {

    }

    signupBuyer(email: string, password: string, user: any) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                user.id = userData.user.uid;
                user.role = "Buyer";
                if(user.lng == undefined) user.lng = 106.62987113335271;
                if(user.lat == undefined) user.lat = -6.236581450428308;
                this.storeUser(user);
            }).catch((error) => {
                console.log("error ", error);
            });
    }

    signupSeller(email: string, password: string, user: any) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                user.id = userData.user.uid;
                user.role = "Seller";
                if(user.lng == undefined) user.lng = 106.62987113335271;
                if(user.lat == undefined) user.lat = -6.236581450428308;
                
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
        this.oneSignal.getIds().then(data => {
            this.playerId = data.userId
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
                "operationalHour": user.operationalHour,
                "playerId": this.playerId
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
        })
    }

    storeUser(user: any) {
        this.oneSignal.getIds().then(data => {
            this.playerId = data.userId;

            let toast = this.toastCtrl.create({
                message: "Register success",
                duration: 3000,
                position: 'bottom'
    
            });
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
                "playerId": this.playerId
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
        })
    }

}