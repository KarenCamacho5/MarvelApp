import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PersonajesComponent } from './personajes.component';
import { PersonajesApiService } from '././personaje/compartir/personajes-api.service'; 
describe('PersonajesComponent', () => {
  let component: PersonajesComponent;
  let fixture: ComponentFixture<PersonajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonajesComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatPaginatorModule,
        NoopAnimationsModule
      ], 
      providers: [PersonajesApiService] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});