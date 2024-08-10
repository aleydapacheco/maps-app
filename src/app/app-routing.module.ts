import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Impplementacion de LazyLoad o Implementacion de rutas por carga perezosa
const routes: Routes = [
  {
    path: 'maps', loadChildren: () => import('./maps/maps.module').then( m => m.MapsModule ),
  },
  {
    path: 'alone', loadComponent: () => import('./alone/pages/alone-page/alone-page.component').then( c => c.AlonePageComponent  )
  },
  {
    path: '**',
    redirectTo: 'maps',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
