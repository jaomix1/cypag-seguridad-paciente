import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAdversoComponent } from './evento-adverso.component';

describe('EventoAdversoComponent', () => {
  let component: EventoAdversoComponent;
  let fixture: ComponentFixture<EventoAdversoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoAdversoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoAdversoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
