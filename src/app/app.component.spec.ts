// Importaciones necesarias para las pruebas de componentes en Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas para crear pruebas y obtener fixtures.
import { AppComponent } from './app.component'; // Componente principal de la aplicación.
import { RouterTestingModule } from '@angular/router/testing'; // Módulo para simular el enrutamiento en pruebas.
import { MatToolbarModule } from '@angular/material/toolbar'; // Módulo de Angular Material para toolbars.
import { MatSidenavModule } from '@angular/material/sidenav'; // Módulo de Angular Material para sidenavs.
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Módulo para desactivar animaciones durante pruebas.
import { SpinnerComponent } from './spinner/spinner.component'; // Componente para el spinner de carga.
import { NavbarComponent } from './navbar/navbar.component'; // Componente para la barra de navegación.

describe('AppComponent', () => {
  let component: AppComponent; // Variable para la instancia del componente `AppComponent`.
  let fixture: ComponentFixture<AppComponent>; // Fixture para interactuar con el componente `AppComponent`.

  beforeEach(async () => {
    // Configuración del módulo de pruebas.
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, // Declaración del componente principal.
        SpinnerComponent, // Declaración del componente del spinner.
        NavbarComponent // Declaración del componente de la barra de navegación.
      ],
      imports: [
        RouterTestingModule, // Módulo para simular el enrutamiento.
        MatToolbarModule, // Módulo de Angular Material para toolbars.
        MatSidenavModule, // Módulo de Angular Material para sidenavs.
        NoopAnimationsModule // Desactiva animaciones durante las pruebas.
      ]
    }).compileComponents(); // Compila los componentes y los módulos.

    // Crea la instancia del componente y su fixture.
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // Ejecuta la detección de cambios en el componente.
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se ha creado correctamente.
  it('debería crear la aplicación', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente no sea nula.
  });

  // Prueba para verificar que el título del componente sea 'marvelApp'.
  it('debería tener como título \'marvelApp\'', () => {
    expect(component.title).toEqual('marvelApp'); // Verifica que la propiedad `title` del componente sea igual a 'marvelApp'.
  });
});
