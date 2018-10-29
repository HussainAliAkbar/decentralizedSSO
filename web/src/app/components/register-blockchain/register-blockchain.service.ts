import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterBlockchainService {

  constructor(private http: HttpClient,
 ) { }
  registerUser(registerUserJson: string): Promise<any> {
    // http://192.168.100.20:3000/
    return this.http.post(':3000/transactions/new', registerUserJson).toPromise<any>();
  }

}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
