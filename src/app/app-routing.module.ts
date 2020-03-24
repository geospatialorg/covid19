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
import { RelationCasesComponent } from './dashboard/statistics/relation-cases/relation-cases.component';
import { GeneralStatisticsComponent } from './dashboard/statistics/general-statistics/general-statistics.component';
import { CoronavirusEuropeComponent } from './dashboard/statistics/coronavirus-europe/coronavirus-europe.component';
import { ManifestComponent } from './dashboard/manifest/manifest.component';
import { MapsComponent } from './dashboard/maps/maps.component';
import { No2EmissionComponent } from './dashboard/maps/no2-emission/no2-emission.component';
import { EuropeanContextComponent } from './dashboard/maps/european-context/european-context.component';
import { SocialInterestPointsComponent } from './dashboard/maps/social-interest-points/social-interest-points.component';
import { FrontierSituationComponent } from './dashboard/maps/frontier-situation/frontier-situation.component';
import { HospitalInfrastructureComponent } from './dashboard/maps/hospital-infrastructure/hospital-infrastructure.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'manifest', component: ManifestComponent },
      { 
        path: 'maps', 
        component: MapsComponent,
        children: [
          { path: '', redirectTo: 'no2-emission', pathMatch: 'full' },
          { path: 'no2-emission', component: No2EmissionComponent },
          { path: 'europe', component: EuropeanContextComponent },
          { path: 'social-interest-points', component: SocialInterestPointsComponent },
          { path: 'frontier-situation', component: FrontierSituationComponent },
          { path: 'hospital-infrastructure', component: HospitalInfrastructureComponent }
        ]
      },
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
        component: StatisticsComponent,
        children: [
          { path: '', redirectTo: 'general-statistics', pathMatch: 'full' },
          { path: 'general-statistics', component: GeneralStatisticsComponent },
          { path: 'relation-cases', component: RelationCasesComponent }
        ]
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
