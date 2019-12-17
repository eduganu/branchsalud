import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  dateFormatter(date: Date):string {
    return date.getFullYear() + "/" +
        (date.getMonth() + 1) + "/" +
        date.getDate() + " " +
        ("0" + date.getHours()).slice(-2) + ":" +
        ("0" + date.getMinutes()).slice(-2) + ":" +
        ("0" + date.getSeconds()).slice(-2)
  }
}
