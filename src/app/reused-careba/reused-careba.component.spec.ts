import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusedCarebaComponent } from './reused-careba.component';

describe('ReusedCarebaComponent', () => {
  let component: ReusedCarebaComponent;
  let fixture: ComponentFixture<ReusedCarebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusedCarebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusedCarebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
