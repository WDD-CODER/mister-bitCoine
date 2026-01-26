import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMsg } from './user-msg';

describe('UserMsg', () => {
  let component: UserMsg;
  let fixture: ComponentFixture<UserMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMsg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
