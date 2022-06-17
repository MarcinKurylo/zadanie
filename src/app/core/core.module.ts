import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { TimePipe } from './pipes/time.pipe';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    TimePipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    IconsModule,
    TimePipe,
    FilterPipe
  ]
})
export class CoreModule { }
