import { ResponseInterceptor } from './../shared/response.interceptor';
import { AuthInterceptor } from './../shared/auth.interecptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './home/home.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, AppRoutingModule, SharedModule],
  declarations: [HeaderComponent, HomeComponent],
  exports: [AppRoutingModule, HeaderComponent, HomeComponent],
  providers: [
    ShoppingListService,
    RecipeService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ]
})
export class CoreModule {}
