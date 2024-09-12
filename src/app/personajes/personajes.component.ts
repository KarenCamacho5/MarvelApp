import { Component, inject,OnInit, ViewChild } from '@angular/core';
import { PersonajesApiService } from './personaje/compartir/personajes-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {
  // Fuente de datos para la tabla, inicializada con un array vacío.
  allPersonajes = new MatTableDataSource<any>([]); 
  
  paginatedPersonajes: any[] = [];
  // Referencia al paginador para la tabla
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


   // Constructor para inyectar el servicio de API de personajes.
  constructor(private personajes: PersonajesApiService) {}
  private snackBar = inject(MatSnackBar);

  // Estamos llamando al metodo getPersonajes() cuando se inicia el componente
  ngOnInit(): void {
    this.getPersonajes();
  }
   // Establece el paginador y escucha los cambios de paginación
   ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.updatePaginatedPersonajes());
  }
  // llama al servicio getAllPersonajes() para obtener todos los personajes
  getPersonajes(): void {
    this.personajes.getAllPersonajes().subscribe((data: any) => {
      this.allPersonajes.data = data;  
      // // Inicializa el paginador después de cargar los personajes
      this.allPersonajes.paginator = this.paginator;
      this.paginator.pageIndex = 0; // Reinicia el índice de página a 0
      this.updatePaginatedPersonajes();
    });
  }

  updatePaginatedPersonajes(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedPersonajes = this.allPersonajes.data.slice(startIndex, endIndex);
  }

  /**
   * Maneja el evento de búsqueda de personajes.
   * Llama a buscarPersonaje() si hay un término de búsqueda, o a getPersonajes() si el campo está vacío.
   * @param event El evento del input de búsqueda.
   */
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.trim();

    if (searchTerm.length >= 1) {
      // Llama a buscarPersonaje() si hay un término de búsqueda.
      this.buscarPersonaje(searchTerm);
    } else if (searchTerm === '') {
      // Cargar todos los personajes si el campo de búsqueda está vacío
      this.getPersonajes(); 
    }
  }

  /**
   * Busca personajes por nombre utilizando el servicio de API.
   * Actualiza la fuente de datos de la tabla con los resultados de la búsqueda.
   * Muestra un mensaje de error si la búsqueda falla.
   * @param nombre El nombre del personaje a buscar.
   */
  buscarPersonaje(nombre: string): void {
    this.personajes.buscarPersonajesPorNombre(nombre).subscribe(
      (resultados) => {
        this.allPersonajes.data = resultados;
        this.paginator.pageIndex = 0;
        this.updatePaginatedPersonajes();
      },
      (error) => {
        console.error('Error al buscar personajes', error);
        this.snackBar.open('Error al buscar personajes', 'Cerrar', { duration: 3000 });
      }
    );
  }


}
