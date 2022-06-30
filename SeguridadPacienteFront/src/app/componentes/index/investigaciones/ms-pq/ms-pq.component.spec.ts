import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPqComponent } from './ms-pq.component';

describe('MsPqComponent', () => {
  let component: MsPqComponent;
  let fixture: ComponentFixture<MsPqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsPqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
