import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard.service';
import {SkipIfLoggedIn} from './guards/skipIfLoggedIn.guard';
import {AdministrationComponent} from './components/main/administration/administration.component';
import {UserListComponent} from './components/main/administration/user-list/user-list.component';
import {PatientsListComponent} from './components/main/administration/patients-list/patients-list.component';
import {HomeComponent} from './components/main/home/home.component';
import {AddNewPatientComponent} from './components/main/administration/patients-list/add-new-patient/add-new-patient.component';
import {StatisticsComponent} from './components/main/statistics/statistics.component';
import {AboutComponent} from './components/main/about/about.component';
import {RelationCasesComponent} from './components/main/statistics/relation-cases/relation-cases.component';
import {GeneralStatisticsComponent} from './components/main/statistics/general-statistics/general-statistics.component';
import {CoronavirusEuropeComponent} from './components/main/statistics/coronavirus-europe/coronavirus-europe.component';
import {ManifestComponent} from './components/main/manifest/manifest.component';
import {MapsComponent} from './components/main/maps/maps.component';
import {No2EmissionComponent} from './components/main/maps/no2-emission/no2-emission.component';
import {EuropeanContextComponent} from './components/main/maps/european-context/european-context.component';
import {SocialInterestPointsComponent} from './components/main/maps/social-interest-points/social-interest-points.component';
import {FrontierSituationComponent} from './components/main/maps/frontier-situation/frontier-situation.component';
import {HospitalInfrastructureComponent} from './components/main/maps/hospital-infrastructure/hospital-infrastructure.component';
import {CountiesCasesComponent} from './components/main/statistics/counties-cases/counties-cases.component';
import {LogsComponent} from './components/dashboard/logs/logs.component';


const routes: Routes = [
  // {path: '', redirectTo: 'main', pathMatch: 'full'},
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {path: 'despre', component: AboutComponent},
      {path: 'manifest', component: ManifestComponent},
      {
        path: 'harti',
        component: MapsComponent,
        children: [
          {path: '', redirectTo: 'no2-emission', pathMatch: 'full'},
          {path: 'no2-emission', component: No2EmissionComponent},
          {path: 'europe', component: EuropeanContextComponent},
          {path: 'social-interest-points', component: SocialInterestPointsComponent},
          {path: 'frontier-situation', component: FrontierSituationComponent},
          {path: 'hospital-infrastructure', component: HospitalInfrastructureComponent}
        ]
      },
      {
        path: 'statistici',
        component: StatisticsComponent,
        children: [
          {path: '', redirectTo: 'statistici-generale', pathMatch: 'full'},
          {path: 'statistici-generale', component: GeneralStatisticsComponent},
          {path: 'relationare-cazuri', component: RelationCasesComponent},
          {path: 'repartitie-cazuri-judete', component: CountiesCasesComponent},
          {path: 'situatie-europa', component: CoronavirusEuropeComponent}
        ]
      },
      {
        path: 'jurnal-aplicatie',
        component: LogsComponent
      },
      {
        path: 'administration',
        component: AdministrationComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', redirectTo: 'patients-list', pathMatch: 'full'},
          {
            path: 'patients-list',
            component: PatientsListComponent,
            children: [
              {path: 'add-new-patient', component: AddNewPatientComponent}
            ]
          },
          {path: 'user-list', component: UserListComponent}
        ]
      }
    ]
  },
  {path: 'login', component: LoginComponent, resolve: {skipLoggedIn: SkipIfLoggedIn}},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
