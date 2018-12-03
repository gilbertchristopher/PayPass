import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage implements OnInit{
  addProductForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.initializeForm();
  }

  private initializeForm(){
    this.addProductForm = new FormGroup({
      productIDInput: new FormControl(null, Validators.compose([Validators.required])),
      productNameInput: new FormControl(null, Validators.compose([Validators.required])),
      productQtyInput: new FormControl(null, Validators.compose([Validators.required])),
      productPriceInput: new FormControl(null, Validators.compose([Validators.required])),
      productDescriptionInput: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

}
