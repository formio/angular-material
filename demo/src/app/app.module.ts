import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatFormioModule } from '@formio/angular-material';
import 'hammerjs';
import './CustomComponent';
import { MaterialCustomComponent } from './CustomComponent';

@NgModule({
  declarations: [
    AppComponent,
    MaterialCustomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MaterialCustomComponent]
})
export class AppModule { }
