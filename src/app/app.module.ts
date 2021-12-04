import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { CardComponent } from './modules/playground/card/card.component';
import { HeaderComponent } from './core/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    CoreModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
