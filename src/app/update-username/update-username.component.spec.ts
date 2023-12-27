import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsernameComponent } from './update-username.component';

describe('UpdateUsernameComponent', () => {
  let component: UpdateUsernameComponent;
  let fixture: ComponentFixture<UpdateUsernameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUsernameComponent]
    });
    fixture = TestBed.createComponent(UpdateUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
