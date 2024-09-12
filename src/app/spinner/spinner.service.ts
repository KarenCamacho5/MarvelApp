// Importaciones necesarias de Angular y RxJS.
import { Injectable } from "@angular/core"; // Decorador para marcar la clase como inyectable.
import { Subject } from "rxjs"; // `Subject` es un tipo de observable que permite emitir y escuchar eventos.

@Injectable({
  providedIn: 'root' // Indica que este servicio se proporciona a nivel global de la aplicación (singleton).
})
export class SpinnerService {
  
  // `isloading$` es un observable de tipo `Subject` que emite valores booleanos para indicar si el spinner debe mostrarse o no.
  isloading$ = new Subject<boolean>();

  /**
   * Método para mostrar el spinner.
   * Emite `true` a través del `Subject`, lo que indica que el spinner debe mostrarse.
   */
  show(): void {
    this.isloading$.next(true); // Envía `true` para notificar que el spinner debe estar visible.
  }

  /**
   * Método para ocultar el spinner.
   * Emite `false` a través del `Subject`, lo que indica que el spinner debe ocultarse.
   */
  hide(): void {
    this.isloading$.next(false); // Envía `false` para notificar que el spinner debe ocultarse.
  }
}
