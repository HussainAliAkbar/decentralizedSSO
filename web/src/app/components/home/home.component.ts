import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import * as keypair from 'keypair';
import { CryptographyComponent } from '../common/cryptography/cryptography.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  encryptedPublicKey: string;
  decryptedPublicKey: string;
  plainText: string;
  cipherText: string;
  requestedTpsSecureToken: string;
  requestedTpsPublicKey: string;
  isDataSent = false;
  constructor(
    private crypt: CryptographyComponent,
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  // encrypt() {
  //   debugger;
  //   this.encryptedPublicKey = this.crypt.encrypt(this.plainText);
  //   console.log(this.encryptedPublicKey)
  // }
  // decrypt() {
  //   // this.decryptedPublicKey = this.crypt.decrypt(this.cipherText);cipherText
  //   this.crypt.decrypt('U2FsdGVkX19JLvRWOYtZHiM06CDt++grjGtt46lde91Cid5RdVxX5FvVT1qN2kda');
  // }
  requestSecureToken() {
    this.homeService.getSecureToken().then((result) => {
      this.requestedTpsSecureToken = result.data.token;
      this.requestedTpsPublicKey = result.data.publicKey;
    }).catch(err => {

    })
  }
  sendConsumerData() {
    const consumerInformation = "{'firstName':'asad'}";
    const encryptedConsumerInfo = this.crypt.encrypt(consumerInformation, this.requestedTpsPublicKey).toString();
    const body = {
      "transactionType": "serviceRegistration",
      "publicKey": this.requestedTpsPublicKey,
      "secureToken": this.requestedTpsSecureToken,
      "encryptedData": encryptedConsumerInfo,
      "broadcast": true
    }
    this.homeService.sendConsumerData(body).then((result) => {
      this.isDataSent = true;
    }).catch((error) => {

    });
  }
  signUp() {
    const secureToken = {
      "secureToken": this.requestedTpsSecureToken
    }
    this.homeService.consumerSignUp(secureToken).then(value => {
      console.log(value);
    });
  }
}
