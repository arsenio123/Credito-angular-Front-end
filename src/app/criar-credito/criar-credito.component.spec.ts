import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCreditoComponent } from './criar-credito.component';

describe('CriarCreditoComponent', () => {
  let component: CriarCreditoComponent;
  let fixture: ComponentFixture<CriarCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
