import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesFormComponent } from './oportunidades-form.component';

describe('OportunidadesFormComponent', () => {
  let component: OportunidadesFormComponent;
  let fixture: ComponentFixture<OportunidadesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OportunidadesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OportunidadesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
