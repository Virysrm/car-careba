import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'home-dashboard',
  standalone: true,  
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  pageTitle = '';
  pageSubtitle = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

ngOnInit(): void {
  //cOLOCAR RUTAS DE LAS PAGINAS

  this.route.firstChild?.data.subscribe(data => {
    this.pageTitle = data['title'] || '';
    this.pageSubtitle = data['subtitle'] || '';
    console.log(data);
  });

}

}