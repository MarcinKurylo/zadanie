import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from '../app-routing.module';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthorDialogComponent } from './author-dialog/author-dialog.component';
import { DetailsComponent } from './details/details.component';
import { CoreModule } from '../core/core.module';

const COMPONENTS = [
  NavbarComponent,
  ListComponent,
  RecipeComponent,
  AuthorDialogComponent,
  DetailsComponent,
]


@NgModule({
  declarations: [
    ...COMPONENTS,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ViewsModule { }
