import firebase from 'firebase';
// import { Buyer } from '../data/buyer.interface'
import { AuthService } from './authService';
import { Injectable } from '@angular/core';

@Injectable()
export class BuyerService {
    buyerData: any;
    public fireAuth: any;
    public userProfile: firebase.database.Reference;
    userId: any;

    constructor(private authService: AuthService) {
    }

    async requestBuyerData() {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);

        const userProfile = await userRef.on("value", (snapshot) => {
            console.log(snapshot.val());
            this.buyerData = snapshot.val();
        })   
        console.log(this.buyerData);
        return this.buyerData;
    }

    getBuyerData(){
        console.log(this.buyerData);
        return this.buyerData;
    }

    updateBuyerData(){
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);

        // userRef.update()

    }
}
