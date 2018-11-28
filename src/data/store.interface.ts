import { User } from './user.interface';
import { Time } from '@angular/common';

export interface Store{
    id: String;
    storeName: String;
    storeOpenHour: Time;
    storeCloseHour: Time;
    storeQRCode: String; // base64
    user: User;
}