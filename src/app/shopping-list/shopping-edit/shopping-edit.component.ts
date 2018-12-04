import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shoppimg-list.actions';
import { State, AppState } from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedIngredient: Ingredient;

  @ViewChild('f')
  shoppingEditForm: NgForm;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.store.select('shoppingList').subscribe(data => {
      if (data.editedIngredientIndex > -1) {
        this.editedIngredient = data.editedIngredient;
        this.editMode = true;
        this.editForm();
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onSubmit() {
    const newIngredient = new Ingredient(
      this.shoppingEditForm.value.name,
      this.shoppingEditForm.value.amount
    );
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          ingredient: newIngredient
        })
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onResetForm();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onResetForm();
  }

  editForm() {
    this.shoppingEditForm.setValue({
      name: this.editedIngredient.name,
      amount: this.editedIngredient.amount
    });
  }

  onResetForm() {
    this.shoppingEditForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
