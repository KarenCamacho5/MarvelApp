import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonajesApiService } from './personajes-api.service';
import { Comic } from '../../../comics/comics.component';

describe('PersonajesApiService', () => {
  let service: PersonajesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonajesApiService]
    });

    service = TestBed.inject(PersonajesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  // Prueba para obtener todos los personajes
  it('debería buscar todos los personajes', () => {
    const respuestaFalsa = {
      data: {
        results: [{ id: 1, name: 'Spider-Man' }, { id: 2, name: 'Iron Man' }]
      }
    };
  
    service.getAllPersonajes().subscribe(characters => {
      expect(characters.length).toBe(2);
      expect(characters[0].name).toBe('Spider-Man');
    });
  
    const req = httpMock.expectOne('https://gateway.marvel.com:443/v1/public/characters?apikey=1040ef6169933307019c60c375662c4f');
    expect(req.request.method).toBe('GET');
    req.flush(respuestaFalsa);
  });


  // Prueba para buscar personajes por nombre
  it('debería buscar personajes por nombre', () => {
    // Simulamos una respuesta con múltiples personajes
    const datosSimulados = {
      data: {
        results: [
          { id: 1, name: 'Spider-Man' },
          { id: 2, name: 'Iron Man' },
          { id: 3, name: 'Thor' }
        ]
      }
    };
  
    const searchName = 'Spider-Man';
    service.buscarPersonajesPorNombre(searchName).subscribe(characters => {
      expect(characters.length).toBe(1);
      expect(characters[0].name).toBe('Spider-Man');
    });
  
    // Simulamos la petición de obtener todos los personajes, que es lo que hace `getAllPersonajes()`
    const req = httpMock.expectOne('https://gateway.marvel.com:443/v1/public/characters?apikey=1040ef6169933307019c60c375662c4f');
    expect(req.request.method).toBe('GET');
    req.flush(datosSimulados); 
  });

  // Prueba para obtener los comics de un personaje
  it('debería buscar cómics para un personaje', () => {
    const mockResponse = {
      data: {
        results: [{ id: 1, title: 'Amazing Spider-Man' } as Comic]
      }
    };
  
    const personajeId = '1';
    service.getComics(personajeId).subscribe(comics => {
      expect(comics.length).toBe(1);
      expect(comics[0].title).toBe('Amazing Spider-Man');
    });

  });
  
  
});