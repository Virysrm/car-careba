import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarebaComponent } from './careba.component';

describe('CarebaComponent', () => {
  let component: CarebaComponent;
  let fixture: ComponentFixture<CarebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
