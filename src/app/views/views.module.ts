import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

const COMPONENTS = [
  NavbarComponent,
  ListComponent,
  DetailsComponent
]


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ViewsModule { }
