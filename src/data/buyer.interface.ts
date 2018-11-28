import { User } from './user.interface';

export interface Buyer{
    id: string;
    first_name: string;
    last_name: string;
    dateOfBirth: Date;
    address: string;
    buyerCity: string;
    buyerRegency: string;
    buyerPhone: string;
    user: User;
}