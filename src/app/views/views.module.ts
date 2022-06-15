import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeComponent } from './recipe/recipe.component';

const COMPONENTS = [
  NavbarComponent,
  ListComponent,
  RecipeComponent
]


@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ViewsModule { }
