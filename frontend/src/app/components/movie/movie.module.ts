import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, GrowlModule, DialogModule, CalendarModule, FieldsetModule,
    MenuModule, MultiSelectModule, InputMaskModule, DropdownModule, AutoCompleteModule } from 'primeng/primeng';
import { SgeeCommomModule } from '../sgee-commom.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieService } from 'app/services/movie.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MovieRoutingModule,
    SgeeCommomModule,
    DataTableModule, SharedModule, GrowlModule, DialogModule, CalendarModule, FieldsetModule, MenuModule, 
        MultiSelectModule, InputMaskModule, DropdownModule, AutoCompleteModule
  ],
  declarations: [ MovieComponent ],
  providers: [MovieService]
})
export class MovieModule { }
