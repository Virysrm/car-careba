import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltasInventarioComponent } from './altas-inventario.component';

describe('AltasInventarioComponent', () => {
  let component: AltasInventarioComponent;
  let fixture: ComponentFixture<AltasInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltasInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltasInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
