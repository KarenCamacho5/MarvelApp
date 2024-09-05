import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonajesComponent } from './personajes/personajes.component';
import { ComicsComponent } from './comics/comics.component';


const routes: Routes = [

  // Definimos las rutas

  {path:'', redirectTo:'/personajes', pathMatch: 'full'},
  {path:'personajes', component: PersonajesComponent},
  { path: 'comics/:id', component: ComicsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
