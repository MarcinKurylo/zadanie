import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './views/recipe-form/recipe-form.component';
import { RecipeComponent } from './views/recipe/recipe.component';

const routes: Routes = [
  {
    path: 'newRecipe',
    component: RecipeFormComponent
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    children: [
      {
        path: 'edit',
        component: RecipeFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
