import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'movie',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'movie',
        loadChildren: './components/movie/movie.module#MovieModule',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
