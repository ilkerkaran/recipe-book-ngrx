import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';
@NgModule({
  declarations: [AppComponent],
  // Order in impport ensures that the Catch-all/ wildcard routes work correctly.
  imports: [
    BrowserModule,
    FormsModule,
    ShoppingListModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
