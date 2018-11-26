import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [AppComponent],
  // Order in impport ensures that the Catch-all/ wildcard routes work correctly.
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
