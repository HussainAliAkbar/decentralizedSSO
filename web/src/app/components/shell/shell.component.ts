import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateRegister(param: string) {
    debugger;
    this.router.navigateByUrl(`register?accType=${param}`);
  }
}
