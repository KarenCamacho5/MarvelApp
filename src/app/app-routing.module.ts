// Importaciones necesarias para la configuración del enrutamiento en Angular.
import { NgModule } from '@angular/core'; // Decorador para definir un módulo de Angular.
import { RouterModule, Routes } from '@angular/router'; // Módulos para manejar el enrutamiento en Angular.
import { PersonajesComponent } from './personajes/personajes.component'; // Componente que maneja la vista de personajes.
import { ComicsComponent } from './comics/comics.component'; // Componente que maneja la vista de cómics.

const routes: Routes = [
  // Definición de las rutas de la aplicación.
  // Ruta por defecto que redirige a '/personajes' cuando la URL es vacía.
  { path: '', redirectTo: '/personajes', pathMatch: 'full' },

  // Ruta para el componente de personajes. 
  // Accesible en la URL '/personajes'.
  { path: 'personajes', component: PersonajesComponent },

  // Ruta para el componente de cómics.
  // La URL debe contener un parámetro 'id' para que se pueda acceder a este componente.
  // Ejemplo: '/comics/123'.
  { path: 'comics/:id', component: ComicsComponent },
];

@NgModule({
  // Importa el módulo de enrutamiento con la configuración de rutas.
  imports: [RouterModule.forRoot(routes)],
  // Exporta el módulo de enrutamiento para que esté disponible en otros módulos.
  exports: [RouterModule]
})
export class AppRoutingModule { }
