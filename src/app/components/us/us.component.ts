import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-us',
    templateUrl: './us.component.html',
    styleUrls: ['./us.component.scss'],
    animations: [
        trigger('slideInRight', [
            state('hidden', style({
                opacity: 0,
                transform: 'translateX(30px)'
            })),
            state('visible', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('hidden => visible', animate('800ms ease-out'))
        ]),
        trigger('slideInLeft', [
            state('hidden', style({
                opacity: 0,
                transform: 'translateX(-30px)' // cambio a negativo para entrar desde la izquierda
            })),
            state('visible', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('hidden => visible', animate('800ms ease-out'))
        ])
    ],
    standalone: false
})
export class UsComponent {

animationState = 'hidden';

  constructor(private el: ElementRef) {}

  // Detecta cuando entra al viewport
  @HostListener('window:scroll', [])
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;

    if (isVisible && this.animationState === 'hidden') {
      this.animationState = 'visible';
    }
  }

  ngOnInit(): void {
  }

}
