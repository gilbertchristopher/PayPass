import firebase from 'firebase';
import { AuthService } from './authService';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductStore } from '../data/productstore.interface';
import { ProductTransaction } from '../data/producttransaction.interface';

@Injectable()
export class UserService {
    userData: any;
    userId: string;
    productData: ProductStore[];
    storeData: any;
    productList: ProductTransaction[];
    transactionId: string;
    transactionData: any;

    constructor(private authService: AuthService, private toastCtrl: ToastController, private storage: Storage) {
    }

    showToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 10000,
            position: "bottom"
        });
        toast.present();
    }

    requestUserData() {
        return new Promise((resolve) => {
            this.userId = this.authService.getActiveUser().uid;
            const userRef: firebase.database.Reference = firebase.database().ref('buyer/' + this.userId);
            userRef.on("value", (snapshot) => {
                this.userData = snapshot.val();
                if (this.userData == null || this.userData == "") {
                    const sellerRef: firebase.database.Reference = firebase.database().ref('seller/' + this.userId);
                    sellerRef.on("value", (snapshot2) => {
                        this.userData = snapshot2.val();
                        resolve(true);
                    })
                }
                else
                    resolve(true);
            })
        })
    }

    getUserData() {
        return this.userData;
    }

    updateUserData(userUpdateData: any, role: string) {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref(role + '/' + this.userId);

        userRef.update(userUpdateData).then(res => {
            console.log(res);
        });
    }

    updateUserDataOperationalHour(userUpdateData: any, role: string) {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref(role + '/' + this.userId + '/operationalHour/');

        userRef.update(userUpdateData).then(res => {
            console.log(res);
        });
    }

    readStoreData(storeId: string, isStoreFound: boolean, transactionId: string) {
        return new Promise((resolve) => {
            if (!isStoreFound) {
                const userRef: firebase.database.Reference = firebase.database().ref('buyer/' + storeId);
                let datetime = new Date();
                let date = datetime.getDate() + "/" + (datetime.getMonth() + 1) + "/" + datetime.getFullYear();
                let time = datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds();


                userRef.on("value", (snapshot) => {
                    this.storeData = snapshot.val();

                    const transDateRef: firebase.database.Reference = firebase.database().ref('buyer/' + this.userId + '/transactions/');
                    // status terdiri dari pending, cancelled, success
                    transDateRef.push({ "date": date, "time": time, "status": "pending", "storeId": storeId }).then((res) => {
                        this.transactionId = res.key;

                        // masukkin transactionId ke localstorage
                        this.storage.set('transactionId', this.transactionId);

                        // update transactionIdNow ke firebase
                        this.updateUserData({ "transactionIdNow": this.transactionId }, 'buyer');

                        // masukkin data store ke localstorage
                        this.storage.set('storeData', this.storeData);

                        // tampilin toast success
                        let toast = this.toastCtrl.create({
                            message: "Store found!",
                            duration: 3000,
                            position: "bottom"
                        });
                        toast.present();

                        resolve({ "storeData": this.storeData, "transactionId": this.transactionId });
                    })
                });
            }
            else {
                const transactionRef = firebase.database().ref('user/' + this.userId + '/transactions/' + transactionId + '/products/');

                transactionRef.on("value", snapshot => {
                    this.productList = snapshot.val();
                    resolve(snapshot.val());
                });
            }
        })


    }

    addProductToTransaction(transactionId: string, products: any, storeId: string) {
        const userRef: firebase.database.Reference = firebase.database().ref('buyer/' + this.userId + '/transactions/' + transactionId + '/products/');
        const storeRef: firebase.database.Reference = firebase.database().ref('seller/' + storeId + '/transactions/' + transactionId + '/products/');
        userRef.set(products).then(res => {
            // console.log(res)
            storeRef.set(products).then(val => {

            })
        }).catch(err => {
            console.log(err);
        });
    }

    getAllProductTransaction() {

    }

    readProductData(storeId: string) {
        return new Promise((resolve) => {
            const userRef: firebase.database.Reference = firebase.database().ref('seller/' + storeId + '/products');
            userRef.on("value", (snapshot) => {
                this.productData = snapshot.val();
                resolve(true);
            })
        })
    }

    addUserTransactionData(userAddData: any) {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('buyer/' + this.userId + '/transactions/products');

        userRef.update(userAddData).then(res => {
            console.log(res);
        })
    }

    transactionDone() {
        // remove transactionIdNow from firebase
    }

    uploadPhotoUser(base64Url: string, role: string) {
        return new Promise((resolve) => {
            this.userId = this.authService.getActiveUser().uid;
            const userRef: firebase.database.Reference = firebase.database().ref(role + '/' + this.userId);
            userRef.update({
                "profile": "data:image/jpeg;base64," + base64Url
            }).then(() => {
                resolve(true)
            }).catch(err => {
                resolve(false)
            })
        })
    }


    // StoreService
    getTransactionData(data: any) {
        // this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('seller/' + data.storeId + '/transactions/' + data.transactionId);
        this.transactionData = {};
        return new Promise((resolve) => {
            userRef.on('value', (snapshot) => {
                this.transactionData = snapshot.val();
                resolve(this.transactionData);
            });
        });
    }

    getAllTransactionData() {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('seller/' + this.userId + '/transactions/');
        
        return new Promise((resolve) => {
            userRef.on('value', (snapshot) => {
                this.transactionData = snapshot.val();
                resolve(this.transactionData);
            });
        });
    }
}
