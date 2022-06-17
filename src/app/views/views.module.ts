import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthorDialogComponent } from './author-dialog/author-dialog.component';
import { CoreModule } from '../core/core.module';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  NavbarComponent,
  ListComponent,
  RecipeComponent,
  AuthorDialogComponent,
  RecipeFormComponent,
]


@NgModule({
  declarations: [
    ...COMPONENTS,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ViewsModule { }
