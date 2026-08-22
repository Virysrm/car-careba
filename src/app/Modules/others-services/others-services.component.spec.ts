import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersServicesComponent } from './others-services.component';

describe('OthersServicesComponent', () => {
  let component: OthersServicesComponent;
  let fixture: ComponentFixture<OthersServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OthersServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
