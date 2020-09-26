import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {MapComponent} from './components/main/home/map/map.component';
import {LeftMenuComponent} from './components/main/home/left-menu/left-menu.component';
import {GraphicsComponent} from './components/main/home/graphics/graphics.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor, JwtInterceptor} from './interceptors';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// primeng modules
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {TabMenuModule} from 'primeng/tabmenu';
import {ContextMenuModule} from 'primeng/contextmenu';
import {RightMenuComponent} from './components/main/home/right-menu/right-menu.component';
import {TableModule} from 'primeng/table';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {HomeComponent} from './components/main/home/home.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PanelModule} from 'primeng/panel';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';
import {ChipsModule} from 'primeng/chips';
import {PaginatorModule} from 'primeng/paginator';
import {MenuModule} from 'primeng/menu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CardModule} from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TreeModule} from 'primeng/tree';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TooltipModule} from 'primeng/tooltip';
import {TreeTableModule} from 'primeng/treetable';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BlockUIModule} from 'primeng/blockui';
import {ListboxModule} from 'primeng/listbox';
import {FieldsetModule} from 'primeng/fieldset';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputMaskModule} from 'primeng/inputmask';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {LoginComponent} from './components/login/login.component';
import {ChartModule} from 'primeng/chart';
import {ConfirmationService, MessageService} from 'primeng/api';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdministrationComponent} from './components/main/administration/administration.component';
import {PatientsListComponent} from './components/main/administration/patients-list/patients-list.component';
import {UserListComponent} from './components/main/administration/user-list/user-list.component';
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
import {ServiceWorkerModule} from '@angular/service-worker';
import { MobilityComponent } from './components/main/impact/mobility/mobility.component';
import { AirQualityComponent } from './components/main/statistics/air-quality/air-quality.component';

import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PwaService} from './services/pwa.service';
import {InstallPromptComponent} from './components/install-prompt/install-prompt.component';
import {DashboardService} from './services';
import {environment} from '../environments/environment';
import {NotificationsService} from './services/notifications.service';
import { EuropaCasesGraphComponent } from './components/main/statistics/europa-cases-graph/europa-cases-graph.component';
import { DailyTestsComponent } from './components/main/statistics/daily-tests/daily-tests.component';
import { EuropeSituationComponent } from './components/main/statistics/europe-situation/europe-situation.component';
import { CommunityComponent } from './components/main/community/community.component';
import { DeathsComponent } from './components/main/statistics/deaths/deaths.component';
import { CommunitiesComponent } from './components/main/maps/communities/communities.component';
import { MobilityWazeComponent } from './components/main/impact/mobility/mobility-waze/mobility-waze.component';
import { MobilityAppleComponent } from './components/main/impact/mobility/mobility-apple/mobility-apple.component';
import { MobilityGoogleComponent } from './components/main/impact/mobility/mobility-google/mobility-google.component';
import { MobilityMapComponent } from './components/main/maps/mobility-map/mobility-map.component';
import { PublicInterestComponent } from './components/main/statistics/public-interest/public-interest.component';
import { SeaWaterTemperatureComponent } from './components/main/statistics/sea-water-temperature/sea-water-temperature.component';
import { MobilityBorderComponent } from './components/main/impact/mobility/mobility-border/mobility-border.component';
import { EuropeActiveCasesComponent } from './components/main/statistics/europe-situation/europe-active-cases/europe-active-cases.component';
import { EuropeConfirmedCasesComponent } from './components/main/statistics/europe-situation/europe-confirmed-cases/europe-confirmed-cases.component';
import { EuropeDeathsComponent } from './components/main/statistics/europe-situation/europe-deaths/europe-deaths.component';
import { ImpactComponent } from './components/main/impact/impact.component';
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
import { IndicatorsComponent } from './components/main/impact/economy/indicators/indicators.component';
import { CommerceComponent } from './components/main/impact/economy/commerce/commerce.component';
import { ExchangeComponent } from './components/main/impact/economy/exchange/exchange.component';
import { MonetaryComponent } from './components/main/impact/economy/monetary/monetary.component';
import { OnlineTrafficViewsComponent } from './components/main/impact/media/online-traffic-views/online-traffic-views.component';
import { OnlineTrafficVisitsComponent } from './components/main/impact/media/online-traffic-visits/online-traffic-visits.component';
import { OnlineTrafficUniqueComponent } from './components/main/impact/media/online-traffic-unique/online-traffic-unique.component';
import { AdvertisingComponent } from './components/main/impact/media/advertising/advertising.component';
import { CommunicationsComponent } from './components/main/impact/communications/communications.component';
import { Statistics112Component } from './components/main/impact/communications/statistics112/statistics112.component';
import { EnterpriseComponent } from './components/main/impact/enterprise/enterprise.component';
import { RegistrationsComponent } from './components/main/impact/enterprise/registrations/registrations.component';
import { SuspendedComponent } from './components/main/impact/enterprise/suspended/suspended.component';
import { ErasuresComponent } from './components/main/impact/enterprise/erasures/erasures.component';
import { DissolutionsComponent } from './components/main/impact/enterprise/dissolutions/dissolutions.component';

