import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './dashboard/main/map/map.component';
import { LeftMenuComponent } from './dashboard/main/left-menu/left-menu.component';
import { GraphicsComponent } from './dashboard/main/graphics/graphics.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard.service';
import { SkipIfLoggedIn } from './_guards/skipIfLoggedIn.guard';
import { AdministrationComponent } from './dashboard/administration/administration.component';
import { UserListComponent } from './dashboard/administration/user-list/user-list.component';
import { PatientsListComponent } from './dashboard/administration/patients-list/patients-list.component';
import { MainComponent } from './dashboard/main/main.component';
import { AddNewPatientComponent } from './dashboard/administration/patients-list/add-new-patient/add-new-patient.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { AboutComponent } from './dashboard/about/about.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { 
        path: 'main', 
        component: MainComponent,
        children: [
          { path: 'map', component: MapComponent },
          { path: 'left-menu', component: LeftMenuComponent },
          { path: 'graphics', component: GraphicsComponent }
        ]
      },
      { 
        path: 'statistics', 
        component: StatisticsComponent
      },
      { 
        path: 'administration', 
        component: AdministrationComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'patients-list', pathMatch: 'full' },
          { path: 'patients-list', 
            component: PatientsListComponent,
            children: [
              { path: 'add-new-patient', component: AddNewPatientComponent }
            ]
          },
          { path: 'user-list', component: UserListComponent }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent, resolve: { skipLoggedIn: SkipIfLoggedIn } }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
