import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PersonajesApiService } from '../personajes/personaje/compartir/personajes-api.service';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit, AfterViewInit {
  // Fuente de datos para la tabla de cómics, utilizando MatTableDataSource para gestionar el manejo de datos en tablas.
  comics = new MatTableDataSource<Comic>();
  // Definición de las columnas que serán mostradas en la tabla de cómics.
  displayedColumns: string[] = [
    'thumbnail', 'title', 'dates', 'description', 'upc', 'modified', 'creators', 'characters', 'prices'
  ];
  // ViewChild permite obtener una referencia al paginador después de que la vista se haya renderizado.
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  /**
   * Constructor de la clase.
   * Inyecta el servicio `PersonajesApiService` para acceder a la API de personajes.
   * Inyecta `ActivatedRoute` para obtener el parámetro de la ruta activa.
   */
  constructor(private personajesService: PersonajesApiService, private route: ActivatedRoute) {}

  /**
   * Se subscribe al parámetro de la ruta (`id`) y, si está presente, llama al método `verComics()`.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const personajeId = params.get('id');
      if (personajeId) {
        this.verComics(personajeId);
      }
    });
  }
  /**
   * Establece el paginador de la tabla para que funcione correctamente.
   */
  ngAfterViewInit(): void {
    this.comics.paginator = this.paginator;
  }

  /**
   * Método que interactúa con el servicio `PersonajesApiService` para obtener los cómics de un personaje específico.
   * @param personajeId El ID del personaje del cual se obtendrán los cómics.
   */
  verComics(personajeId: string): void {
    this.personajesService.getComics(personajeId).subscribe(
      comics => {
        this.comics.data = comics;
      }
    );
  }
}

/**
 * Interfaz `Comic` que define la estructura de un cómic.
 * Esto asegura que los datos recibidos de la API tengan la forma esperada.
 */

export interface Comic {
  id: number;
  title: string;
  description: string;
  modified: string; 
  upc: string;
  prices: { type: string, price: number }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    items: {
      name: string;
      role: string;
    }[];
  };
  characters: {
    items: {
      name: string;
    }[];
  };
  dates: {
    date: string;
  }[];
}

