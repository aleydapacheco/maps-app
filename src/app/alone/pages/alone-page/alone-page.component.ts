import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';


@Component({
  standalone: true,
  imports: [
    //Si queremos routear un componente de tipo StandAlone
    //Se debe importar como si fuera un modulo 
    CounterAloneComponent,
    SideMenuComponent
  ],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {
  constructor (){}
}
