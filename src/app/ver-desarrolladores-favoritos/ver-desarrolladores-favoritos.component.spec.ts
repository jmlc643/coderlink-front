import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDesarrolladoresFavoritosComponent } from './ver-desarrolladores-favoritos.component';

describe('VerDesarrolladoresFavoritosComponent', () => {
  let component: VerDesarrolladoresFavoritosComponent;
  let fixture: ComponentFixture<VerDesarrolladoresFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDesarrolladoresFavoritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDesarrolladoresFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
