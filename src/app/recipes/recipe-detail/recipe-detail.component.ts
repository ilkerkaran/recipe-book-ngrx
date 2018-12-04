import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppinListActions from '../../shopping-list/store/shoppimg-list.actions';
import { State } from 'src/app/shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  constructor(
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipe = this.recipeService.getRecipe(+params['id']);
      this.id = +params['id'];
    });
  }
  onToShoppingListClick() {
    this.store.dispatch(
      new ShoppinListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
