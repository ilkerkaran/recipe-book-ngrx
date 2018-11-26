import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { EmptyRecipeComponent } from './empty-recipe/empty-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoute: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: EmptyRecipeComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent }, // static parameter should come before dynamic parameter
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(recipesRoute)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
