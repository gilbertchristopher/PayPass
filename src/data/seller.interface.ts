import { User } from './user.interface';

export interface Seller{
    // id: string;
    profilePic: string;
    dateOfBirth: Date;
    user: User;
    email: string;
    password: string;
    role: string;
    fullname: string;
    storename: string;
    phoneNumber: string;
    address: string;
    city: string;
    regency: string;
    long: number;
    lat: number;
    isStoreFound: boolean;
}