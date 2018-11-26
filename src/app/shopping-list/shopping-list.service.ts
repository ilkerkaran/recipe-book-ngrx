import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 7),
    new Ingredient('Tomatoes', 11)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients.slice()[id];
  }

  addIngredient(ingredientToAdd: Ingredient) {
    this.ingredients.push(ingredientToAdd);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredient(id: number, editedIngredient: Ingredient) {
    if (id >= this.ingredients.length || id < 0) {
      console.log('error on ingredient editing. Index out of range...');
    }
    this.ingredients[id] = editedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredientsToAdd: Ingredient[]) {
    this.ingredients.push(...ingredientsToAdd);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
