import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { SpinnerService } from "../spinner/spinner.service";

@Injectable() // Indica que esta clase puede ser inyectada como un servicio.
export class SpinnerInterceptor implements HttpInterceptor{
    /**
     * Constructor que inyecta el servicio `SpinnerService`.
     * Este servicio se encargará de mostrar y ocultar el spinner (indicador de carga).
     * @param spinnerSvc Servicio de spinner que se mostrará y ocultará durante la petición HTTP.
     */
    constructor(private spinnerSvc: SpinnerService ){
    }

        /**
     * Método `intercept` que se ejecuta cada vez que una solicitud HTTP se realiza.
     * Se utiliza para mostrar el spinner cuando una solicitud comienza y ocultarlo cuando termina.
     * @param req Objeto `HttpRequest` que representa la solicitud HTTP.
     * @param next Objeto `HttpHandler` que permite pasar la solicitud al siguiente interceptor o al backend.
     * @returns Un `Observable` de `HttpEvent` que se resuelve cuando la solicitud se completa.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerSvc.show();

        // Pasa la solicitud al siguiente interceptor y se asegura de ocultar el spinner al finalizar.
        return next.handle(req).pipe(
            finalize(() => this.spinnerSvc.hide())
        )
    }

}