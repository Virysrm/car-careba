import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusedComponent } from './reused.component';

describe('ReusedComponent', () => {
  let component: ReusedComponent;
  let fixture: ComponentFixture<ReusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
