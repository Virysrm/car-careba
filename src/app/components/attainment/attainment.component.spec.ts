import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttainmentComponent } from './attainment.component';

describe('AttainmentComponent', () => {
  let component: AttainmentComponent;
  let fixture: ComponentFixture<AttainmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttainmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
