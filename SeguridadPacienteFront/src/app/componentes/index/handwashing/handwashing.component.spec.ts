import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandwashingComponent } from './handwashing.component';

describe('HandwashingComponent', () => {
  let component: HandwashingComponent;
  let fixture: ComponentFixture<HandwashingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandwashingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandwashingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
