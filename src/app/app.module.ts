import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MapComponent} from './components/dashboard/main/map/map.component';
import {LeftMenuComponent} from './components/dashboard/main/left-menu/left-menu.component';
import {GraphicsComponent} from './components/dashboard/main/graphics/graphics.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor, JwtInterceptor} from './interceptors';

// primeng modules
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {TabMenuModule} from 'primeng/tabmenu';
import {ContextMenuModule} from 'primeng/contextmenu';
import {RightMenuComponent} from './components/dashboard/main/right-menu/right-menu.component';
import {TableModule} from 'primeng/table';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {MainComponent} from './components/dashboard/main/main.component';
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
import {AdministrationComponent} from './components/dashboard/administration/administration.component';
import {PatientsListComponent} from './components/dashboard/administration/patients-list/patients-list.component';
import {UserListComponent} from './components/dashboard/administration/user-list/user-list.component';
import {AddNewPatientComponent} from './components/dashboard/administration/patients-list/add-new-patient/add-new-patient.component';
import {StatisticsComponent} from './components/dashboard/statistics/statistics.component';
import {AboutComponent} from './components/dashboard/about/about.component';
import {RelationCasesComponent} from './components/dashboard/statistics/relation-cases/relation-cases.component';
import {GeneralStatisticsComponent} from './components/dashboard/statistics/general-statistics/general-statistics.component';
import {CoronavirusEuropeComponent} from './components/dashboard/statistics/coronavirus-europe/coronavirus-europe.component';
import {ManifestComponent} from './components/dashboard/manifest/manifest.component';
import {MapsComponent} from './components/dashboard/maps/maps.component';
import {No2EmissionComponent} from './components/dashboard/maps/no2-emission/no2-emission.component';
import {EuropeanContextComponent} from './components/dashboard/maps/european-context/european-context.component';
import {SocialInterestPointsComponent} from './components/dashboard/maps/social-interest-points/social-interest-points.component';
import {FrontierSituationComponent} from './components/dashboard/maps/frontier-situation/frontier-situation.component';
import {HospitalInfrastructureComponent} from './components/dashboard/maps/hospital-infrastructure/hospital-infrastructure.component';
import {CountiesCasesComponent} from './components/dashboard/statistics/counties-cases/counties-cases.component';
import {ServiceWorkerModule} from '@angular/service-worker';

import {InstallPromptComponent} from './components/install-prompt/install-prompt.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PwaService} from './services/pwa.service';

const pwaServiceInitializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapComponent,
    LeftMenuComponent,
    GraphicsComponent,
    RightMenuComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
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
    InstallPromptComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: true, registrationStrategy: 'registerImmediately'}),
    OverlayPanelModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // {provide: APP_INITIALIZER, useFactory: pwaServiceInitializer, deps: [PwaService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
