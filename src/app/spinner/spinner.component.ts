// Importaciones necesarias de Angular y RxJS.
import { Component, OnInit } from '@angular/core'; // Decorador de componente e interfaz para inicialización.
import { SpinnerService } from './spinner.service'; // Servicio que maneja el estado del spinner.
import { Observable } from 'rxjs'; // Tipo `Observable` de RxJS para manejo de flujos de datos.

@Component({
  selector: 'app-spinner', // Selector del componente utilizado en la plantilla HTML.
  template: `
    <!-- Contenedor para el spinner que aparece como una superposición (overlay) -->
    <div class="overlay" *ngIf="isloading$ | async">
      <!-- Spinner (cargador) representado por una animación -->
      <img class="fondo" src="/img/Marvel-logo.jpg" alt="Logo">
    </div>`,
  styleUrls: ['./spinner.component.css'] // Ruta al archivo CSS que contiene los estilos del componente.
})
export class SpinnerComponent implements OnInit {
  // Observable que representa el estado de carga (si el spinner debe mostrarse o no).
  isloading$!: Observable<boolean>;

  /**
   * Constructor que inyecta el servicio `SpinnerService`.
   * @param spinnerSvc Servicio para manejar el estado del spinner.
   */
  constructor(private spinnerSvc: SpinnerService) { }

  /**
   * Método de inicialización del componente. 
   * Se llama después de que Angular ha inicializado las propiedades vinculadas a datos del componente.
   */
  ngOnInit(): void {
    // Se asigna el observable `isloading$` del servicio `SpinnerService` a la propiedad del componente.
    this.isloading$ = this.spinnerSvc.isloading$;
  }
}

