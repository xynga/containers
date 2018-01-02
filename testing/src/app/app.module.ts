import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContainersModule } from 'xynga-containers';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContainersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
