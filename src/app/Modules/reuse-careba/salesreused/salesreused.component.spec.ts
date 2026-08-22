import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreusedComponent } from './salesreused.component';

describe('SalesreusedComponent', () => {
  let component: SalesreusedComponent;
  let fixture: ComponentFixture<SalesreusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesreusedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesreusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
