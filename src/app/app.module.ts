import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ViewsModule } from './views/views.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { XApiKeyInterceptor } from './core/interceptors/x-api-key.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    CoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: HTTP_INTERCEPTORS, useClass: XApiKeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
