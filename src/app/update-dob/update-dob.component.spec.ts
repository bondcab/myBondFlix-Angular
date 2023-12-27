import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDobComponent } from './update-dob.component';

describe('UpdateDobComponent', () => {
  let component: UpdateDobComponent;
  let fixture: ComponentFixture<UpdateDobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDobComponent]
    });
    fixture = TestBed.createComponent(UpdateDobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
