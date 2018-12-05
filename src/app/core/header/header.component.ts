import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as fromAuth from 'src/app/auth/store/auth.reducers';
import * as authActions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private fetchedRecipes: Recipe[];
  authState: Observable<fromAuth.State>;

  constructor(
    private recipeService: RecipeService,
    public authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onsignOut() {
    this.store.dispatch(new authActions.Logout());
    this.authService.signOut();
    console.log('sign-out executed.');
    this.router.navigate(['/signin']);
  }

  onSaveData() {
    this.recipeService.saveRecipes().subscribe(response => {
      console.log(response);
    });
  }

  onFetchData() {
    this.recipeService
      .fetchRecipes()
      .pipe(
        map(response => {
          this.fetchedRecipes = response;
          this.fetchedRecipes.forEach(r => {
            if (!r['ingredients']) {
              r.ingredients = [];
            }
          });
        })
      )
      .subscribe(response => {
        this.recipeService.setRecipes(this.fetchedRecipes);
      });
  }
}
