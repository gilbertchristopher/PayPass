import { User } from './user.interface';

export interface Seller{
    id: string;
    profilePic: string;
    dateOfBirth: Date;
    user: User;
}