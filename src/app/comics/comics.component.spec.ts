import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComicsComponent } from './comics.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';  
import { PersonajesApiService } from '../personajes/personaje/compartir/personajes-api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComicsComponent', () => {
  let component: ComicsComponent;
  let fixture: ComponentFixture<ComicsComponent>;
  let personajesApiService: jasmine.SpyObj<PersonajesApiService>;

  /**
   * Antes de cada prueba, se configura el entorno de pruebas.
   * Se inicializa un espía de `PersonajesApiService` y se proporciona al módulo de prueba.
   */
  
  beforeEach(async () => {
    // Se crea un espía que reemplazará a `PersonajesApiService` en las pruebas.
    const personajesApiServiceSpy = jasmine.createSpyObj('PersonajesApiService', ['getComics']);

    // Configuración del entorno de pruebas, declarando el componente y sus dependencias.
    await TestBed.configureTestingModule({
      declarations: [ComicsComponent],
      imports: [
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,  
        BrowserAnimationsModule,  
        HttpClientTestingModule   
      ],
      providers: [
        { provide: PersonajesApiService, useValue: personajesApiServiceSpy },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '123' }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComicsComponent);
    component = fixture.componentInstance;
    personajesApiService = TestBed.inject(PersonajesApiService) as jasmine.SpyObj<PersonajesApiService>;
  });

  /**
   * Prueba básica que verifica que el componente `ComicsComponent` se crea correctamente.
   */
  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba que verifica si el componente llama al servicio `getComics` durante su inicialización
   * y si actualiza correctamente la tabla con los datos de cómics.
   */
  it('debería buscar cómics en init', () => {
    const respuestaSimulada = [
      {
        id: 1,
        title: 'Comic 1',
        description: 'Description 1',
        modified: '2023-08-08T00:00:00Z',
        upc: '123456789',
        prices: [{ type: 'printPrice', price: 4.99 }],
        thumbnail: { path: 'path/to/thumbnail', extension: 'jpg' },
        creators: { items: [{ name: 'Creator 1', role: 'writer' }] },
        characters: { items: [{ name: 'Character 1' }] },
        dates: [{ date: '2023-08-08T00:00:00Z' }]
      }
    ];

    personajesApiService.getComics.and.returnValue(of(respuestaSimulada));

    fixture.detectChanges();

    expect(personajesApiService.getComics).toHaveBeenCalledWith('123');
    expect(component.comics.data).toEqual(respuestaSimulada);
  });

  /**
   * Prueba que verifica si el paginador de la tabla se inicializa correctamente
   * después de que la vista del componente ha sido renderizada.
   */
  it('debería inicializar el paginador después de ver el inicios', () => {
    fixture.detectChanges();
    component.ngAfterViewInit();

    expect(component.comics.paginator).toBeTruthy();
  });
});