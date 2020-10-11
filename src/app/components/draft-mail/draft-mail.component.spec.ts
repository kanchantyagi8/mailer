import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMailComponent } from './draft-mail.component';

describe('DraftMailComponent', () => {
  let component: DraftMailComponent;
  let fixture: ComponentFixture<DraftMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
