import { Store } from '../data/store.interface';
import { AuthService } from './authService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StoreService {
    private storeData: Store[] = [];

    constructor(private http: HttpClient, private authSvc: AuthService) {
    }

    addNewStore(store: Store){
        this.storeData.push(store);
    }

    removeStore(store: Store){
        this.storeData.splice(this.storeData.indexOf(store), 1);
    }

    getAllStore(){
        return this.storeData;
    }

    // storeList(token: string) {
    //     const uid = this.authSvc.getActiveUser().uid;
    //     return this.http
    //         .put('https://ionic-quotes-app.firebaseio.com/' + uid + '/fav-quotes.json?auth=' + token, this.storeData);
    // }
}