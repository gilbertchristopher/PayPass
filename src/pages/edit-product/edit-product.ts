import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductStore } from '../../data/productstore.interface';
import { ProductService } from '../../services/productService';


@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  editProductForm: FormGroup;
  //addProductForm: FormGroup;
  productStore: ProductStore;
  product: any;
  uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private productService: ProductService) {
    //console.log(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

  ngOnInit(){
    this.initializeForm();
  }

  private initializeForm() {
    this.editProductForm = new FormGroup({
      productIDInput: new FormControl(this.navParams.get('id'), Validators.compose([Validators.required])),
      productNameInput: new FormControl(this.navParams.get('product').name, Validators.compose([Validators.required])),
      productQtyInput: new FormControl(this.navParams.get('qty'), Validators.compose([Validators.required])),
      productPriceInput: new FormControl(this.navParams.get('price'), Validators.compose([Validators.required])),
      productDescriptionInput: new FormControl(this.navParams.get('product').desc, Validators.compose([Validators.required]))
    })
  }

  editProduct() {
    this.product = {desc: this.editProductForm.value.productDescriptionInput, name: this.editProductForm.value.productNameInput};
    this.productStore = {product: this.product, qty: this.editProductForm.value.productQtyInput, price: this.editProductForm.value.productPriceInput};
    this.productService.editProductToStore(this.productStore, this.editProductForm.value.productIDInput);
    this.navCtrl.pop();
  }
}
