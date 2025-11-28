import { NgModule } from "@angular/core";
import { AppComponent } from "../app.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ReusedCarebaComponent } from "./reused-careba.component";
import { ReusedCarebaRoutingModule } from "./reused-careba-routing.module";
import { ProductsComponent } from "./products/products.component";
import { CategoryComponent } from "./category/category.component";
import { ContactComponent } from "./contact/contact.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ServiciosComponent } from "./servicios/servicios.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReusedCarebaRoutingModule,
    ReactiveFormsModule,
    ReusedCarebaComponent,
    ProductsComponent,
    CategoryComponent,
    ContactComponent,
    NavbarComponent,
    ServiciosComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ReusedCarebaModule {}
