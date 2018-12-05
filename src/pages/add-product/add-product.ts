import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/productService';
import { AuthService } from '../../services/authService';
import { ProductStore } from '../../data/productstore.interface';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage implements OnInit{
  addProductForm: FormGroup;
  productStore: ProductStore;
  product: any;
  uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private productService: ProductService,
            private authService: AuthService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.addProductForm = new FormGroup({
      productIDInput: new FormControl(this.navParams.get("id"), Validators.compose([Validators.required])),
      productNameInput: new FormControl(this.navParams.get("product").name, Validators.compose([Validators.required])),
      productQtyInput: new FormControl(null, Validators.compose([Validators.required, Validators.min(1)])),
      productPriceInput: new FormControl(null, Validators.compose([Validators.required, Validators.min(100)])),
      productDescriptionInput: new FormControl(this.navParams.get("product").desc, Validators.compose([Validators.required]))
    })
  }

  addProduct() {
    this.product = {desc: this.addProductForm.value.productDescriptionInput, name: this.addProductForm.value.productNameInput};
    this.productStore = {product: this.product, qty: this.addProductForm.value.productQtyInput, price: this.addProductForm.value.productPriceInput};
    this.productService.addProductToStore(this.productStore, this.addProductForm.value.productIDInput);
    this.navCtrl.pop();
  }

}
