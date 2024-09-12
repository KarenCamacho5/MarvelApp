import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comic } from '../../../comics/comics.component';

/**
 *  @author Karen Camacho
  * @createdate 2024-09-12
 * Servicio para interactuar con la API de Marvel.
 * Proporciona métodos para obtener personajes y cómics.
 */

// El servicio esta disponible para ser consumido por otros componentes
@Injectable({
  providedIn: 'root'
})
export class PersonajesApiService {
  // Clave pública de la API de Marvel
  private readonly PUBLIC_KEY = '1040ef6169933307019c60c375662c4f';
  // URL base para la API de personajes
  private readonly URL_API = `https://gateway.marvel.com:443/v1/public/characters?apikey=${this.PUBLIC_KEY}`;
  
  constructor(private http: HttpClient) {}


    /**
   * Obtiene todos los personajes desde la API de Marvel.
   * @returns Un Observable que emite los resultados de los personajes.
   */
  getAllPersonajes(): Observable<any> {
    return this.http.get<any>(this.URL_API)
      .pipe(map(data => data.data.results));
  }

   /**
   * Busca personajes por nombre en la API de Marvel.
   * @param nombre El nombre del personaje a buscar.
   * @returns Un Observable que emite los resultados de la búsqueda.
   */
   buscarPersonajesPorNombre(nombre: string): Observable<any> {
    return this.getAllPersonajes().pipe(
      map(personajes => personajes.filter(
        (personaje: any) => personaje.name.toLowerCase().includes(nombre.toLowerCase())
      ))
    );
  }

  /**
   * Obtiene los cómics de un personaje específico desde la API de Marvel.
   * @param personajeId El ID del personaje para obtener sus cómics.
   * @returns Un Observable que emite una lista de cómics.
   */
  getComics(personajeId: string): Observable<Comic[]> {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${personajeId}/comics?apikey=${this.PUBLIC_KEY}`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response.data.results)
    );
  }
}

// Define la estructura de la respuesta de la API para los cómics.
interface ApiResponse {
  data: {
    results: Comic[];
  };
}
