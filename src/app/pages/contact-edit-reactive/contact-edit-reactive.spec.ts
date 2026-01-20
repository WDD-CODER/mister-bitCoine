import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditReactive } from './contact-edit-reactive';

describe('ContactEditReactive', () => {
  let component: ContactEditReactive;
  let fixture: ComponentFixture<ContactEditReactive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactEditReactive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEditReactive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
