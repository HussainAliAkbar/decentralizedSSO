import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getSecureToken() {
    return this.http.get(':4000/request-secure-token/').toPromise<any>();
  }

  sendConsumerData(consumerData: any): Promise<any> {
    // http://192.168.100.20:3000/
    return this.http.post(':3000/transactions/new', JSON.stringify(consumerData)).toPromise<any>();
  }

  consumerSignUp(secureToken: any): Promise<any> {
    // http://192.168.100.20:3000/
    return this.http.post(':4001/sign-up', JSON.stringify(secureToken)).toPromise<any>();
  }
  requestConsumerData(publicKeyObject: any): Promise<any> {
    return this.http.post(':3000/fetch-by-public-key', JSON.stringify(publicKeyObject)).toPromise<any>();
  }
}
