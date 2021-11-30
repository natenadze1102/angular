import { Component, Input, OnInit } from '@angular/core';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('triggerLoader', [
      transition(':enter', [
        style({ transform: 'rotate(0deg)', opacity: '1' }),
        animate(
          '5s',
          keyframes([
            style({ backgroundColor: 'silver', offset: 0 }),
            style({ transform: 'rotate(1800deg)', offset: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s',
          keyframes([
            style({
              backgroundColor: 'lightGreen',
              offset: 0.5,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SpinnerComponent implements OnInit {
  isShown: boolean = this.UsersServcice.isShown;
  @Input() isShowned = this.isShown;
  constructor(private UsersServcice: UsersService) {}

  ngOnInit(): void {
    this.UsersServcice.subject.subscribe((value) => {
      this.isShown = value;
    });
  }

  ngOnChanges(): void {
    // this.UsersServcice.subject.subscribe((value) => {
    //   this.isShown = value;
    // });
    // this.isShown = this.isShowned;
  }
}
