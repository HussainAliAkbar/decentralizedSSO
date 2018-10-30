import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cryptography',
  templateUrl: './cryptography.component.html',
  styleUrls: ['./cryptography.component.scss']
})
export class CryptographyComponent implements OnInit {
  CryptoTS = require('crypto-ts');

  constructor() { }
  ngOnInit() {
  }

  encrypt(plainText: string, publicKey: string): string {
    // Encrypt
    const ciphertext = this.CryptoTS.AES.encrypt(plainText, publicKey);
    return ciphertext;
  }
  decrypt(ciphertext: string) {
    // Decrypt
    const bytes = this.CryptoTS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    const plaintext = bytes.toString(this.CryptoTS.enc.Utf8);
    return plaintext;
  }
}
