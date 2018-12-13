import { Buyer } from './buyer.interface';
import {Seller} from './seller.interface';
export interface User{
    id: string;
    email: string;
    password: string;
    role: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    storeName: string;
    fullname: string;
    storename: string;
    // city: string;
    // regency: string;
    // long: number;
    // lat: number;
    // profilePic: string; // base64
    seller: Seller;
    buyer: Buyer;
}