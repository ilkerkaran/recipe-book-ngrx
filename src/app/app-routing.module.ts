import {
  RouterModule,
  Routes,
  PreloadAllModules,
  NoPreloading
} from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './core/home/home.component';
import { AppCustomPreloader } from './shared/custom-preloader';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule'
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
    // loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule {}
