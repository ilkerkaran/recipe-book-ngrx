import { SharedModule } from './../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { EmptyRecipeComponent } from './empty-recipe/empty-recipe.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    EmptyRecipeComponent,
    RecipeEditComponent
  ],
  providers: []
})
export class RecipesModule {}
