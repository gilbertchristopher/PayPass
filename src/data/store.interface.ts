import { User } from './user.interface';
import { Time } from '@angular/common';

export interface Store{
    id: String;
    storeName: String;
    storeAddress: String;
    storeCity: String;
    storeRegency: String;
    storePhone: String;
    storeOpenHour: Time;
    storeCloseHour: Time;
    user: User;
}