import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOportunidadComponent } from './edit-oportunidad.component';

describe('EditOportunidadComponent', () => {
  let component: EditOportunidadComponent;
  let fixture: ComponentFixture<EditOportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOportunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
