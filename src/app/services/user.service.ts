import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

//Models 
import { User } from '../models/User';
import { BpmInfo } from '../models/BpmInfo';
import { TimeService } from './time.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = environment.apiURL + '/usuarios/' + environment.userCode;
  regURL = environment.apiURL + '/registros/' + environment.userCode;

  constructor(private http:HttpClient, private timeService:TimeService) {}

  getUserInfo():Observable<User> {

    return this.http.get<User>(this.userURL)
  }

  getPulsaciones(d1: Date, d2: Date):Observable<BpmInfo[]> {
    let d1str = this.timeService.dateFormatter(d1);
    let d2str = this.timeService.dateFormatter(d2);
    console.log(this.regURL+ "/bpm?desde=" + d1str + "&hasta=" + d2str);
    return this.http.get<BpmInfo[]>(this.regURL+ "/bpm?desde=" + d1str + "&hasta=" + d2str);
  }

  getPasos(d1: Date, d2: Date):Observable<BpmInfo[]> {
    let d1str = this.timeService.dateFormatter(d1);
    let d2str = this.timeService.dateFormatter(d2);
    console.log(this.regURL+ "/bpm?desde=" + d1str + "&hasta=" + d2str);
    return this.http.get<BpmInfo[]>(this.regURL+ "/bpm?desde=" + d1str + "&hasta=" + d2str);
  }

  //"http://10.250.5.12:8080/api/registros/100/bpm?desde=2019/11/18 00:00:00 UTC&hasta=2019/11/18 01:00:00 UTC"
  

}
