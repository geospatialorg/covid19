import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/dashboard/main/map/map.component';
import { LeftMenuComponent } from './components/dashboard/main/left-menu/left-menu.component';
import { GraphicsComponent } from './components/dashboard/main/graphics/graphics.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard.service';
import { SkipIfLoggedIn } from './guards/skipIfLoggedIn.guard';
import { AdministrationComponent } from './components/dashboard/administration/administration.component';
import { UserListComponent } from './components/dashboard/administration/user-list/user-list.component';
import { PatientsListComponent } from './components/dashboard/administration/patients-list/patients-list.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { AddNewPatientComponent } from './components/dashboard/administration/patients-list/add-new-patient/add-new-patient.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { AboutComponent } from './components/dashboard/about/about.component';
import { RelationCasesComponent } from './components/dashboard/statistics/relation-cases/relation-cases.component';
import { GeneralStatisticsComponent } from './components/dashboard/statistics/general-statistics/general-statistics.component';
import { CoronavirusEuropeComponent } from './components/dashboard/statistics/coronavirus-europe/coronavirus-europe.component';
import { ManifestComponent } from './components/dashboard/manifest/manifest.component';
import { MapsComponent } from './components/dashboard/maps/maps.component';
import { No2EmissionComponent } from './components/dashboard/maps/no2-emission/no2-emission.component';
import { EuropeanContextComponent } from './components/dashboard/maps/european-context/european-context.component';
import { SocialInterestPointsComponent } from './components/dashboard/maps/social-interest-points/social-interest-points.component';
import { FrontierSituationComponent } from './components/dashboard/maps/frontier-situation/frontier-situation.component';
import { HospitalInfrastructureComponent } from './components/dashboard/maps/hospital-infrastructure/hospital-infrastructure.component';
import { CountiesCasesComponent } from './components/dashboard/statistics/counties-cases/counties-cases.component';


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
        component: MainComponent
      },
      {
        path: 'main?:map',
        component: MainComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        children: [
          { path: '', redirectTo: 'general-statistics', pathMatch: 'full' },
          { path: 'general-statistics', component: GeneralStatisticsComponent },
          { path: 'relation-cases', component: RelationCasesComponent },
          { path: 'counties-cases', component: CountiesCasesComponent }
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
  { path: 'login', component: LoginComponent, resolve: { skipLoggedIn: SkipIfLoggedIn } },
  { path: '**', redirectTo: '/dashboard/main' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
