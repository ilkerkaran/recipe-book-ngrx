import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private fetchedRecipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    public authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {}

  onsignOut() {
    this.authService.signOut();
    console.log('sign-out executed.');
    this.router.navigate(['/signin']);
  }

  onSaveData() {
    this.recipeService.saveRecipes().subscribe(
      (response) => {
        console.log(response);
      }
    );
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
