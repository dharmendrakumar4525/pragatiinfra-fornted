import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }


  getKey(keyType: any) {
    if (keyType === 1) {
      return environment.app_name + environment.request_encode_key + environment.private_key;
    }
    else {
      return environment.request_encode_key;
    }


  }
  encode(data: any, keyType: any) {

    const encryptData = JSON.stringify(data);
    const encryptedMessage = AES.encrypt(encryptData, this.getKey(keyType)).toString();
    return encryptedMessage;

  }


  decode(data: any, keyType: any) {

    try {
      if (!data || data == null) {
        return null;
      }
      const bytes = AES.decrypt(data.toString(), this.getKey(keyType));
      const decryptedData = bytes.toString(enc.Utf8);
      if (decryptedData) {
        return JSON.parse(decryptedData);
      } else {
        return false;
      }
    } catch (error) {
      return null
    }


  }

  decodeByKey(data: any, key: any) {
    try {
      if (!data || data == null || !key || key == null) {
        return data;
      }
      const bytes = AES.decrypt(data.toString(), key);
      const decryptedData = bytes.toString(enc.Utf8);
      if (decryptedData) {
        return JSON.parse(decryptedData);
      } else {
        return false;
      }

    } catch (error) {
      return null
    }
  }



}
