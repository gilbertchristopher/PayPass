import { Product } from '../data/product.interface';
import { AuthService } from './authService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import { ProductStore } from '../data/productstore.interface';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ProductService {
    private productData: Product[] = [];

    constructor(private http: HttpClient, private authSvc: AuthService, private loadingCtrl: LoadingController) {
    }

    addNewStore(product: Product){
        this.productData.push(product);
    }

    removeproduct(product: Product){
        let uid = this.authSvc.getActiveUser().uid;
        const storeRef = firebase.database().ref('seller/' + uid + '/products/');
        storeRef.child(product.id).remove();
    }

    getAllproduct(){
        return this.productData;
    }

    addProductToStore(product: ProductStore, id: string) {
        let uid = this.authSvc.getActiveUser().uid;
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Loading, Please Wait...',
            dismissOnPageChange: true,
        });
      
        loading.present();
        const productRef: firebase.database.Reference = firebase.database().ref('seller/' + uid + '/products/' + id);

        productRef.update(product).then(res => {
            loading.dismiss();
        }).catch(err => {
            loading.dismiss();
        })
    }

    editProductToStore(product: ProductStore, id: string){
        let uid = this.authSvc.getActiveUser().uid;
        let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Loading, Please Wait...',
            dismissOnPageChange: true,
        });
      
        loading.present();
        const productRef: firebase.database.Reference = firebase.database().ref('seller/' + uid + '/products/' + id);

        productRef.update(product).then(res => {
            loading.dismiss();
        }).catch(err => {
            loading.dismiss();
        })
    }

    checkProduct(productId: string) {
        return new Promise((resolve) => {
            let uid = this.authSvc.getActiveUser().uid;
            const productRef = firebase.database().ref('seller/' + uid + '/products/' + productId);
            productRef.on('value', product => {
                let res = product.val();
                if(res == null){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            })
        })
    }

    getProduct(productId: string) {
        return new Promise((resolve) => {
            const productRef = firebase.database().ref('product/' + productId);
            productRef.on('value', product => {
                let res = product.val();
                resolve(res);
            })
        })
    }
}