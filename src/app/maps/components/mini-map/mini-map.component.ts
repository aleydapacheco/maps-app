import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Marker, LngLat, Map  } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number,number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit() {
    if( !this.divMap?.nativeElement ) throw "Map div not found";
    if( !this.lngLat ) throw "LngLat can't be null";
    
    const map = new Map({
      container: this.divMap.nativeElement,
      //container: 'map', // container ID Para mapear por ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });

    new Marker ()
      .setLngLat( this.lngLat )
      .addTo( map )

  }



}
