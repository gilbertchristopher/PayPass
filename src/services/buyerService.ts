import firebase from 'firebase';
import { AuthService } from './authService';
import { Injectable } from '@angular/core';
import { ToastController, DateTime } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {
    userData: any;
    userId: any;
    productData: any;
    storeData: any;
    totalTransaction: number;

    constructor(private authService: AuthService, private toastCtrl: ToastController) {
    }

    requestUserData() {
        return new Promise((resolve) => {
            this.userId = this.authService.getActiveUser().uid;
            const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);
            userRef.on("value", (snapshot) => {
                this.userData = snapshot.val();
                resolve(true);
            })
        })
    }

    getUserData() {
        return this.userData;
    }

    updateUserData(userUpdateData: any) {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);

        userRef.update(userUpdateData).then(res => {
            console.log(res);
        });
    }

    readStoreData(storeId: string) {
        return new Promise((resolve) => {
            const userRef: firebase.database.Reference = firebase.database().ref('user/' + storeId);
            const transDateRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId + '/transactions/transactionId/');
            const transTotalRef: firebase.database.Reference = firebase.database().ref('user/');
            let date = new Date();
            let time = date.getTime();

            transDateRef.set({ "date": date, "time": time, "isDone": false }).then((res) => {
                let toast = this.toastCtrl.create({
                    message: res + " " + date + " " + time,
                    duration: 3000,
                    position: "bottom"
                });
                toast.present();
            });
            transTotalRef.on("value", snapshot => {
                this.totalTransaction = snapshot.val().transactionTotal;
                transTotalRef.update({"transactionTotal": (this.totalTransaction + 1)});
                userRef.on("value", (snapshot) => {
                    this.storeData = snapshot.val();
                    const transactionRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId + '/trasactions/transactionId/store/trans' + (this.totalTransaction + 1) + "/" + storeId);
        
                    transactionRef.set(this.storeData).then(() => {
                        let toast = this.toastCtrl.create({
                            message: "Store found!",
                            duration: 3000,
                            position: "bottom"
                        });
                        toast.present();
                    }).catch((err) => {
                        let toast = this.toastCtrl.create({
                            message: "Store doesn't found!",
                            duration: 3000,
                            position: "bottom"
                        });
                        toast.present();
                        console.log(err);
                    });
                    resolve(true);
                })
            })
            
        })
    }

    readStoreData2(storeId: string, products: any) {
        const storeRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId + '/transcations/.../products/');
        storeRef.update(products).then(res => {
            console.log(res);
        })
    }

    readProductData(storeId: string) {
        return new Promise((resolve) => {
            const userRef: firebase.database.Reference = firebase.database().ref('user/' + storeId + '/products');
            userRef.on("value", (snapshot) => {
                this.productData = snapshot.val();
                resolve(true);
            })
        })
    }

    addUserTransactionData(userAddData: any) {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId + '/transactions/products');

        userRef.update(userAddData).then(res => {
            console.log(res);
        })
    }
}
