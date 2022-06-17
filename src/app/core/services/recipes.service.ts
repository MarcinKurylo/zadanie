import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Recipe } from '../../types/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  public recipe$!: Recipe

  constructor(private Http: HttpClient) { }

  public getRecipe(id: string) {
    return this.Http.get<Recipe>(`api/recipe/${id}`).pipe(
      tap(recipe => this.recipe$ = recipe)
    )
  }

  public getRecipes() {
    return this.Http.get<Recipe[]>(`api/recipe`)
  }

  public createRecipe(recipe: Recipe) {
    return this.Http.post<Recipe>(`api/recipe`, recipe)
  }

  public updateRecipe(id: string, recipe: Recipe) {
    return this.Http.put<Recipe>(`api/recipe/${id}`, recipe)
  }

  public deleteRecipe(id: string) {
    return this.Http.delete<Recipe>(`api/recipe/${id}`)
  }

}
