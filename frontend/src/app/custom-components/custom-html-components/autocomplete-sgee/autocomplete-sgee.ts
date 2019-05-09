import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { SelectItem, Message, MenuModule, MenuItem, DataTable, MultiSelectModule, InputMaskModule, DropdownModule, MultiSelect, Dropdown, AutoComplete, AutoCompleteModule } from 'primeng/primeng';

@Component({
    selector: 'autocomplete-sgee',
    templateUrl: './autocomplete-sgee.html'
})

export class AutocompleteSgee implements AfterViewInit{
    @ViewChild('selector') selector: AutoComplete;
    @Input() nucDefaultText: string;
    @Input() inputId_: string;
    @Input() field_: string;
    @Input() maxlength_: string;
    @Input() emptyMessage_: string = "Nenhum registro encontrado";
    @Input() placeholder_: string;
    @Input() baseList: SelectItem[] = [];
    @Input() type: string;
    @Input() maxDropdownItems: number = 300;
    @Output() onSelect = new EventEmitter();
    @Output() completeMethod = new EventEmitter();
    @Output() onKeyUp = new EventEmitter();

    selected: SelectItem;
    filteredList: SelectItem[] = [];

    ngAfterViewInit(): void {
        this.selector.inputEL.nativeElement.addEventListener('keydown', this.onKeyDownNuc.bind(this));
    }

    onKeyDownNuc(event) {
        const e = <KeyboardEvent>event;
        if (this.type  === 'number') {
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
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }
        // Desabilitando o ctrl+z por que ocorrem bugs no IE e no Chrome
        if (e.ctrlKey && e.keyCode === 90) {
            e.preventDefault();
        }

    }

    canShowDropdown() : boolean{
        return this.baseList && this.baseList.length != 0 && this.baseList.length <= this.maxDropdownItems;
    }

    onSelect_(){
        this.onSelect.emit();
    }

    completeMethod_(event) {        
        this.filteredList = [];
        for(let i = 0; i < this.baseList.length; i++) {
            let suggestion = this.baseList[i];
            if(suggestion.label.toLowerCase().includes(event.query.toLowerCase())) {
                this.filteredList.push(suggestion);
            }
        }
    }

    onKeyUp_(event){
        let e = <KeyboardEvent>event;//arrows up down
        if ((e.keyCode == 40 || e.keyCode == 38) && this.selector.highlightOption){
            this.onKeyUp.emit(this.selector.highlightOption.value);
        }
    }

    changeInput(event){
        if (this.type == 'number'){
            var text: string = this.selector.inputEL.nativeElement.value;
            var regex = new RegExp('^[0-9]*$');
            if (!regex.exec(text))
                this.selector.inputEL.nativeElement.value = '';
        }
        this.onSelect.emit();
    }
    
    onBlur_(){   
        if (!this.selected || !this.selected.value)
        this.selected = null;
    }
    onFocus(e) {
        setTimeout(()=>{
            this.moveCursorToEnd(e.target)
        }, 0);

    }
    moveCursorToEnd(el) {
        if (typeof el.selectionStart == "number") {       
            el.selectionStart = el.value.length;
            el.selectionEnd = el.value.length;
        } 
        if (typeof el.createTextRange != "undefined") {
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    }
}   
