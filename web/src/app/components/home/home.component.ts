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
  signupRequestData;
  signupResponseData;
  constructor(
    private crypt: CryptographyComponent,
    private homeService: HomeService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  requestSecureToken() {
    this.homeService.getSecureToken().then((result) => {
      this.requestedTpsSecureToken = result.data.token;
      this.requestedTpsPublicKey = result.data.publicKey;
      this.toastrService.success('Success');
    }).catch(err => {
      this.toastrService.error(err);
    });
  }
  sendConsumerData() {
    const consumerInformation = '{"firstName":"asad"}';
    const encryptedConsumerInfo = this.crypt.encrypt(consumerInformation, this.requestedTpsPublicKey).toString();
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
      this.toastrService.error(err);
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
    }).catch(err => {
      this.toastrService.error(err);
    });
  }
}
