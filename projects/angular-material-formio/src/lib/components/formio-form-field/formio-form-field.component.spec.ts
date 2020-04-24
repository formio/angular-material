import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormioFormFieldComponent } from './formio-form-field.component';

describe('FormioFormFieldComponent', () => {
  let component: FormioFormFieldComponent;
  let fixture: ComponentFixture<FormioFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormioFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormioFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
