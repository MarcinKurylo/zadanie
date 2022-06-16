import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  public recipe!: Recipe


  constructor(private route: ActivatedRoute,private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(map(params => params.get('id')))
    .subscribe(id => this.getRecipe(id!))
  }

  private getRecipe(id: string) {
    this.recipesService.getRecipe(id).subscribe(recipe => this.recipe = recipe)
  }

}
