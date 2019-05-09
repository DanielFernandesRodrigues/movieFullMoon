import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { AuthGuard } from './guards/index';
import { NotificationsService } from './custom-components/custom-html-components/notification/notification-sgee.service';
import { ModalMessageService } from './custom-components/custom-html-components/modal-message/modal-message-sgee.service';
// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { NotificationsComponent } from './custom-components/custom-html-components/notification/notification-sgee.component';
import { ModalMessageComponent } from './custom-components/custom-html-components/modal-message/modal-message-sgee.component';
import { AppSettings } from './appSettings';
import { GrowlModule, DialogModule } from 'primeng/primeng';
import { ChartValuesPipe } from 'app/pipes/sgee-chart-value';
import { HttpService } from './services/http.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    GrowlModule, DialogModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NotificationsComponent,
    ModalMessageComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    ChartValuesPipe
  ],
  providers: [{
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AppSettings,
    AuthGuard,
    //{ provide: HttpService, useClass: HttpService },
    HttpService,
    NotificationsService,
    ModalMessageService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
