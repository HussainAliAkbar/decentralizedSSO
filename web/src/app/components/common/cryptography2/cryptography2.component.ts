import { Component, OnInit } from '@angular/core';
import {Buffer} from 'buffer/';

@Component({
  selector: 'app-cryptography2',
  templateUrl: './cryptography2.component.html',
  styleUrls: ['./cryptography2.component.scss']
})
export class Cryptography2Component implements OnInit {

  ngOnInit() {
  }

  private enabled: boolean;

  constructor() {
    // this.privateKey = config.authentication.rsa.privateKey;
    // this.publicKey = config.authentication.rsa.publicKey;
    this.enabled = true;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  encrypt(plaintext: string, privateKey: string): string {
    const crypto = require('crypto-browserify');
    let buffer = new Buffer(plaintext);
    let encrypted = crypto.publicEncrypt(privateKey, buffer);
    return encrypted.toString('base64');
  }

  decrypt(cypher: string, publicKey): string {
    const crypto = require('crypto-browserify');

    let buffer = Buffer.from(cypher, 'base64');
    let plaintext = crypto.privateDecrypt(publicKey, buffer);

    return plaintext.toString('utf8')
  }

}
