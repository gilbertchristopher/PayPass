import { Store } from "./store.interface";
import { Buyer } from "./buyer.interface";
import { DateTime } from "ionic-angular";
import { Product } from "./product.interface";

export interface Transaction{
    id: String;
    store: Store;
    buyer: Buyer;
    date: DateTime;
    total_price: number;
    products: Product[];

}