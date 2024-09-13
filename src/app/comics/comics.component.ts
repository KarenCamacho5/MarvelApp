import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PersonajesApiService } from '../personajes/personaje/compartir/personajes-api.service';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit, AfterViewInit {
  // Fuente de datos para la tabla de cómics, utilizando MatTableDataSource.
  comics = new MatTableDataSource<Comic>();
  
  // Definición de las columnas que serán mostradas en la tabla de cómics.
  displayedColumns: string[] = [
    'thumbnail', 'title', 'dates', 'description', 'upc', 'modified', 'creators', 'characters', 'prices'
  ];

  // Para la vista de tarjetas
  paginatedComics: Comic[] = [];  // Arreglo para almacenar los cómics paginados en la vista de tarjetas
  isCardView: boolean = false;    // Alternar entre vista de tarjetas o tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Referencia al paginador

  constructor(private personajesService: PersonajesApiService, private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {}

  /**
   * En el hook `ngOnInit`, nos suscribimos a los parámetros de la ruta para obtener el ID del personaje
   * y detectar cambios en el tamaño de pantalla para alternar entre la vista de tabla y tarjetas.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const personajeId = params.get('id');
      if (personajeId) {
        this.verComics(personajeId);
      }
    });

    // Observa el tamaño de pantalla y cambia la vista a tarjetas si es un dispositivo móvil
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe(result => {
        this.isCardView = result.matches;
        console.log(this.isCardView ? 'Cambiando a vista de tarjetas' : 'Cambiando a vista de tabla');
        this.updatePaginatedComics();  // Actualiza la vista de tarjetas si es necesario
      });
  }

  /**
   * Después de que la vista ha sido completamente renderizada (`ngAfterViewInit`),
   * asignamos el paginador a `MatTableDataSource` para que la tabla pueda paginar correctamente.
   */
  ngAfterViewInit(): void {
    // Asigna siempre el paginador a MatTableDataSource
    this.comics.paginator = this.paginator;

    // Suscribirse al evento de cambio de página del paginador
    this.paginator.page.subscribe(() => {
      if (this.isCardView) {
        this.updatePaginatedComics();  // Actualiza las tarjetas si estamos en vista de tarjetas
      }
    });
  }

 /**
   * Método que interactúa con el servicio `PersonajesApiService` para obtener los cómics de un personaje específico.
   * @param personajeId El ID del personaje del cual se obtendrán los cómics.
   */
  verComics(personajeId: string): void {
    this.personajesService.getComics(personajeId).subscribe(comics => {
      this.comics.data = comics;  // Carga los datos en MatTableDataSource
      this.paginator.pageIndex = 0;  // Reinicia el paginador a la primera página
      this.updatePaginatedComics();  // Actualiza la paginación para las tarjetas
    });
  }

  /**
   * Método para actualizar la lista de cómics que se muestran en la vista de tarjetas.
   * Este método realiza la paginación manual para la vista de tarjetas.
   */
  updatePaginatedComics(): void {
    if (this.isCardView) {
      // Calcula el índice inicial y final de los cómics que se van a mostrar
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;

      // Verifica que el rango esté dentro de los datos disponibles
      if (startIndex < this.comics.data.length) {
        this.paginatedComics = this.comics.data.slice(startIndex, Math.min(endIndex, this.comics.data.length));
      } else {
        this.paginatedComics = [];  // Si no hay más datos para mostrar, el array se queda vacío
      }
    }
  }
}

/**
 * Interfaz `Comic` que define la estructura de un cómic.
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
