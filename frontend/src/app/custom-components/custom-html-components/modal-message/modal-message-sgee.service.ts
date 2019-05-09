import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalMessageService {
    messageChange: Subject<Object> = new Subject<Object>();
    questionChange: Subject<Object> = new Subject<Object>();

    notify(title: string, content: string, theBoundCallback: Function) {
        this.messageChange.next({ title, content, theBoundCallback });
    }

    notifyQuestion(title: string, content: string, theBoundCallback: Function) {
        this.questionChange.next({ title, content, theBoundCallback });
    }
}