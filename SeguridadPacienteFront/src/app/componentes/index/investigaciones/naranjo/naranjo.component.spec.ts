import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaranjoComponent } from './naranjo.component';

describe('NaranjoComponent', () => {
  let component: NaranjoComponent;
  let fixture: ComponentFixture<NaranjoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaranjoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaranjoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
