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
                if(this.userData == null || this.userData == ""){
                  const sellerRef: firebase.database.Reference = firebase.database().ref('seller/' + this.userId);
                  console.log("ha" , sellerRef);
                  sellerRef.on("value", (snapshot2) => {
                      this.userData = snapshot2.val();
                      console.log(this.userData);
                    })
                  resolve(true);  
                }
                else
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

    readStoreData(storeId: string, isStoreFound: boolean, transactionId: string) {
        return new Promise((resolve) => {
            if (!isStoreFound) {
                const userRef: firebase.database.Reference = firebase.database().ref('user/' + storeId);
                let datetime = new Date();
                let date = datetime.getDate() + "/" + (datetime.getMonth() + 1) + "/" + datetime.getFullYear();
                let time = datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds();


                userRef.on("value", (snapshot) => {
                    this.storeData = snapshot.val();

                    const transDateRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId + '/transactions/');
                    // status terdiri dari pending, cancelled, success
                    transDateRef.push({ "date": date, "time": time, "status": "pending", "storeId": storeId }).then((res) => {
                        this.transactionId = res.key;

                        // masukkin transactionId ke localstorage
                        this.storage.set('transactionId', this.transactionId);

                        // update transactionIdNow ke firebase
                        this.updateUserData({ "transactionIdNow": this.transactionId });

                        // masukkin data store ke localstorage
                        this.storage.set('storeData', this.storeData);

                        // tampilin toast success
                        let toast = this.toastCtrl.create({
                            message: "Store found!",
                            duration: 3000,
                            position: "bottom"
                        });
                        toast.present();
                
                        resolve({"storeData": this.storeData, "transactionId": this.transactionId});
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

    addProductToTransaction(storeId: string, products: any, productId: string, transactionId: string) {
        const storeRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId + '/transactions/' + transactionId + '/products/' + productId);
        storeRef.set(products).then(res => {
            console.log(res);
        });
        let product = products;
        product['id'] = productId;
        // this.productList.push(product);
        // this.showToast(this.productList);
    }

    getAllProductTransaction() {

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

    transactionDone() {
        // remove transactionIdNow from firebase
    }
}
