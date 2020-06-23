import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordgamesComponent } from './wordgames.component';

describe('WordgamesComponent', () => {
  let component: WordgamesComponent;
  let fixture: ComponentFixture<WordgamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordgamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
