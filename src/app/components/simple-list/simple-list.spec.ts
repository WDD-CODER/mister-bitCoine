import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleList } from './simple-list';

describe('SimpleList', () => {
  let component: SimpleList;
  let fixture: ComponentFixture<SimpleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
