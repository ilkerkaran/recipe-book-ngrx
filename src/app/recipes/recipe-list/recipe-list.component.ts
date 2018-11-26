import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSub: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSub = this.recipeService.recipesChanged.subscribe(
      (incRecipes: Recipe[]) => {
        this.recipes = incRecipes;
      }
    );
  }
  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }
}
