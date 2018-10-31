import { Cryptography2Component } from './../common/cryptography2/cryptography2.component';
import { LocalStorage } from './../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
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
  requestData;
  responseData;
  requestConsumerDataObject;
  responseConsumerDataObject;
  responseConsumerDecryptedData;
  signupRequestData;
  signupResponseData;
  signupResponseDecryptedData;
  constructor(
    private crypt: CryptographyComponent,
    private cryptography2: Cryptography2Component,
    private homeService: HomeService,
    private toastrService: ToastrService,
    private localStorage: LocalStorage
  ) { }

  ngOnInit() {
  }
  encrypt() {
   this.encryptedPublicKey = this.cryptography2.encrypt(this.plainText,this.localStorage.getItem('servicePublicKey'))
  }
  decrypt() {
   this.decryptedPublicKey = this.cryptography2.decrypt(this.cipherText,this.localStorage.getItem('servicePrivateKey'));
  }
  requestSecureToken() {
    this.homeService.getSecureToken().then((result) => {
      this.requestedTpsSecureToken = result.data.token;
      this.requestedTpsPublicKey = result.data.publicKey;
      this.toastrService.success('Success');
    }).catch(err => {
      this.toastrService.error(err.error.errors[0].message);
    });
  }
  sendConsumerData() {
    // const consumerInformation = '{"firstName":"asad"}';
    const encryptedConsumerInfo = this.cryptography2.encrypt(this.responseConsumerDecryptedData,
      this.requestedTpsPublicKey).toString();
    const body = {
      'transactionType': 'serviceRegistration',
      'publicKey': this.requestedTpsPublicKey,
      'secureToken': this.requestedTpsSecureToken,
      'encryptedData': encryptedConsumerInfo,
      'broadcast': true
    };
    this.requestData = JSON.stringify(body);
    this.homeService.sendConsumerData(body).then((result) => {
      this.isDataSent = true;
      this.toastrService.success('Success');
      this.responseData = JSON.stringify(result.data);
    }).catch((err) => {
      this.toastrService.error(err.error.errors[0].message);
    });
  }

  requestConsumerData() {
    const requestBody = {
      "publicKey": this.localStorage.getItem('consumerPublicKey')
    };
    this.requestConsumerDataObject = JSON.stringify(requestBody);
    this.homeService.requestConsumerData(requestBody).then(result => {
      this.responseConsumerDataObject = JSON.stringify(result.data);
      this.toastrService.success('Success');
      debugger;
      this.responseConsumerDecryptedData = this.cryptography2.decrypt(result.data.transaction.encryptedData,
        this.localStorage.getItem('consumerPrivateKey'));
    }).catch(err => {
      this.toastrService.error(err.error.errors[0].message);
    });
  }

  signUp() {
    const secureToken = {
      'secureToken': this.requestedTpsSecureToken
    };
    this.signupRequestData = JSON.stringify(secureToken);
    this.homeService.consumerSignUp(secureToken).then(value => {
      this.toastrService.success('User signup success');
      this.signupResponseData = JSON.stringify(value.data);
      debugger;
      const s = value.data.transaction.encryptedData;
      this.signupResponseDecryptedData = this.cryptography2.decrypt(value.data.transaction.encryptedData,
        this.localStorage.getItem('servicePrivateKey'));
    }).catch(err => {
      this.toastrService.error(err);
    });
  }
}
