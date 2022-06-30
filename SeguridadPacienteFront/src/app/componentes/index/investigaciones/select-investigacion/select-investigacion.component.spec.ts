import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInvestigacionComponent } from './select-investigacion.component';

describe('SelectInvestigacionComponent', () => {
  let component: SelectInvestigacionComponent;
  let fixture: ComponentFixture<SelectInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
