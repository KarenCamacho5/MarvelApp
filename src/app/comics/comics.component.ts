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
  comics = new MatTableDataSource<Comic>();
  displayedColumns: string[] = [
    'thumbnail', 'title', 'dates', 'description', 'upc', 'modified', 'creators', 'characters', 'prices'
  ];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private personajesService: PersonajesApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const personajeId = params.get('id');
      if (personajeId) {
        this.verComics(personajeId);
      }
    });
  }

  ngAfterViewInit(): void {
    this.comics.paginator = this.paginator;
  }

  verComics(personajeId: string): void {
    this.personajesService.getComics(personajeId).subscribe(
      comics => {
        this.comics.data = comics;
      }
    );
  }
}

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

