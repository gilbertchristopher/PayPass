import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  editProductForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

  ngOnInit(){
    this.initializeForm();
  }

  private initializeForm() {
    this.editProductForm = new FormGroup({
      productIDInput: new FormControl("123456789", Validators.compose([Validators.required])),
      productNameInput: new FormControl("Beras Kembang 20 kg", Validators.compose([Validators.required])),
      productQtyInput: new FormControl(10, Validators.compose([Validators.required])),
      productPriceInput: new FormControl(240000, Validators.compose([Validators.required])),
      productDescriptionInput: new FormControl("Beras setra ramos", Validators.compose([Validators.required]))
    })
  }

  editProduct() {

  }
}
