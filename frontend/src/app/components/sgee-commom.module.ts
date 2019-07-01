import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { InputMaskModule, DropdownModule, AutoCompleteModule, ListboxModule, OverlayPanelModule, CheckboxModule, TabViewModule, SharedModule, 
  DataTableModule, GrowlModule, DialogModule, CalendarModule, FieldsetModule, MenuModule, MultiSelectModule, SplitButtonModule, SelectButtonModule } from 'primeng/primeng';
import { DpDatePickerModule } from 'ng2-date-picker';
import { MonthPickerSgee } from '../custom-components/custom-html-components/month-picker-sgee';
import { AutocompleteSgee } from '../custom-components/custom-html-components/autocomplete-sgee/autocomplete-sgee';
import { MultiSelectSgee } from '../custom-components/custom-html-components/multiselect-sgee/multiselect-sgee';
import { CustomDatePipe } from "./../custom-components/custom-date-pipe";
import { OnlyNumber } from "./../custom-components/custom-html-components/input-only-numbers";
import { InputFocusDirective } from "./../custom-components/custom-html-components/input-focus";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
     InputMaskModule, DropdownModule, AutoCompleteModule, ListboxModule, OverlayPanelModule, CheckboxModule, TabViewModule
    ,DpDatePickerModule,SelectButtonModule,
    DataTableModule, SharedModule, GrowlModule, DialogModule, CalendarModule, FieldsetModule, MenuModule, MultiSelectModule, SplitButtonModule, InputMaskModule, DropdownModule, AutoCompleteModule
  ],
  declarations: [ 
    MonthPickerSgee, AutocompleteSgee, MultiSelectSgee, CustomDatePipe, OnlyNumber, InputFocusDirective
  ],
  providers: [DecimalPipe],
  exports: [MonthPickerSgee, AutocompleteSgee, MultiSelectSgee, CustomDatePipe, OnlyNumber, InputFocusDirective]
})
export class SgeeCommomModule { }
