import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectPageComponent } from './incorrect-page.component';

describe('IncorrectPageComponent', () => {
  let component: IncorrectPageComponent;
  let fixture: ComponentFixture<IncorrectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncorrectPageComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
