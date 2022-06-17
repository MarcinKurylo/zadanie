import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EventsService } from 'src/app/core/services/events.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

  public recipe!: Recipe
  public mode: 'edit' | 'read' = 'read'
  private subscription!: Subscription

  constructor(private route: ActivatedRoute,private recipesService: RecipesService, private router: Router, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(map(params => params.get('id')))
    .subscribe(id => this.getRecipe(id!))
    this.subscription = this.eventsService.event$.subscribe(event => {
      if (event.action === 'update') {
        this.getRecipe(this.recipe._id!)
      }
    } )
  }

  public deleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe._id!).subscribe(_res => {
      window.alert('Recipe deleted')
      this.eventsService.emit({action: 'delete'})
      this.router.navigate(['/'])
    })
  }

  private getRecipe(id: string) {
    this.recipesService.getRecipe(id).subscribe(recipe => this.recipe = recipe)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
