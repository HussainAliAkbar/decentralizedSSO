import { Component, OnInit } from '@angular/core';
import * as keypair from 'keypair';
import { CryptographyComponent } from '../common/cryptography/cryptography.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  encryptedPublicKey: string;
  decryptedPublicKey: string;
  publicKey: string;
  privateKey: string;
  plainText: string;
  cipherText: string;
  constructor(
    private crypt: CryptographyComponent
  ) { }

  ngOnInit() {
    // this.crypt;
    // this.encryptedPublicKey = this.crypt.encryptedPublicKey;
    // this.encryptedPublicKey = this.crypt.encrypt();
    // this.generateKeys();
  }

  generateKeys() {
    const keypair = require('keypair');
    const pair = keypair();
    this.publicKey = pair.public;
    this.privateKey = pair.private;
  }

  encrypt() {
    debugger;
    this.encryptedPublicKey = this.crypt.encrypt(this.plainText);
    console.log(this.encryptedPublicKey)
  }
  decrypt() {
    this.decryptedPublicKey = this.crypt.decrypt(this.cipherText);
  }
}
