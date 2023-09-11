import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { QuestionComponent } from './question/question.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ScoreComponent } from './score/score.component';
import { AllAnswersComponent } from './all-answers/all-answers.component';
import { NotificationComponent } from './notification/notification.component';
import { MatTableModule } from '@angular/material/table';

export const components = [
  GameComponent,
  QuestionComponent,
  ScoreComponent,
  AllAnswersComponent,
  NotificationComponent,
];

@NgModule({
  declarations: [
    components,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: components,
})
export class ComponentsModule { }
