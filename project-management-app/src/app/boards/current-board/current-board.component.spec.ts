import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBoardComponent } from './current-board.component';

describe('CurrentBoardComponent', () => {
  let component: CurrentBoardComponent;
  let fixture: ComponentFixture<CurrentBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
