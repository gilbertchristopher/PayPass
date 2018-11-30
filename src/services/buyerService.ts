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
        // this.fireAuth = firebase.auth();
        // this.userId = this.authService.getActiveUser();
        // this.userProfile = firebase.database().ref('user/' + this.userId);
    }

    async viewBuyerData(){
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);

        var userProfile = await userRef.on("value", snapshot => {
            this.buyerData = snapshot.val();
            console.log(this.buyerData);
        });
        console.log(this.buyerData)
        // return userRef
    }
    async requestBuyerData() {
        this.userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + this.userId);

        const userProfile = await userRef.on("value", (snapshot) => {
            // this.buyerData.id = userId;
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
}
