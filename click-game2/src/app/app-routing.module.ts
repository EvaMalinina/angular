import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionComponent} from "./question/question.component";
import {GameComponent} from "./game/game.component";

const routes: Routes = [{
  path: "question",
  component: QuestionComponent
  }, {
  path: "play",
  component: GameComponent
  }, {
  path: '**',
  component: QuestionComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
