import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterBlockchainService {

  constructor(private http: HttpClient) { }
  registerUser(registerUserJson: string): Promise<any> {
    return this.http.post('http://192.168.100.20:3000/transactions/new', registerUserJson, httpOptions).toPromise<any>();

  }

}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
