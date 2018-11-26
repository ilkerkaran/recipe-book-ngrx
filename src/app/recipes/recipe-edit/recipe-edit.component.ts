import { Ingredient } from './../../shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  ingredientControlArray: FormArray;

  // form fields
  formRecipeId: number;
  formRecipeName: string;
  formRecipeDesc: string;
  formRecipeImagePath: string;
  formRecipeIngredients: Ingredient[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  // Life-Cycle hooks
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {}

  // Template hooks
  onDiscard() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    console.log(this.editMode);
    if (this.editMode) {
      this.recipeService.updateRecipe(
        this.id,
        new Recipe(
          this.id,
          this.recipeForm.value['name'],
          this.recipeForm.value['description'],
          this.recipeForm.value['imagePath'],
          this.recipeForm.value['ingredients']
        )
      );
    } else {
      this.recipeService.addRecipe(
        new Recipe(
          this.id,
          this.recipeForm.value['name'],
          this.recipeForm.value['description'],
          this.recipeForm.value['imagePath'],
          this.recipeForm.value['ingredients']
        )
      );
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.generateIngredientFormGroup(null, null)
    );

    this.recipeForm.controls['ingredients'] = this.ingredientControlArray;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // private methods
  private initForm() {
    this.ingredientControlArray = new FormArray([]);
    if (this.editMode) {
      const theRecipe = this.recipeService.getRecipe(this.id);
      this.formRecipeId = theRecipe.id;
      this.formRecipeName = theRecipe.name;
      this.formRecipeDesc = theRecipe.description;
      this.formRecipeImagePath = theRecipe.imagePath;
      this.formRecipeIngredients = theRecipe.ingredients.slice();
      console.log(this.id);
      this.ingredientControlArray.controls.push(
        ...this.initIngerdientsFormControls()
      );
      this.recipeForm = new FormGroup({
        name: new FormControl(this.formRecipeName, Validators.required),
        description: new FormControl(this.formRecipeDesc, Validators.required),
        imagePath: new FormControl(
          this.formRecipeImagePath,
          Validators.required
        ),
        ingredients: this.ingredientControlArray
      });
    } else {
      this.id = this.recipeService.getRecipes().length + 1;
      this.ingredientControlArray = new FormArray([]);
      this.recipeForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        imagePath: new FormControl(null, Validators.required),
        ingredients: this.ingredientControlArray
      });
    }
  }

  private initIngerdientsFormControls(): FormGroup[] {
    let res = [];
    for (let index = 0; index < this.formRecipeIngredients.length; index++) {
      const element = this.formRecipeIngredients[index];
      const fg = this.generateIngredientFormGroup(element.name, element.amount);
      res.push(fg);
    }
    return res;
  }

  private generateIngredientFormGroup(name: string, amount: number): FormGroup {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, Validators.required)
    });
  }
}
