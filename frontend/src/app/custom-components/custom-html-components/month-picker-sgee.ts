import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { InputMaskModule, InputMask } from 'primeng/primeng';
import { DatePickerComponent, IMonthCalendarConfig, DatePickerDirective } from 'ng2-date-picker';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
    selector: 'month-picker-sgee',
    templateUrl: './month-picker-sgee.html'
})
export class MonthPickerSgee implements OnInit {
    msgFutureDate = "Data informada não pode ser maior que a Data Atual.";
    msgPastDate = "Data não pode ser de um ano menor que 2000."

    @Input() date: string;
    @Input() disabled: boolean = false;

    regex = new RegExp("^((0[1-9])|(1[0-2]))\\/[1-9]\\d{3}$");

    @ViewChild('dateDirectivePicker') datePickerDirective: DatePickerDirective;

    @Input() dateMinMessage: string;
    @Input() dateMaxMessage: string;

    @Output() OnDateInvalid = new EventEmitter();
    @Output() OnDateChanged = new EventEmitter();
    config: IMonthCalendarConfig;
    @Input() inputId: string = "";

    @Input() isMonthPicker: boolean = true;
    format: string = 'MM/YYYY';
    mode: string = 'month';
    mask: string = '99/9999';
    @Input() styleButton: string = '';
    @Input() styleInput: string = '';
    
    constructor(private el: ElementRef) {
        
    }

    ngOnInit(): void {
        var dateMinShow: Moment = moment(new Date(2000, 0, 1));
        var dateMaxShow: Moment = moment();
        if (this.isMonthPicker !== true){
            this.regex = new RegExp("^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))\\/((0[1-9])|(1[0-2]))\\/[1-9]\\d{3}$");
            this.format = 'DD/MM/YYYY';
            this.mask = '99/99/9999';
            this.mode = 'day';
        }
        this.config = {
            yearFormat: 'YYYY',
            monthBtnFormat: 'MMM',
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: true,
            locale: 'pt-br',
            format: this.format,
            min: dateMinShow,
            max: dateMaxShow,
            // opens: "right"
        };
    }

    valuechange(event) {
        this.verifyDate(event);
    }

    open() {
        if (this.datePickerDirective.datePicker._areCalendarsShown)
            this.datePickerDirective.api.close();
        else
            this.datePickerDirective.api.open();
    }

    onComplete(maskDate: InputMask) {
        if (!this.regex.exec(this.date)) {
            this.date = "";
            this.OnDateChanged.emit(this.date);
            return;
        }

        this.verifyDate(this.date);
    }

    onBlur(){
        if (!this.regex.exec(this.date)) {
            this.date = "";
            this.OnDateChanged.emit(this.date);
        }
    }

    verifyDate(date){
        var dateInformed = moment(date, this.format);
        if (this.isMonthPicker !== true && !dateInformed.isValid()){
            date = "";
            return;
        }
        if (!this.verifyDateMin(dateInformed)){
            date = "";
            return;
        }

        if (!this.verifyDateMax(dateInformed)){
            date = "";
            return;
        }

        this.OnDateChanged.emit(moment(this.date, this.format));
    }

    verifyDateMin(dateInformed): boolean {
        if (this.config.min) {
            if (dateInformed < this.config.min) {
                this.date = "";
                this.OnDateInvalid.emit("Data não pode ser menor que " + this.config.min.format(this.format) + ".");
                return false;
            }
        } else {
            if (dateInformed < new Date(2000, 0, 1)) {
                this.date = "";
                this.OnDateInvalid.emit(this.msgPastDate);
                return false;
            }
        }
        return true;
    }

    verifyDateMax(dateInformed): boolean {
        if (this.config.max) {
            if (dateInformed > this.config.max) {
                this.date = "";
                this.OnDateInvalid.emit("Data não pode ser maior que " + this.config.max.format(this.format) + ".");
                return false;
            }
        } else {
            if (dateInformed > new Date) {
                this.date = "";
                this.OnDateInvalid.emit(this.msgFutureDate);
                return false;
            }
        }
        return true;
    }

    cleanDate(){
        this.date = "";
        this.OnDateChanged.emit(this.date);
        this.datePickerDirective.datePicker.currentDateView = moment();
    }

    getDate():Date{
        return moment(this.date, this.format).toDate();
    }
    setDate(date:Date){
        this.date =  moment(date).format(this.format);
    }

    getDateOrDefault():Date{
        if (!this.date)
            return null;
        return moment(this.date, this.format).toDate();
    }

    updateMinDateConfig(date){
        if (date){
            this.config.min = date;
        }
        else{
            this.config.min = moment(new Date(2000, 0, 1));        
        }
        this.config = {...this.config};
    }

    updateMaxDateConfig(date){
        if (date){
            this.config.max = date;
        }
        else{
            this.config.max = moment();
        }
        this.config = {...this.config};
    }
}