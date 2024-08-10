import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; 

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('map') divMap?: ElementRef;

    public zoom: number = 14;
    public map?: Map;
    public currentlngLat: LngLat = new LngLat(-65.25961810784293, -19.048121024137714)

    ngAfterViewInit(): void {

      if( !this.divMap ) throw 'El elemento HTMLno fue encontrado';
      //console.log(this.divMap);

      this.map = new Map({
        container: this.divMap?.nativeElement,
        //container: 'map', // container ID Para mapear por ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.currentlngLat, // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
      });

      this.mapListeners();

    }

    //Se esta llamando estos metodos para destruir los listeners y mapas creados
    ngOnDestroy(): void {
      this.map?.remove();
    }

    mapListeners() {
      if ( !this.map ) throw 'Mapa no inicializado';

      this.map.on('zoom', (evento) => {
        this.zoom = this.map!.getZoom();
      })

      this.map.on('zoomend', (evento) => {
        if ( this.map!.getZoom() < 18 ) return;
        this.map!.zoomTo(18);
      })

      this.map.on('move', () => {
        this.currentlngLat = this.map!.getCenter();
        console.log(this.currentlngLat);
      })
    }

    zoomIn() {
      this.map?.zoomIn();
    }

    zoomOut() {
      this.map?.zoomOut();
    }

    zoomChanged( value: string ){
      this.zoom = Number(value);
      this.map?.zoomTo( this.zoom );
    }


}

