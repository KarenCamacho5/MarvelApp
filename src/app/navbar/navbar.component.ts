import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Se inyecta el `BreakpointObserver` usando el método `inject` para detectar cambios en el tamaño de la pantalla.
  private breakpointObserver = inject(BreakpointObserver);

  /**
   * El constructor inyecta el servicio `Router` para permitir la navegación dentro de la aplicación.
   * @param router Servicio de enrutamiento que permite cambiar entre rutas.
   */
  constructor(private router: Router) {}

    /**
   * `isHandset$`: Un observable que emite `true` si el tamaño de la pantalla corresponde a un dispositivo móvil
   * (según el breakpoint definido en `Breakpoints.Handset`), y `false` de lo contrario.
   * 
   * - `observe(Breakpoints.Handset)`: Detecta si el tamaño de la pantalla coincide con el breakpoint para dispositivos móviles.
   * - `map(result => result.matches)`: Mapea el resultado para obtener un valor booleano (`true` si coincide, `false` si no).
   * - `shareReplay()`: Comparte la misma emisión de datos para suscriptores posteriores, evitando volver a ejecutar la lógica cada vez.
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    /**
   * Método `irAPersonajes` que navega a la ruta de la vista de personajes (`/personajes`) cuando es llamado.
   * Utiliza el servicio `Router` para realizar la navegación.
   */
    irAPersonajes(): void {
      this.router.navigate(['/personajes']); 
    }
}
