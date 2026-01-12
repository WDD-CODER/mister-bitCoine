import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPriceChart } from './market-price-chart';

describe('MarketPriceChart', () => {
  let component: MarketPriceChart;
  let fixture: ComponentFixture<MarketPriceChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketPriceChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPriceChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
