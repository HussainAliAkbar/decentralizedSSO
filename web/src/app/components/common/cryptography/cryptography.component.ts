import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cryptography',
  templateUrl: './cryptography.component.html',
  styleUrls: ['./cryptography.component.scss']
})
export class CryptographyComponent implements OnInit {
  CryptoTS = require("crypto-ts");

  constructor() { }
  ngOnInit() {
  }

  encrypt(plainText: string): any {
    // Encrypt
    var ciphertext = this.CryptoTS.AES.encrypt(plainText, 'secret key 123');
    return ciphertext;
  }
  decrypt(ciphertext: string) {
    // Decrypt
    var bytes = this.CryptoTS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    var plaintext = bytes.toString(this.CryptoTS.enc.Utf8);
    return plaintext;
  }
}
