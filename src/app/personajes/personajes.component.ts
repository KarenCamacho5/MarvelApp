import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonajesApiService } from './personaje/compartir/personajes-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent implements OnInit {
  allPersonajes = new MatTableDataSource<any>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private personajes: PersonajesApiService) {}

  ngOnInit(): void {
    this.getPersonajes();
  }


  // Asociar el paginador 
  ngAfterViewInit() {
    this.allPersonajes.paginator = this.paginator; 
  }

  getPersonajes(): void {
    this.personajes.getAllPersonajes().subscribe((data: any) => {
      this.allPersonajes.data = data;  
    });
  }

  // Método para realizar la búsqueda
  buscar(nombre: string): void {
    if (nombre.length === 0) {
      return this.getPersonajes();
    }
  
    this.personajes.buscarPersonajesPorNombre(nombre)
      .subscribe((resp: any) => {
        this.allPersonajes.data = resp;  
      });
  }
}
