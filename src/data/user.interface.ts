import { Buyer } from './buyer.interface';

export interface User{
    id: string;
    email: string;
    password: string;
    role: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    // city: string;
    // regency: string;
    // long: number;
    // lat: number;
    // profilePic: string; // base64
    buyer: Buyer;
}