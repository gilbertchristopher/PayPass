import firebase from 'firebase';
import { Buyer } from '../data/buyer.interface'
import { AuthService } from './authService';


export class BuyerService {
    buyerData: any;
    constructor(private authService: AuthService) {
    }
    getBuyerData() {
        let userId = this.authService.getActiveUser().uid;
        const userRef: firebase.database.Reference = firebase.database().ref('user/' + userId);

        userRef.on("value", (snapshot) => {
            // this.buyerData.id = userId;
            console.log(snapshot.val);
            // this.buyerData = snapshot.val;
        })
    }
}
