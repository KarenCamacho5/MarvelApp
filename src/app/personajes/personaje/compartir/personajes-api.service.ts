import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comic } from '../../../comics/comics.component';

@Injectable({
  providedIn: 'root'
})
export class PersonajesApiService {
  private readonly PUBLIC_KEY = '1040ef6169933307019c60c375662c4f';
  private readonly URL_API = `https://gateway.marvel.com:443/v1/public/characters?apikey=${this.PUBLIC_KEY}`;
  
  constructor(private http: HttpClient) {}


  // Traer los personajes
  getAllPersonajes(): Observable<any> {
    return this.http.get<any>(this.URL_API)
      .pipe(map(data => data.data.results));
  }

  // Buscar a los porseonajes por nombre
  buscarPersonajesPorNombre(nombre: string): Observable<any> {
    const url = `${this.URL_API}&name=${nombre}`;
    return this.http.get<any>(url)
      .pipe(map(data => data.data.results));
  }


  //Traer los comicss 
  getComics(personajeId: string): Observable<Comic[]> {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${personajeId}/comics?apikey=${this.PUBLIC_KEY}`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response.data.results)
    );
  }
}

interface ApiResponse {
  data: {
    results: Comic[];
  };
}