const pwaServiceInitializer = (pwaService: PwaService) => () => pwaService.init();
const notificationsServiceInitializer = (notificationsService: NotificationsService) => () => notificationsService.init();


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MapComponent,
    LeftMenuComponent,
    GraphicsComponent,
    RightMenuComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AdministrationComponent,
    PatientsListComponent,
    UserListComponent,
    AddNewPatientComponent,
    StatisticsComponent,
    AboutComponent,
    RelationCasesComponent,
    GeneralStatisticsComponent,
    CoronavirusEuropeComponent,
    ManifestComponent,
    MapsComponent,
    No2EmissionComponent,
    EuropeanContextComponent,
    SocialInterestPointsComponent,
    FrontierSituationComponent,
    HospitalInfrastructureComponent,
    CountiesCasesComponent,
    LogsComponent,
    MobilityComponent,
    AirQualityComponent,
    InstallPromptComponent,
    EuropaCasesGraphComponent,
    DailyTestsComponent,
    EuropeSituationComponent,
    CommunityComponent,
    DeathsComponent,
    CommunitiesComponent,
    MobilityWazeComponent,
    MobilityAppleComponent,
    MobilityGoogleComponent,
    MobilityMapComponent,
    PublicInterestComponent,
    SeaWaterTemperatureComponent,
    MobilityBorderComponent,
    EuropeActiveCasesComponent,
    EuropeConfirmedCasesComponent,
    EuropeDeathsComponent,
    ImpactComponent,
    MobilityAirTrafficComponent,
    AgricultureComponent,
    MediaComponent,
    TourismComponent,
    PopulationComponent,
    RealEstateComponent,
    AutoComponent,
    EconomyComponent,
    SacrificationComponent,
    TvAudienceComponent,
    TourismServicesComponent,
    NaturalMovementComponent,
    WorkforceComponent,
    AuthorizationsComponent,
    DynamicsComponent,
    PricesComponent,
    RegistrationComponent,
    FuelPriceComponent,
    IndicatorsComponent,
    CommerceComponent,
    ExchangeComponent,
    MonetaryComponent,
    OnlineTrafficViewsComponent,
    OnlineTrafficVisitsComponent,
    OnlineTrafficUniqueComponent,
    AdvertisingComponent,
    CommunicationsComponent,
    Statistics112Component,
    EnterpriseComponent,
    RegistrationsComponent,
    SuspendedComponent,
    ErasuresComponent,
    DissolutionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    TabMenuModule,
    ContextMenuModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),

    SidebarModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    ToolbarModule,
    SplitButtonModule,
    PanelModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    ChipsModule,
    PaginatorModule,
    MenuModule,
    BreadcrumbModule,
    CardModule,
    FileUploadModule,
    TabViewModule,
    ConfirmDialogModule,
    TreeModule,
    ScrollPanelModule,
    TooltipModule,
    TreeTableModule,
    InputTextareaModule,
    BlockUIModule,
    ListboxModule,
    FieldsetModule,
    OrganizationChartModule,
    MultiSelectModule,
    AutoCompleteModule,
    InputMaskModule,
    ToggleButtonModule,
    RadioButtonModule,
    AccordionModule,
    ToastModule,
    SliderModule,
    SpinnerModule,
    ChartModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.enable_service_worker,
      registrationStrategy: 'registerImmediately'
    }),
    OverlayPanelModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DashboardService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: pwaServiceInitializer, deps: [PwaService], multi: true},
    {provide: APP_INITIALIZER, useFactory: notificationsServiceInitializer, deps: [NotificationsService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
