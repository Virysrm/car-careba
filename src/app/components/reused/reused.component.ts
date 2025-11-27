import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-reused',
    templateUrl: './reused.component.html',
    styleUrls: ['./reused.component.scss'],
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
export class ReusedComponent implements OnInit {

animationState = 'hidden';

  constructor() { }

  ngOnInit(): void {
  }

}
