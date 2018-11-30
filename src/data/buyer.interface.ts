import { User } from './user.interface';

export interface Buyer{
    id: string;
    profilePic: string;
    dateOfBirth: Date;
    user: User;
}