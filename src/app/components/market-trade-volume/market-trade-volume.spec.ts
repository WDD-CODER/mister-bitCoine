import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTradeVolume } from './market-trade-volume';

describe('MarketTradeVolume', () => {
  let component: MarketTradeVolume;
  let fixture: ComponentFixture<MarketTradeVolume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketTradeVolume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketTradeVolume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
