import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/primeng';
import { ModalMessageService } from './modal-message-sgee.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-modal-message',
    templateUrl: './modal-message-sgee.html'
})
export class ModalMessageComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    modalMessageTitle: string;
    modalMessageDisplay = false;
    modalMessageContent: string;
    theBoundCallback: Function;

    displayDialogQuestion: boolean = false;
    dialogTitleQuestion: string = "Deseja prosseguir?";
    dialogMessageQuestion: string = "";

    constructor(private modalMessageService: ModalMessageService) { }

    ngOnInit() {
        this.subscribeToNotifications();
        this.subscribeToQuestionNotifications();
    }

    subscribeToNotifications() {
        this.subscription = this.modalMessageService.messageChange
            .subscribe(notification => {
                var info = <any>notification;
                this.modalMessageTitle = info.title;
                this.modalMessageContent = info.content;
                this.theBoundCallback = info.theBoundCallback;
                this.modalMessageDisplay = true;
            });
    }

    subscribeToQuestionNotifications() {
        this.subscription = this.modalMessageService.questionChange
            .subscribe(notification => {
                var info = <any>notification;
                if (info.title)
                    this.dialogTitleQuestion = info.title;
                this.dialogMessageQuestion = info.content;
                this.theBoundCallback = info.theBoundCallback;
                this.displayDialogQuestion = true;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onTabPress(event){
        if (event.keyCode == 9){
            event.preventDefault();
            return false;
        }
    }
    
    onTabPressQuestion(event){
        if (event.keyCode == 9){
            if (event.currentTarget.id == "modal-message-yes-btn"){
                this.setFocusToElement(document.getElementById("modal-message-no-btn"));
            } else {
                this.setFocusToElement(document.getElementById("modal-message-yes-btn"));
            }
        }
    }

    onShowModal(event){
        this.setFocusToElement(document.getElementById("modal-message-ok-btn"));
    }

    onShowModalQuestion(event){
        this.setFocusToElement(document.getElementById("modal-message-yes-btn"));
    }

    setFocusToElement(element){
        if (element)
            setTimeout(() => element.focus());
    }

    modalClick(event){
        this.setFocusToElement(document.getElementById("modal-message-ok-btn"));
    }

    modalClickQuestion(event){
        this.setFocusToElement(document.getElementById("modal-message-yes-btn"));
    }

    okClick(event){
        this.modalMessageDisplay = false;
    }
}