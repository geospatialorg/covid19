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

import { AirQualityComponent } from './components/main/statistics/air-quality/air-quality.component';
import { EuropaCasesGraphComponent } from './components/main/statistics/europa-cases-graph/europa-cases-graph.component';
import { DailyTestsComponent } from './components/main/statistics/daily-tests/daily-tests.component';
import { EuropeSituationComponent } from './components/main/statistics/europe-situation/europe-situation.component';
import { CommunityComponent } from './components/main/community/community.component';
import { DeathsComponent } from './components/main/statistics/deaths/deaths.component';
import { CommunitiesComponent } from './components/main/maps/communities/communities.component';

import { MobilityMapComponent } from './components/main/maps/mobility-map/mobility-map.component';
import { PublicInterestComponent } from './components/main/statistics/public-interest/public-interest.component';
import { SeaWaterTemperatureComponent } from './components/main/statistics/sea-water-temperature/sea-water-temperature.component';

import { EuropeActiveCasesComponent } from './components/main/statistics/europe-situation/europe-active-cases/europe-active-cases.component';
import { EuropeConfirmedCasesComponent } from './components/main/statistics/europe-situation/europe-confirmed-cases/europe-confirmed-cases.component';
import { EuropeDeathsComponent } from './components/main/statistics/europe-situation/europe-deaths/europe-deaths.component';
import { ImpactComponent } from './components/main/impact/impact.component';

import { MobilityComponent } from './components/main/impact/mobility/mobility.component';
import { MobilityWazeComponent } from './components/main/impact/mobility/mobility-waze/mobility-waze.component';
import { MobilityAppleComponent } from './components/main/impact/mobility/mobility-apple/mobility-apple.component';
import { MobilityGoogleComponent } from './components/main/impact/mobility/mobility-google/mobility-google.component';
import { MobilityBorderComponent } from './components/main/impact/mobility/mobility-border/mobility-border.component';
import { MobilityAirTrafficComponent } from './components/main/impact/mobility/mobility-air-traffic/mobility-air-traffic.component';
import { AgricultureComponent } from './components/main/impact/agriculture/agriculture.component';
import { MediaComponent } from './components/main/impact/media/media.component';
import { TourismComponent } from './components/main/impact/tourism/tourism.component';
import { PopulationComponent } from './components/main/impact/population/population.component';
import { RealEstateComponent } from './components/main/impact/real-estate/real-estate.component';
import { AutoComponent } from './components/main/impact/auto/auto.component';
import { EconomyComponent } from './components/main/impact/economy/economy.component';
import { SacrificationComponent } from './components/main/impact/agriculture/sacrification/sacrification.component';
import { TvAudienceComponent } from './components/main/impact/media/tv-audience/tv-audience.component';
import { TourismServicesComponent } from './components/main/impact/tourism/tourism-services/tourism-services.component';
import { NaturalMovementComponent } from './components/main/impact/population/natural-movement/natural-movement.component';
import { WorkforceComponent } from './components/main/impact/population/workforce/workforce.component';
import { AuthorizationsComponent } from './components/main/impact/real-estate/authorizations/authorizations.component';
import { DynamicsComponent } from './components/main/impact/real-estate/dynamics/dynamics.component';
import { PricesComponent } from './components/main/impact/real-estate/prices/prices.component';
import { RegistrationComponent } from './components/main/impact/auto/registration/registration.component';
import { FuelPriceComponent } from './components/main/impact/auto/fuel-price/fuel-price.component';
import { ExchangeComponent } from './components/main/impact/economy/exchange/exchange.component';
import { IndicatorsComponent } from './components/main/impact/economy/indicators/indicators.component';
import { CommerceComponent } from './components/main/impact/economy/commerce/commerce.component';
import { MonetaryComponent } from './components/main/impact/economy/monetary/monetary.component';

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
          
          {path: 'calitate-aer', component: AirQualityComponent},
          {path: 'temperatura-apa-mare', component: SeaWaterTemperatureComponent},
          {
            path: 'situatie-europa', 
            // component: EuropeSituationComponent,
            children: [
              {path: '', redirectTo: 'cazuri-active', pathMatch: 'full'},
              {path: 'cazuri-active', component: EuropeActiveCasesComponent},
              {path: 'cazuri-confirmate', component: EuropeConfirmedCasesComponent},
              {path: 'decese', component: EuropeDeathsComponent}
            ]
          },
          {path: 'interes-public', component: PublicInterestComponent},
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
        path: 'impact',
        component: ImpactComponent,
        children: [
          {path: '', redirectTo: 'mobilitate', pathMatch: 'full'},
          {
            path: 'mobilitate', 
            component: MobilityComponent,
            children: [
              {path: '', redirectTo: 'apple', pathMatch: 'full'},
              {path: 'waze', component: MobilityWazeComponent},
              {path: 'apple', component: MobilityAppleComponent},
              {path: 'google', component: MobilityGoogleComponent},
              {path: 'frontiera', component: MobilityBorderComponent},
              {path: 'trafic-aerian', component: MobilityAirTrafficComponent}
            ]
          },
          {
            path: 'agricultura', 
            component: AgricultureComponent,
            children: [
              {path: '', redirectTo: 'sacrificari-animale', pathMatch: 'full'},
              {path: 'sacrificari-animale', component: SacrificationComponent}
            ]
          },
          {
            path: 'media', 
            component: MediaComponent,
            children: [
              {path: '', redirectTo: 'audiente-tv', pathMatch: 'full'},
              {path: 'audiente-tv', component: TvAudienceComponent}
            ]
          },
          {
            path: 'turism', 
            component: TourismComponent,
            children: [
              {path: '', redirectTo: 'structuri-primire-turistica', pathMatch: 'full'},
              {path: 'structuri-primire-turistica', component: TourismServicesComponent}
            ]
          },
          {
            path: 'populatie', 
            component: PopulationComponent,
            children: [
              {path: '', redirectTo: 'miscarea-naturala', pathMatch: 'full'},
              {path: 'miscarea-naturala', component: NaturalMovementComponent},
              {path: 'forta-munca', component: WorkforceComponent}
            ]
          },
          {
            path: 'imobiliare', 
            component: RealEstateComponent,
            children: [
              {path: '', redirectTo: 'autorizatii', pathMatch: 'full'},
              {path: 'autorizatii', component: AuthorizationsComponent},
              {path: 'dinamica', component: DynamicsComponent},
              {path: 'preturi', component: PricesComponent}
            ]
          },
          {
            path: 'auto', 
            component: AutoComponent,
            children: [
              {path: '', redirectTo: 'inmatriculare', pathMatch: 'full'},
              {path: 'inmatriculare', component: RegistrationComponent},
              {path: 'pret-combustibili', component: FuelPriceComponent}
            ]
          },
          {
            path: 'economie', 
            component: EconomyComponent,
            children: [
              {path: '', redirectTo: 'curs-valutar', pathMatch: 'full'},
              {path: 'curs-valutar', component: ExchangeComponent},
              {path: 'indici', component: IndicatorsComponent},
              {path: 'comert-servicii', component: CommerceComponent},
              {path: 'indicatori-monetari', component: MonetaryComponent}
            ]
          }
        ]
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
