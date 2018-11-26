import { User } from './user.interface';

export interface Buyer{
    id: String;
    first_name: String;
    last_name: String;
    dateOfBirth: Date;
    address: String;
    buyerCity: String;
    buyerRegency: String;
    buyerPhone: String;
    user: User;
}