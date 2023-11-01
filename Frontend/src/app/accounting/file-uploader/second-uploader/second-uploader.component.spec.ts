import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondUploaderComponent } from './second-uploader.component';

describe('SecondUploaderComponent', () => {
  let component: SecondUploaderComponent;
  let fixture: ComponentFixture<SecondUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondUploaderComponent]
    });
    fixture = TestBed.createComponent(SecondUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
