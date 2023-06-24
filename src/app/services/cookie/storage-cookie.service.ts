import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageCookieService {

  constructor(private cookie: CookieService) { }
  private prefix = environment.app_name;
  environmentData:any = environment;

  public setCookie(value:any, key:any, type:any, expire :any) {
    key = `${this.prefix}-${key}`;
    
    let date;
    if(type == 'days'){
        date = new Date();       
      if(expire){          
      date.setDate(date.getDate() + Number(expire)); 
      } else {
        date.setDate(date.getDate() + 30); 
      }
    } else {
      date = expire;
    }    
    environment.cookiesOptions['expires'] = date;
    this.cookie.put(key, value,this.environmentData.cookiesOptions);
  }

  public getCookie(key:any) {
    key = `${this.prefix}-${key}`;
    return this.cookie.get(key);
  }

  public setCookies(obj: Object, key:any) {
    key = `${this.prefix}-${key}`;
    let date = new Date(); 
    date.setDate(date.getDate() + 30); 
    this.environmentData.cookiesOptions['expires'] = date;
    this.cookie.putObject(key, obj, this.environmentData.cookiesOptions);
  }

  public getCookies(key:any) {
    key = `${this.prefix}-${key}`;
    return this.cookie.getObject(key);
  }

  public removeCookie(key:any) {
    key = `${this.prefix}-${key}`;
    this.cookie.remove(key);
  }

  public removeAll() {
    this.cookie.removeAll();
  }

}
