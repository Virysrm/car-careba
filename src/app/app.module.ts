import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ContactComponent } from './components/contact/contact.component';
import { UsComponent } from './components/us/us.component';
import { ReusedComponent } from './components/reused/reused.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { importType } from '@angular/compiler/src/output/output_ast';
import { AttainmentComponent } from './components/attainment/attainment.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { WorksComponent } from './components/works/works.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContactComponent,
    UsComponent,
    ReusedComponent,
    FooterComponent,
    HeaderComponent,
    AttainmentComponent,
    GalleryComponent,
    WorksComponent
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
