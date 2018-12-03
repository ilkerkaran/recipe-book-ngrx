import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shoppimg-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 7), new Ingredient('Tomatoes', 11)]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActionTypes
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
