import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MueblesComponent } from './components/muebles/muebles.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ContactComponent } from './components/contact/contact.component';
import { UsComponent } from './components/us/us.component';
import { ReusedComponent } from './components/reused/reused.component';

@NgModule({
  declarations: [
    AppComponent,
    MueblesComponent,
    InicioComponent,
    ContactComponent,
    UsComponent,
    ReusedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
