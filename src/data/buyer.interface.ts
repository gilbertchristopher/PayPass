import { User } from './user.interface';

export interface Buyer{
    id: string;
    first_name: string;
    last_name: string;
    dateOfBirth: Date;
    user: User;
}