import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';
import {NameService} from "./services/name.service";

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    QuestionComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    NameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
