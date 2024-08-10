import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterAloneComponent } from './alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from './alone/components/side-menu/side-menu.component';
//Este modulo Maps Module no es necesario si se implementa LazyLoad
//import { MapsModule } from './maps/maps/maps.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //MapsModule

    //Importando el Modulo Standalone
    CounterAloneComponent,
    SideMenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
