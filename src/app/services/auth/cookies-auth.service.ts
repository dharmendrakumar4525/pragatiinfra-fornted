import { Injectable } from '@angular/core';
import { StorageCookieService } from '@services/cookie/storage-cookie.service';
import { environment } from '@env/environment';
import { CryptoService } from '@services/crypto/crypto.service';
import { LocalStorageCookieService } from '@services/localstorage/localstorage-cookie.service';


@Injectable( {
  providedIn: 'root'
} )
export class cookiesAuthService {

 
  constructor(
    private cookie: StorageCookieService,
    private localstorage: LocalStorageCookieService,
    private crypto: CryptoService ) {

  }

  setStorage( key:any, data:any ) {
    if ( data ) {
      this.setCookie( key, data );
    }
  }

  getStorage( key:any ) {
    if ( key ) {
      return this.getCookie( key );
    } else {
      return false;
    }
  }


  setCookie( key:any, data:any, type = 'days', expire: any = "" ): any {
    let encodedData;
    if ( environment.encryption ) {
      encodedData = this.crypto.encode( data, 1 );
    } else {
      encodedData = data;
    }

    this.cookie.setCookie( encodedData, key, type, expire );
  }

  removeCookie( key:any ) {
    this.cookie.removeCookie( key );
  }

  getCookie( key:any ): any {
    let getData = this.cookie.getCookie( key );
    if ( environment.encryption ) {
      return this.crypto.decode( getData, 1 );
    } else {
      return getData;
    }
  }

  setCookies( key:any, data:any ): any {
    let encodedData;
    if ( environment.encryption ) {
      encodedData = this.crypto.encode( data, 1 );
    } else {
      encodedData = data;
    }
    this.cookie.setCookies( encodedData, key );
  }

  getCookies( key:any ): any {
    let getData = this.cookie.getCookies( key );

    if ( environment.encryption ) {
      return this.crypto.decode( getData, 1 );
    } else {
      return getData;
    }

  }

  setLocalStorage( key:any, data:any ) {
    let encodedData;
    if ( environment.encryption ) {

      encodedData = this.crypto.encode( data, 1 );
    } else {
      encodedData = JSON.stringify( data );
    }
    this.localstorage.setCookies( key, encodedData );

  }

  getLocalStorage( key:any ) {
    let getData:any = this.localstorage.getCookies( key );

    if ( environment.encryption ) {
      let encodedData = this.crypto.decode( getData, 1 );
      if ( encodedData && this.IsJsonString( encodedData ) ) {
        encodedData = JSON.parse( encodedData );
      }
      return encodedData;
    } else {
      if ( getData && this.IsJsonString( getData ) ) {
        getData = JSON.parse( getData );
      }
      return getData;
    }

  }

  removeLocalStorage( key:any ) {
    this.localstorage.remove( key );

  }
  
  IsJsonString( str:any ) {
    try {
      JSON.parse( str );
    } catch ( e ) {
      return false;
    }
    return true;
  }


  
}

