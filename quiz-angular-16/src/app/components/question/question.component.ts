import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../entities/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  @Input() question: Question;
  @Output() answer = new EventEmitter<number>();

  onAnswerSelected(index: number) {
    this.answer.emit(index);
  }

  trackByIndex(index: number, item: any): number {
    return item.index;
  }
}
