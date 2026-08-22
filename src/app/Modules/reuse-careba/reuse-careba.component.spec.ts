import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseCarebaComponent } from './reuse-careba.component';

describe('ReuseCarebaComponent', () => {
  let component: ReuseCarebaComponent;
  let fixture: ComponentFixture<ReuseCarebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReuseCarebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuseCarebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
