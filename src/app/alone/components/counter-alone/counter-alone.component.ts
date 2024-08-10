import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'counter-alone',
  imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.css'],
  standalone: true,
})
export class CounterAloneComponent {
  
  //Se implementa Input para que el componente del Padre pueda emitir
  //valores  hacia este componente hijo
  @Input()
  public counter: number = 17;


}
