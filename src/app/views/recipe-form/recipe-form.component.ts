import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Ingredient } from 'src/app/types/ingredient';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent implements OnInit {

  get ingredientsArray() {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  recipeForm!: FormGroup
  recipeId: string = ''

  constructor(private formBuilder: FormBuilder, private recipesService: RecipesService, private activatedRoute: ActivatedRoute, private router: Router, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.recipeId = this.activatedRoute.snapshot.parent!.paramMap.get('id')!
    let recipe
    if (this.recipeId) {
      recipe = this.recipesService.recipe$
    }
    this.buildForm(recipe)
  }

  public addIngredient(ingredient?: Ingredient): void {
    (this.recipeForm.get('ingredients')! as FormArray).push(this.formBuilder.group({
      name: [ingredient?.name ?? '', Validators.required],
      quantity: [ ingredient?.quantity ?? '', Validators.required],
    }))
  }

  public onSubmit(): void {
    const recipe = this.recipeForm.value as unknown as Recipe
    if (this.recipeId) {
      this.recipesService.updateRecipe(this.recipeId, recipe).subscribe(_res => {
        window.alert('Recipe Updated')
        this.eventsService.emit({action: 'update'})
        this.router.navigate(['recipe', this.recipeId])
      })
    } else {
      this.recipesService.createRecipe(recipe).subscribe(
        res => {
          this.recipeForm.reset()
          window.alert('Recipe Created')
          this.eventsService.emit({action: 'create'})
          this.router.navigate(['recipe', res._id])
        }
      )
    }
  }

  private buildForm(recipe?: Recipe) {
    this.recipeForm = this.formBuilder.group({
      name: [recipe?.name ?? '', Validators.required],
      description: [recipe?.description ?? '', Validators.required],
      preparationTimeInMinutes: [recipe?.preparationTimeInMinutes ?? '', Validators.required],
      ingredients: this.formBuilder.array([])
    })
    if (!this.recipeId) {
      this.addIngredient()
    } else {
      recipe?.ingredients.forEach(ingredient => this.addIngredient(ingredient))
    }
  }

}
