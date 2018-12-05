import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  editProductForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    console.log("sesuatu");
  }
}
