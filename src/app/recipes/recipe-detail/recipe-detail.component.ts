import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipe = this.recipeService.getRecipe(+params['id']);
      this.id = +params['id'];
    });
  }
  onToShoppingListClick() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
