import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationsService {
  notificationChange: Subject<Object> = new Subject<Object>();
  waitingChange: Subject<Object> = new Subject<Object>();

  notify(severity: string, summary: string, detail: string) {
    this.notificationChange.next({ severity, summary, detail });
  }

  showWait() {
    this.waitingChange.next(true);
  }

  hideWait(){
    this.waitingChange.next(false);
  }
}