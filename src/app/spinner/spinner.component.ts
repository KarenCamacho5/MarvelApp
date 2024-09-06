import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isloading$ | async">
    <div class="lds-hourglass"></div>
  </div>`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isloading$!: Observable<boolean>;

  constructor(private spinnerSvc: SpinnerService) { }

  ngOnInit(): void {
    this.isloading$ = this.spinnerSvc.isloading$;
  }
}

