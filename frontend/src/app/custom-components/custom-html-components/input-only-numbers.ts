import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Directive({
    selector: '[OnlyNumber]'
})
export class OnlyNumber implements OnChanges {

    constructor(private el: ElementRef) { }

    @Input() OnlyNumber: boolean;
    @Input() DecimalLength: number;
    @Input() TotalLength: number;
    @Output() ngModelChange = new EventEmitter();

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;
        if (this.OnlyNumber) {
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
                // Allow: Ctrl+C
                (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
                // Allow: Ctrl+V
                (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
                // Allow: Ctrl+X
                (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            this.el.nativeElement.value = this.el.nativeElement.value.replace(".",",");
            if ((e.keyCode === 110 || e.keyCode === 188) && this.el.nativeElement.value && this.el.nativeElement.value.indexOf(',') === -1)
                return;
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }

            if (this.DecimalLength 
                && this.el.nativeElement.value.indexOf(',') > -1 
                && this.el.nativeElement.selectionStart > this.el.nativeElement.value.indexOf(',')
                && this.el.nativeElement.selectionStart === this.el.nativeElement.selectionEnd){
                var decimalValue: string = this.el.nativeElement.value.substring(this.el.nativeElement.value.indexOf(','), this.el.nativeElement.value.length);
                if (decimalValue.length > this.DecimalLength)
                    e.preventDefault();
            }

            if (this.TotalLength && this.el.nativeElement.selectionStart === this.el.nativeElement.selectionEnd){
                var total: number = this.TotalLength;
                var digits: number = this.el.nativeElement.value.toString().length;                
                if (this.el.nativeElement.value.indexOf(',') > -1){
                    digits = digits - 1;
                } else if (this.DecimalLength){
                    total = total - this.DecimalLength;
                }
                if (digits >= total)
                    e.preventDefault();
            }
            this.ngModelChange.emit(this.el.nativeElement.value);
        }
    }

    @HostListener('keyup', ['$event']) onKeyUp(event) {
        this.el.nativeElement.value = this.el.nativeElement.value.trim().replace(".",",");
        var text: string = this.el.nativeElement.value;
        var regex = new RegExp("^[0-9]*,?[0-9]*$");
        if (!regex.exec(text))
            this.el.nativeElement.value = "";

        if (this.TotalLength){
            var total: number = this.TotalLength;
            var digits: number = this.el.nativeElement.value.toString().length;                
            if (this.el.nativeElement.value.indexOf(',') > -1){
                digits = digits - 1;
            } else if (this.DecimalLength){
                total = total - this.DecimalLength;
            }
            if (digits > total){
                if (this.el.nativeElement.value.indexOf(',') > -1){
                    var slice : number = parseInt(total.toString())  + 1;
                    this.el.nativeElement.value = this.el.nativeElement.value.substring(0, slice);
                }else{
                    this.el.nativeElement.value = this.el.nativeElement.value.substring(0, total);
                }
            }
        }

        if (this.DecimalLength && this.el.nativeElement.value.indexOf(',') > -1 ){
            var decimalValue: string = this.el.nativeElement.value.substring(this.el.nativeElement.value.indexOf(',')+1, this.el.nativeElement.value.length);
            if (decimalValue.length > this.DecimalLength)
                this.setNewValue(this.el.nativeElement.value.substring(0,this.el.nativeElement.value.length - (decimalValue.length - this.DecimalLength)))
        }

        this.ngModelChange.emit(this.el.nativeElement.value);
    }

    @HostListener('input', ['$event']) oninput(value) {
        this.el.nativeElement.value = this.el.nativeElement.value.trim().replace(".",",");
        var text: string = this.el.nativeElement.value;
        var value = value;
        var regex = new RegExp("^[0-9]*,?[0-9]*$");
        if (!regex.exec(text))
            this.el.nativeElement.value = "";
        this.ngModelChange.emit(this.el.nativeElement.value);
    }

    @HostListener('blur') onBlur() {
        var pos: number = this.el.nativeElement.value.indexOf(',');
        var val: string = this.el.nativeElement.value.substring(pos);
        if (val === ',')
            this.el.nativeElement.value = this.el.nativeElement.value.substring(0, pos);
        this.ngModelChange.emit(this.el.nativeElement.value);
    }

    setNewValue(value){
        var selectionEnd = this.el.nativeElement.selectionEnd;
        this.el.nativeElement.value = value;
        if (!(selectionEnd > this.el.nativeElement.value.length))
            this.el.nativeElement.selectionEnd = selectionEnd;
    }
    
    ngOnChanges(): void {
        //this.setPlaceHolder();
    }

    setPlaceHolder(){
        if (this.TotalLength){
            var placeholder = "";
            while (placeholder.length < this.TotalLength) placeholder += "9";            
            if (this.DecimalLength && this.DecimalLength > 0)
                placeholder = placeholder.substring(0, placeholder.length - this.DecimalLength) + "," + placeholder.substring(placeholder.length - this.DecimalLength, placeholder.length);
            this.el.nativeElement.placeholder = placeholder;
        }
    }

    setAutoFocus(){
        setTimeout(() => this.el.nativeElement.focus(), 0);
    }
}