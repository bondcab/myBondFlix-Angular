import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorComponentComponent } from './director-component.component';

describe('DirectorComponentComponent', () => {
  let component: DirectorComponentComponent;
  let fixture: ComponentFixture<DirectorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorComponentComponent]
    });
    fixture = TestBed.createComponent(DirectorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
