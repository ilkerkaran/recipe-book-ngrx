import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ShoppingListRoutingModule],
  declarations: [ShoppingListComponent, ShoppingEditComponent]
})
export class ShoppingListModule {}
