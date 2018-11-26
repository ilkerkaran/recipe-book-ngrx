import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  declarations: [SignInComponent, SignUpComponent]
})
export class AuthModule {}
