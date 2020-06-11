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
import {LogsComponent} from './components/main/logs/logs.component';
import { MobilityComponent } from './components/main/statistics/mobility/mobility.component';
import { AirQualityComponent } from './components/main/statistics/air-quality/air-quality.component';
import { EuropaCasesGraphComponent } from './components/main/statistics/europa-cases-graph/europa-cases-graph.component';
import { DailyTestsComponent } from './components/main/statistics/daily-tests/daily-tests.component';
import { EuropeSituationComponent } from './components/main/statistics/europe-situation/europe-situation.component';
import { CommunityComponent } from './components/main/community/community.component';
import { DeathsComponent } from './components/main/statistics/deaths/deaths.component';
import { CommunitiesComponent } from './components/main/maps/communities/communities.component';
import { MobilityWazeComponent } from './components/main/statistics/mobility/mobility-waze/mobility-waze.component';
import { MobilityAppleComponent } from './components/main/statistics/mobility/mobility-apple/mobility-apple.component';
import { MobilityGoogleComponent } from './components/main/statistics/mobility/mobility-google/mobility-google.component';
import { MobilityMapComponent } from './components/main/maps/mobility-map/mobility-map.component';


const routes: Routes = [
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
          {path: '', redirectTo: 'hospital-infrastructure', pathMatch: 'full'},
          {path: 'no2-emission', component: No2EmissionComponent},
          {path: 'europe', component: EuropeanContextComponent},
          {path: 'social-interest-points', component: SocialInterestPointsComponent},
          {path: 'frontier-situation', component: FrontierSituationComponent},
          {path: 'hospital-infrastructure', component: HospitalInfrastructureComponent},
          {path: 'comunitati-marginalizate', component: CommunitiesComponent},
          {path: 'mobilitate', component: MobilityMapComponent}
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
          // {path: 'situatie-europa', component: CoronavirusEuropeComponent},
          // {path: 'situatie-europa-grafic', component: EuropaCasesGraphComponent},
          {path: 'teste-efectuate', component: DailyTestsComponent},
          {
            path: 'mobilitate', 
            component: MobilityComponent,
            children: [
              {path: '', redirectTo: 'waze', pathMatch: 'full'},
              {path: 'waze', component: MobilityWazeComponent},
              {path: 'apple', component: MobilityAppleComponent},
              {path: 'google', component: MobilityGoogleComponent},
            ]
          },
          {path: 'calitate-aer', component: AirQualityComponent},
          {path: 'situatie-europa', component: EuropeSituationComponent},
          {path: 'decese', component: DeathsComponent}
        ]
      },
      {
        path: 'jurnal-aplicatie',
        component: LogsComponent
      },
      {
        path: 'comunitate',
        component: CommunityComponent
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
