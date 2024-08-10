import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Marker, LngLat, Map  } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

    public markers: MarkerAndColor[] = [];
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

      this.readFromLocalStorage();

      //Llamando a Localstorage de los marcadores guardados


      //const markerHtml = document.createElement('div');
      //markerHtml.innerHTML = 'Fernando Herrera'

      //const marker = new Marker({
        //element: markerHtml,
      //})
        //.setLngLat( this.currentlngLat )
        //.addTo( this.map );

    }

    createMarker(){
      if ( !this.map ) return;

      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const lngLat = this.map.getCenter();

      this.addMarker( lngLat, color);
    }

    addMarker( lngLat: LngLat, color: string ) {
      if ( !this.map ) return;

      const marker = new Marker({
        color: color,
        draggable: true,
      })
      .setLngLat( lngLat )
      .addTo( this.map );

      this.markers.push({ color, marker });
      this.saveToLocalStorage();

      marker.on('dragend', () => {
        this.saveToLocalStorage();
        console.log( marker.getLngLat() )
      })

    }

    deleteMarker( index: number ) {
      this.markers[index].marker.remove();
      this.markers.splice( index, 1 );
    }

    flyTo( marker: Marker ) {
      this.map?.flyTo({
        zoom: 17,
        center: marker.getLngLat()
      })
    }

    saveToLocalStorage(){
      //console.log(this.markers);
      const plainMarkers: PlainMarker[] = this.markers.map( ({color,marker}) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray()
        }
      });

      console.log( plainMarkers )
      localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

    }
    readFromLocalStorage(){
      const plainMarkersString = localStorage.getItem( 'plainMarkers' ) ?? '[]';
      const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString)
      plainMarkers.forEach ( ({ color, lngLat }) => {
        const [ lng, lat ] = lngLat;
        const coords = new LngLat ( lng, lat );

        this.addMarker( coords, color );
      })
    }

}
