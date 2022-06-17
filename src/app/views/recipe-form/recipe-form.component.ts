import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';
import { RecipesService } from 'src/app/core/services/recipes.service';
import { Ingredient } from 'src/app/types/ingredient';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {

  get ingredientsArray() {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  recipeForm: FormGroup = this.formBuilder.group({})
  recipeId: string = ''
  isLoading = true

  constructor(private formBuilder: FormBuilder, private recipesService: RecipesService, private activatedRoute: ActivatedRoute, private router: Router, private eventsService: EventsService) { }

  async ngOnInit(): Promise<void> {
    this.recipeId = this.activatedRoute.snapshot.parent!.paramMap.get('id')!
    this.buildForm()
    if (this.recipeId) {
      const selectedRecipe = await this.recipesService.getRecipe(this.recipeId).toPromise()
      delete selectedRecipe?._id
      selectedRecipe?.ingredients.forEach(ingredient => this.addIngredient(ingredient))
      this.recipeForm.setValue(selectedRecipe!)
      this.isLoading = false
    } else {
      this.isLoading = false
    }
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

  public onCancel() {
    if (this.recipeId) {
      this.router.navigate(['recipe', this.recipeId])
    } else {
      this.router.navigate(['/'])
    }
  }

  private buildForm() {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]],
      preparationTimeInMinutes: ['', Validators.required],
      ingredients: this.formBuilder.array([])
    })
    if (!this.recipeId) {
      for (let index = 0; index < 2; index++) {
        this.addIngredient()
      }
    }
  }

}
