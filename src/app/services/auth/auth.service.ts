


import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageCookieService } from '@services/cookie/storage-cookie.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { CryptoService } from '@services/crypto/crypto.service';
import { LocalStorageCookieService } from '@services/localstorage/localstorage-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tempData: Array<any> = [];

  private loginUserData = new BehaviorSubject(null); // next push data on pipeline
  loginUser = this.loginUserData.asObservable(); // suscribe data

  private userData = new BehaviorSubject(null); // next push data on pipeline
  watchUser = this.userData.asObservable(); // suscribe data

  private changeSidebar = new BehaviorSubject(null); // next push data on pipeline
  watchSidebar = this.changeSidebar.asObservable(); // suscribe data


  private changeHeader = new BehaviorSubject(null); // next push data on pipeline
  watchHeader = this.changeHeader.asObservable(); // suscribe data

  private changeFooter = new BehaviorSubject(null); // next push data on pipeline
  watchFooter = this.changeFooter.asObservable(); // suscribe data

  private changeRoute = new BehaviorSubject(null); // next push data on pipeline
  watchRouteData = this.changeRoute.asObservable(); // suscribe data

  private watchChangesObservable = new BehaviorSubject(null); // next push data on pipeline
  watchGlobalChanges = this.watchChangesObservable.asObservable(); // suscribe data


  constructor(private jwtHelper: JwtHelperService,
    private cookie: StorageCookieService,
    private localstorage: LocalStorageCookieService,
    private crypto: CryptoService) {
    const token = this.getToken();
    if (token) {
      this.emit(token);
    }
  }


  /**
   * Watch user login
   */
  emit(data: any) {
    this.loginUserData.next(data);
  }


  /**
  * Watch user login
  */
  emitUserData(data: any) {
    this.userData.next(data);
  }

  /**
  * Watch sidebar change
  */
  onChangeSidebar(data: any) {
    this.changeSidebar.next(data);
  }

  /**
  * Watch header change
  */
  onChangeHeader(data: any) {
    this.changeHeader.next(data);
  }

  onChangeFooter(data: any) {
    this.changeFooter.next(data);
  }
  // 
  /**
  * Watch header change
  */
  onChangeRoute(data: any) {
    this.changeRoute.next(data);
  }


  watchChanges(data: any) {
    this.watchChangesObservable.next(data);
  }


  isTokenExpired(token: any) {
    if (!token) {
      return false;
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  isAuthenticated(): boolean {
    const token = this.getCookie('authentication');
    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  } 

  setTempData(key: any, data: any) {
    this.tempData[key] = data;
  }

  getTempData(key: any) {
     return this.tempData[key];
  }


  setToken(token: any) {
    if (token) {
      this.setCookie('authentication', token);
      this.emit(this.getDecodedToken());
    }
  }

  setUser(data: any) {
    if (data) {
      this.setCookies('authorized', data);
      this.setLocalStorage('authorized', data);
      this.emit(this.getUser());
    }
  }

  decodeToken(token: any) {
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return false;
  }


  getDecodedToken() {
    const token = this.getCookie('authentication');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return false;
  }

  getToken() {
    const token = this.getCookie('authentication');
    if (token) {
      return token
    }
    return false;
  }

  getUser() {
    return this.getCookies('authorized');
  }

  setPermission(data:any) {
    if (data) {
      this.setLocalStorage('__permis', JSON.stringify(data) );
    }
  }
  getPermission() {
    let data: any = this.getLocalStorage('__permis');
    if (data) {
      data = JSON.parse(data);
      return data;
    } else {
      return [];
    }

  }

  setModules(data:any) {
    if (data) {
      this.setLocalStorage('__module_permis', JSON.stringify(data));
    }
  }
  getModules() {
    let data: any = this.getLocalStorage('__module_permis');
    if (data) {
      data = JSON.parse(data);
      return data;
    } else {
      return [];
    }

  }

  isUserLoggedIn() {

    if (this.isAuthenticated()) {
      let getUser = this.getUser();
      if (getUser && getUser.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  setStorage(key: any, data: any) {
    if (data) {
      this.setCookie(key, data);
    }
  }

  getStorage(key: any) {
    if (key) {
      return this.getCookie(key);
    } else {
      return false;
    }
  }



  async removeUser() {    
    this.removeLocalStorage('__permis');
    this.removeLocalStorage('__module_permis');
    this.removeLocalStorage('authorized');
    this.removeLocalStorage('authentication');
    this.cookie.removeAll();
    // this.emit(null);
  }





  setCookie(key: any, data: any, type = 'days', expire: any = ""): any {
    let encodedData;
    if (environment.encryption) {
      encodedData = this.crypto.encode(data, 1);
    } else {
      encodedData = data;
    }

    this.cookie.setCookie(encodedData, key, type, expire);
  }

  removeCookie(key: any) {
    this.cookie.removeCookie(key);
  }

  getCookie(key: any): any {
    let getData = this.cookie.getCookie(key);
    if (environment.encryption) {
      return this.crypto.decode(getData, 1);
    } else {
      return getData;
    }
  }

  setCookies(key: any, data: any): any {
    let encodedData;
    if (environment.encryption) {
      encodedData = this.crypto.encode(data, 1);
    } else {
      encodedData = data;
    }
    this.cookie.setCookies(encodedData, key);
  }

  getCookies(key: any): any {
    let getData = this.cookie.getCookies(key);

    if (environment.encryption) {
      return this.crypto.decode(getData, 1);
    } else {
      return getData;
    }

  }

  setLocalStorage(key: any, data: any) {
    let encodedData;
    if (environment.encryption) {

      encodedData = this.crypto.encode(data, 1);
    } else {
      encodedData = JSON.stringify(data);
    }
    this.localstorage.setCookies(key, encodedData);

  }

  getLocalStorage(key: any) {
    let getData:any = this.localstorage.getCookies(key);

    if (environment.encryption) {
      let encodedData = this.crypto.decode(getData, 1);
      if (encodedData && this.IsJsonString(encodedData)) {
        encodedData = JSON.parse(encodedData);
      }
      return encodedData;
    } else {
      if (getData && this.IsJsonString(getData)) {
        getData = JSON.parse(getData);
      }
      return getData;
    }

  }


  removeLocalStorage(key: any) {
    this.localstorage.remove(key);
  }
  removeTempData(key: any) {
    this.tempData[key] = '';
  }

  IsJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }


}



