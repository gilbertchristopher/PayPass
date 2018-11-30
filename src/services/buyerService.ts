import firebase from 'firebase';
// import { Buyer } from '../data/buyer.interface'
import { AuthService } from './authService';
import { Injectable } from '@angular/core';

@Injectable()
export class BuyerService {
    buyerData: any;
    userId: any;

    constructor(private authService: AuthService) {
    }

    requestBuyerData() {
        return new Promise((resolve) => {
            this.userId = this.authService.getActiveUser().uid;
            const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);
            userRef.on("value", (snapshot) => {
                this.buyerData = snapshot.val();
                resolve(true);
            })   
        })
    }

    getBuyerData(){
        return this.buyerData;
    }

    updateBuyerData(buyerUpdateData: any){
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);

        userRef.update(buyerUpdateData).then(res => {
            console.log(res);
        });
    }
}
