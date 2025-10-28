import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReusedComponent } from './components/reused/reused.component';
import { UsComponent } from './components/us/us.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AttainmentComponent } from './components/attainment/attainment.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { WorksComponent } from './components/works/works.component';

const routes: Routes = [
    { path: 'home', component: InicioComponent },    
    { path: 'attainment', component: AttainmentComponent },    
    { path: 'works', component: WorksComponent },   
    { path: 'contacto', component: ContactComponent },    
    { path: 'reused', component: ReusedComponent },
    { path: 'us', component: UsComponent },
    { path: 'gallery', component: GalleryComponent },

    /*Desúes los mueves */
    { path: 'footer', component: FooterComponent },
    { path: 'header', component: HeaderComponent },


    { path: '', pathMatch:'full', redirectTo: 'home'},
    { path: '**', pathMatch:'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
