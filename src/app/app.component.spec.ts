import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';  
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component'; 

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SpinnerComponent,  
        NavbarComponent    
      ],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatSidenavModule,  
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // 
  it('debería crear la aplicación', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener como título \'marvelApp\'', () => {
    expect(component.title).toEqual('marvelApp');
  });
});
