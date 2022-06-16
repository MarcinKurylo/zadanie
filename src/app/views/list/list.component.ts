import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public recipes: Recipe[] = []

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe(recipes => this.recipes = recipes)
  }

}
