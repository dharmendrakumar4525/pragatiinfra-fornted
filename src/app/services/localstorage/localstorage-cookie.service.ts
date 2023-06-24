import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCookieService {

  constructor(private cookie: LocalStorageService) { }
  private prefix = environment.app_name;


  public setCookies(key:any,value:any) {
    key = `${this.prefix}-${key}`;
    this.cookie.set(key, value);
  }

  public getCookies(key:any) {
    key = `${this.prefix}-${key}`;
    let data = this.cookie.get(key);
    return data
  }

  public remove(key:any) {
    key = `${this.prefix}-${key}`;
    this.cookie.remove(key);
  }

}
