import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptographyComponent } from '../common/cryptography/cryptography.component';
import { UserDetails } from './RegisterBlockchain';
import { RegisterBlockchainService } from './register-blockchain.service';

@Component({
  selector: 'app-register-blockchain',
  templateUrl: './register-blockchain.component.html',
  styleUrls: ['./register-blockchain.component.scss']
})
export class RegisterBlockchainComponent implements OnInit {
  registerationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private cryptography: CryptographyComponent,
    private registerBlockchainService: RegisterBlockchainService) { }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.registerationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  saveForm() {
    const userDetails: UserDetails = {
      firstName: this.registerationForm.get('firstName').value,
      lastName: this.registerationForm.get('lastName').value,
      email: this.registerationForm.get('email').value,
      phone: this.registerationForm.get('phone').value,
      gender: this.registerationForm.get('gender').value,
      city: this.registerationForm.get('city').value,
      state: this.registerationForm.get('state').value,
      country: this.registerationForm.get('country').value
    }
    const userDetailsJson = JSON.stringify(userDetails);
    const encryptedBody = this.cryptography.encrypt(userDetailsJson);
    console.log(encryptedBody.toString());
    // const body = {
    //   "transactionType": "accountCreation",
    //   "accountType": "service",
    //   "publicKey": "service",
    //   "encryptedData": encryptedBody.toString(),
    //   "broadcast": true
    // }
    const body =
    {
      "transactionType": "accountCreation",
      "accountType": "consumer",
      "publicKey": "consumer",
      "encryptedData": "someEncryptedData",
      "broadcast": true
    }

    this.registerBlockchainService.registerUser(JSON.stringify(body));
  }
}
