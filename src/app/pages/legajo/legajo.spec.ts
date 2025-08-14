import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Legajo } from './legajo';

describe('Legajo', () => {
  let component: Legajo;
  let fixture: ComponentFixture<Legajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Legajo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Legajo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
