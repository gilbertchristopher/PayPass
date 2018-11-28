import { User } from './user.interface';

export interface Buyer{
    id: String;
    first_name: String;
    last_name: String;
    dateOfBirth: Date;
    user: User;
}