import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shoppimg-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 7), new Ingredient('Tomatoes', 11)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActionTypes
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      const myAddIngredientAction = <ShoppingListActions.AddIngredient>action;
      console.log(myAddIngredientAction);
      return {
        ...state,
        ingredients: [...state.ingredients, myAddIngredientAction.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      const myAddIngredientsAction = <ShoppingListActions.AddIngredients>action;
      return {
        ...state, // this one is old state with spread operator.
        ingredients: [
          ...state.ingredients,
          ...(<Ingredient[]>myAddIngredientsAction.payload)
        ] // override ingredients property
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const myAction = <ShoppingListActions.UpdateIngredient>action;
      const myPayload = <{ingredient: Ingredient }>(
        myAction.payload
      );
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient, // adds ingredient's properties to object base
        ...myPayload.ingredient // overrides ingredient's property values
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state, // this one is old state with spread operator.
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state, // this one is old state with spread operator.
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      const myStartAction = <ShoppingListActions.StartEdit>action;
      const index = <number>myStartAction.payload;
      const editedIngredient = {
        ...state.ingredients[index]
      };
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: index
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
