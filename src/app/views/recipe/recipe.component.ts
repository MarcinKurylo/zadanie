import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EventsService } from 'src/app/core/services/events.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Recipe } from 'src/app/types/recipe';
import { DeleteConfirmComponent } from '../recipe-form/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {

  public recipe!: Recipe
  public mode: 'edit' | 'read' = 'read'
  private subscription!: Subscription

  constructor(private route: ActivatedRoute,private recipesService: RecipesService, private router: Router, private eventsService: EventsService, public dialog: MatDialog) { }

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

  public openDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data === 'delete') {
        this.deleteRecipe()
      }
    })
  }

  private getRecipe(id: string) {
    this.recipesService.getRecipe(id).subscribe(recipe => this.recipe = recipe)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
