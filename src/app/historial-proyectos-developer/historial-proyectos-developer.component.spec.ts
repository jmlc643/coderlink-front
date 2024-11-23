import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialProyectosDeveloperComponent } from './historial-proyectos-developer.component';

describe('HistorialProyectosDeveloperComponent', () => {
  let component: HistorialProyectosDeveloperComponent;
  let fixture: ComponentFixture<HistorialProyectosDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialProyectosDeveloperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialProyectosDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
