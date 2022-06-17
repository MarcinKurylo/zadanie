import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { TimePipe } from './pipes/time.pipe';



@NgModule({
  declarations: [
    TimePipe
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    IconsModule,
    TimePipe
  ]
})
export class CoreModule { }
