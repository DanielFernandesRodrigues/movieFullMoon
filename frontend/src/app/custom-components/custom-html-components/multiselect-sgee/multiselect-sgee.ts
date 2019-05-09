import { Component, ViewChild, HostListener, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { SelectItem, ListboxModule, Listbox, OverlayPanelModule, OverlayPanel } from 'primeng/primeng';

@Component({
    selector: 'multiselect-sgee',
    templateUrl: './multiselect-sgee.html'
})

export class MultiSelectSgee implements OnInit{
    @ViewChild('panel') panel: OverlayPanel;    
    @ViewChild('listSelector') listSelector: Listbox;
    @ViewChild('btnList') btnList: ElementRef;

    @Input() inputId: string;
    @Input() defaultText: string = "Selecione o(s) registro(s)";
    @Input() listOptions: SelectItem[];
    @Input() selectedList: SelectItem[];
    @Input() listBoxClass: string = "sgee-select-listbox";
    @Input() appendTo: string = "body";

    @Output() onChange = new EventEmitter();

    overpanelStyleClass = "sgee-overlaypanel";

    ngOnInit(): void {
        var ua = navigator.userAgent;
        var keys = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(keys[1] === 'Chrome'){
            var other = ua.match(/\b(OPR|Edge)\/(\d+)/);//edge and opera have key 'Chrome'
            if(other == null)
                this.overpanelStyleClass = "sgee-overlaypanel sgee-overlaypanel-chrome";//just for chrome
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event){
        if(this.panel && this.panel.visible){
            this.panel.hide();
        }
    }

    setFocusToElement(element){
        if (element)
            setTimeout(() => element.focus());
    }

    afterShow(){
        var link = this.listSelector.el.nativeElement.getElementsByClassName("sgee-multiselect-link").item(0);
        if (link)this.setFocusToElement(link);
        var input = this.listSelector.el.nativeElement.getElementsByClassName("ui-inputtext ui-widget ui-state-default ui-corner-all").item(0);
        this.setFocusToElement(input);
    }

    panelHide(){
        if (this.listSelector){
            var input = this.listSelector.el.nativeElement.getElementsByClassName("ui-inputtext ui-widget ui-state-default ui-corner-all").item(0);
            if (input){
                input.value = "";
                this.listSelector.filterValue = "";
            }
        }
    }

    onChangeValue() :void {
        this.onChange.emit(this.selectedList);
    }

    click(event, btnList){
        this.panel.toggle(event, btnList.parentElement);
    }

    onKeyUp(event){
        let e = <KeyboardEvent>event;
        if (e.keyCode == 27){
            this.panel.hide();
            this.setFocusToElement(this.btnList.nativeElement);
        }else if (e.keyCode === 36 && (e.ctrlKey || e.metaKey)){
            var input = this.listSelector.el.nativeElement.getElementsByClassName("ui-inputtext ui-widget ui-state-default ui-corner-all").item(0);
            this.setFocusToElement(input);           
        }
    }
}