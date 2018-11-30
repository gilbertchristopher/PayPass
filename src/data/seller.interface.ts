import { User } from './user.interface';

export interface Seller{
    // id: string;
    profilePic: string;
    dateOfBirth: Date;
    user: User;
    email: string;
    password: string;
    role: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    // profilePic: string;
    address: string;
    city: string;
    regency: string;
    long: number;
    lat: number;
    // dateOfBirth: Date;
    isStoreFound: boolean;
}