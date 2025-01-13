import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LondresComponent } from './londres.component';

describe('LondresComponent', () => {
  let component: LondresComponent;
  let fixture: ComponentFixture<LondresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LondresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LondresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
