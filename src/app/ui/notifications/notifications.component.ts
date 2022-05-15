import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../services/notification.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('notification', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-30%)',
        }),
        animate('0.25s ease-in'),
      ]),
      transition('* => void', [
        animate('0.25s ease-out'),
        style({
          opacity: 0,
          transform: 'translateX(30%)',
        }),
      ]),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {}
}
