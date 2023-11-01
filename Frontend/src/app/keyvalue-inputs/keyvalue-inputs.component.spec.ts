import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyvalueInputsComponent } from './keyvalue-inputs.component';

describe('KeyvalueInputsComponent', () => {
  let component: KeyvalueInputsComponent;
  let fixture: ComponentFixture<KeyvalueInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyvalueInputsComponent]
    });
    fixture = TestBed.createComponent(KeyvalueInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
