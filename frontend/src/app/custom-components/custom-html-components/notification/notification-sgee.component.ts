import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/primeng';
import { NotificationsService } from './notification-sgee.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification-sgee.html'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  globalMsgs: Message[] = [];
  showWait: boolean = false;
  subscription: Subscription;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.subscribeToNotifications();
    this.subscribeToWait();
  }

  subscribeToNotifications() {
    this.subscription = this.notificationsService.notificationChange
      .subscribe(notification => {
        this.globalMsgs = [];
        this.globalMsgs.push(notification);
      });
  }

  subscribeToWait() {
    this.subscription = this.notificationsService.waitingChange
      .subscribe(notification => {
        this.showWait = <boolean>notification;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}