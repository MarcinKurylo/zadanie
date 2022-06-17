import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/core/services/events.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[] = []
  public searchFilter: string = ''
  private subscription!: Subscription

  constructor(private recipesService: RecipesService, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getRecipes()
    this.subscription = this.eventsService.event$.subscribe(event => {
      if (event.action === 'delete' || event.action === 'create' || event.action === 'update') {
        this.getRecipes()
      }
    } )
  }

  public getRecipes() {
    this.recipesService.getRecipes().subscribe(recipes => this.recipes = recipes)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
