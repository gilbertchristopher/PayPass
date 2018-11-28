import { Store } from './store.interface';
import { Product } from './product.interface';

export interface ProductStore{
    id: String;
    products: Product[];
    store: Store;
    qty: number;
    price: number;
}