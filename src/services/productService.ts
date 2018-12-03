import { Product } from '../data/product.interface';
import { AuthService } from './authService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    private productData: Product[] = [];

    constructor(private http: HttpClient, private authSvc: AuthService) {
    }

    addNewStore(product: Product){
        this.productData.push(product);
    }

    removeproduct(product: Product){
        this.productData.splice(this.productData.indexOf(product), 1);
    }

    getAllproduct(){
        return this.productData;
    }

    // productList(token: string) {
    //     const uid = this.authSvc.getActiveUser().uid;
    //     return this.http
    //         .put('https://ionic-quotes-app.firebaseio.com/' + uid + '/fav-quotes.json?auth=' + token, this.productData);
    // }
}