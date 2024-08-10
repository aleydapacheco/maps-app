import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl'; 

//import * as mapboxgl from 'mapbox-gl'; 
//(mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWxleWRhcGFjaGVjbyIsImEiOiJjbHpsdWUwNGIwNmltMmtvbmtzbnZ6eW9zIn0.4EL8uf0Q-IT5lPVoGdD7lw';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {
    @ViewChild('map') divMap?: ElementRef;

    ngAfterViewInit(): void {
      if( !this.divMap ) throw 'El elemento HTMLno fue encontrado';
      console.log(this.divMap);
      const map = new Map({
        container: this.divMap?.nativeElement,
        //container: 'map', // container ID Para mapear por ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    }
}
