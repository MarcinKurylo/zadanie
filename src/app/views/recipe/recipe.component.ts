import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: string = ''


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(map(params => params.get('id')))
    .subscribe(id => this.loadRecipe(id!))
  }

  private loadRecipe(id: string) {
    this.recipe = id
  }

}
