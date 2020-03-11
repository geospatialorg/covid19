import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './dashboard/main/map/map.component';
import { LeftMenuComponent } from './dashboard/main/left-menu/left-menu.component';
import { GraphicsComponent } from './dashboard/main/graphics/graphics.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ErrorInterceptor, JwtInterceptor } from './_interceptors';

// primeng modules
import {MenubarModule} from 'primeng/menubar';
import {TabMenuModule} from 'primeng/tabmenu';
import {ContextMenuModule} from 'primeng/contextmenu';
import { RightMenuComponent } from './dashboard/main/right-menu/right-menu.component';
import {TableModule} from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './_components/footer/footer.component';
import { HeaderComponent } from './_components/header/header.component';
import { MainComponent } from './dashboard/main/main.component';
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
import { LoginComponent } from './login/login.component';
import {ChartModule} from 'primeng/chart';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministrationComponent } from './dashboard/administration/administration.component';
import { PatientsListComponent } from './dashboard/administration/patients-list/patients-list.component';
import { UserListComponent } from './dashboard/administration/user-list/user-list.component';
import { AddNewPatientComponent } from './dashboard/administration/patients-list/add-new-patient/add-new-patient.component';

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
    AddNewPatientComponent
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
    ChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
