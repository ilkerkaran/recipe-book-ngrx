import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedIndex = -1;
  editedIngredient : Ingredient;
  editingSubscription: Subscription;

  @ViewChild('f')
  shoppingEditForm: NgForm;

  constructor(protected shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.editingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.editForm();
      }
    );
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }
  onSubmit() {
    if (this.editMode) {
      this.editIngredient();
    } else {
      this.addIngredient();
    }
    this.onResetForm();
  }

  addIngredient() {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.shoppingEditForm.value.name,
        this.shoppingEditForm.value.amount
      )
    );
  }

  editIngredient() {
    this.shoppingListService.editIngredient(
      this.editedIndex,
      new Ingredient(
        this.shoppingEditForm.value.name,
        this.shoppingEditForm.value.amount
      )
    );
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    console.log(this.shoppingListService.getIngredients());
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
    this.editMode = false;
    this.editedIndex = -1;
  }
}
