import { Cryptography2Component } from './../common/cryptography2/cryptography2.component';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptographyComponent } from '../common/cryptography/cryptography.component';
import { UserDetails } from './RegisterBlockchain';
import { RegisterBlockchainService } from './register-blockchain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { LocalStorage } from '../services/local-storage.service';

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
    private cryptography2: Cryptography2Component,
    private registerBlockchainService: RegisterBlockchainService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private localStorage: LocalStorage
  ) { }

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
  async generateKeys() {
    const params = this.activatedRoute.queryParams.pipe(first()).toPromise();
    const keypair = require('keypair');
    const pair = await keypair();
    this.generatedPublicKey = pair.public;
    this.generatedPrivateKey = pair.private;
    if (params['__zone_symbol__value'].accType === 'consumer') {
      this.localStorage.setItem('consumerPublicKey', pair.public)
      this.localStorage.setItem('consumerPrivateKey', pair.private)
    }
    if (params['__zone_symbol__value'].accType === 'service') {
      // const s = this.cryptography2.encrypt("asad",pair.private);
      // const g = this.cryptography2.decrypt(s,pair.private);
      this.localStorage.setItem('servicePublicKey', pair.public)
      this.localStorage.setItem('servicePrivateKey', pair.private)
    }
    this.toastrService.success('Keys Generated');
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
    };
    debugger;
    const userDetailsJson = JSON.stringify(userDetails);
    const encryptedBody = this.cryptography2.encrypt(userDetailsJson, this.generatedPublicKey);
    const params = this.activatedRoute.queryParams.pipe(first()).toPromise();
    const userDetailsObject = {
      'transactionType': 'accountCreation',
      'accountType': params['__zone_symbol__value'].accType,
      'publicKey': this.generatedPublicKey,
      'encryptedData': encryptedBody.toString(),
      'broadcast': true
    };
    debugger;
    this.registerBlockchainService.registerUser(JSON.stringify(userDetailsObject)).then(result => {
      this.toastrService.success('Success');
    }).catch(err => {
      this.toastrService.error(err);
    });
  }
}
