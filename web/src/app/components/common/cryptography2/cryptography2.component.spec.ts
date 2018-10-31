import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cryptography2Component } from './cryptography2.component';

describe('Cryptography2Component', () => {
  let component: Cryptography2Component;
  let fixture: ComponentFixture<Cryptography2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cryptography2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cryptography2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
