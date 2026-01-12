import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBlockSize } from './market-block-size';

describe('MarketBlockSize', () => {
  let component: MarketBlockSize;
  let fixture: ComponentFixture<MarketBlockSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketBlockSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketBlockSize);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
