import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}
  register(route, data) {
    let httpHeaderValue = new HttpHeaders();
    httpHeaderValue = httpHeaderValue.set('Content-Type', 'application/json');
    return this._http.post(route, data).pipe(map((response: any) => response));
  }
}
