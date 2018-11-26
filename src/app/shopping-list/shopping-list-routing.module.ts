import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { AuthGuard } from '../auth/auth.guard';

const shoppingListRoute: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    children: [{ path: ':id/edit', component: ShoppingEditComponent }]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(shoppingListRoute)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
