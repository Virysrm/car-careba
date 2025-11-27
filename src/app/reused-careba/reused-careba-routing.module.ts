import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReusedCarebaComponent } from "./reused-careba.component";
import { CategoryComponent } from "./category/category.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductsComponent } from "./products/products.component";

const routes: Routes = [
  {
    path: "",
    component: ReusedCarebaComponent,
    children: [{ path: "", redirectTo: "inicio", pathMatch: "full" },
        { path: 'category', component: CategoryComponent }, 
        { path: 'contacto', component: ContactComponent },    
        { path: 'footer', component: FooterComponent },
        { path: 'navbar', component: NavbarComponent },
        { path: 'products', component: ProductsComponent },
    ],    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReusedCarebaRoutingModule {}