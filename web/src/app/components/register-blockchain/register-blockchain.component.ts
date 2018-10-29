import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptographyComponent } from '../common/cryptography/cryptography.component';
import { UserDetails } from './RegisterBlockchain';
import { RegisterBlockchainService } from './register-blockchain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register-blockchain',
  templateUrl: './register-blockchain.component.html',
  styleUrls: ['./register-blockchain.component.scss']
})
export class RegisterBlockchainComponent implements OnInit {
  registerationForm: FormGroup;
  sercureToken;
  tpsPublicKey;
  generatedPublicKey: string;
  generatedPrivateKey: string;
  constructor(private formBuilder: FormBuilder,
    private cryptography: CryptographyComponent,
    private registerBlockchainService: RegisterBlockchainService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

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
  goBack() {
    this.router.navigateByUrl('/');
  }
  generateKeys() {
    const keypair = require('keypair');
    const pair = keypair();
    this.generatedPublicKey = pair.public;
    this.generatedPrivateKey = pair.private;
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
    const encryptedBody = this.cryptography.encrypt(userDetailsJson, this.generatedPublicKey);
    const params = this.activatedRoute.queryParams.pipe(first()).toPromise();
    debugger;
    const userDetailsObject =
    {
      "transactionType": "accountCreation",
      "accountType": params['accType'],
      "publicKey": this.generatedPublicKey,
      "encryptedData": encryptedBody.toString(),
      "broadcast": true
    }

    this.registerBlockchainService.registerUser(JSON.stringify(userDetailsObject));
  }
}
