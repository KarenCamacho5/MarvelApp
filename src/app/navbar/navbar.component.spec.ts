// Importaciones necesarias para las pruebas de componentes en Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas para crear pruebas y obtener fixtures.
import { NavbarComponent } from './navbar.component'; // El componente que se está probando.
import { Router } from '@angular/router'; // Servicio para la navegación entre rutas.
import { BreakpointObserver } from '@angular/cdk/layout'; // Servicio para observar cambios en el tamaño de la pantalla (breakpoints).
import { of } from 'rxjs'; // Función `of` para crear observables simulados.
import { RouterTestingModule } from '@angular/router/testing'; // Módulo para simular el enrutamiento en pruebas.
import { MatSidenavModule } from '@angular/material/sidenav'; // Módulo de Angular Material para sidenavs.
import { MatToolbarModule } from '@angular/material/toolbar'; // Módulo de Angular Material para toolbars.
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Módulo para desactivar animaciones durante pruebas.

describe('NavbarComponent', () => {
  let component: NavbarComponent; // Variable para la instancia del componente.
  let fixture: ComponentFixture<NavbarComponent>; // Fixture para interactuar con el componente.
  let router: Router; // Variable para el servicio de enrutamiento.
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>; // Espía para el servicio `BreakpointObserver`.

  beforeEach(async () => {
    // Creación de un espía para `BreakpointObserver`.
    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    // Definimos que `observe` retorne un observable que emita `{ matches: true }`.
    breakpointObserverSpy.observe.and.returnValue(of({ matches: true }));

    // Configuración del módulo de pruebas.
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent], // Declaración del componente que se va a probar.
      imports: [
        RouterTestingModule, // Módulo de pruebas para el enrutamiento.
        MatSidenavModule, // Módulo de Angular Material para los sidenavs.
        MatToolbarModule, // Módulo de Angular Material para las toolbars.
        NoopAnimationsModule // Desactiva las animaciones durante las pruebas.
      ],
      providers: [
        // Provisión del espía para `BreakpointObserver` en lugar del servicio real.
        {
          provide: BreakpointObserver,
          useValue: breakpointObserverSpy
        }
      ]
    }).compileComponents(); // Compila los componentes y los módulos.

    // Crea la instancia del componente y su fixture.
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // Obtiene el servicio de enrutamiento y el espía de `BreakpointObserver`.
    router = TestBed.inject(Router);
    breakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;

    // Ejecuta la detección de cambios en el componente (equivalente a `ngOnInit()`).
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se ha creado correctamente.
  it('debería crear el componente', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente no sea nula.
  });

  // Prueba para verificar la navegación a la ruta '/personajes'.
  it('debería navegar a "/personajes" cuando se haga click en el título', () => {
    // Espía que observa el método `navigate` del servicio `Router`.
    const navigateSpy = spyOn(router, 'navigate');

    // Llama al método que navega a la ruta de personajes.
    component.irAPersonajes();

    // Verifica que `router.navigate` fue llamado con la ruta correcta.
    expect(navigateSpy).toHaveBeenCalledWith(['/personajes']);
  });
});
