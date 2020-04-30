import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatFormioModule } from 'angular-material-formio';
import {MaterialHeaderComponent} from './CustomComponent';

@NgModule({
  declarations: [
    AppComponent,
    MaterialHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
