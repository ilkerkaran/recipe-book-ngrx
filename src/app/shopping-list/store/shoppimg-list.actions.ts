import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
  type: string = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  type: string = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  type: string = UPDATE_INGREDIENT;
  constructor(public payload: {ingredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  type: string = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  type: string = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  type: string = STOP_EDIT;
}

export type ShoppingListActionTypes =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit;
