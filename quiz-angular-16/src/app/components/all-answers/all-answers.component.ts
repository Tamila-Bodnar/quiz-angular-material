import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Question } from '../../entities/question';

@Component({
  selector: 'app-all-answers',
  templateUrl: './all-answers.component.html',
  styleUrls: ['./all-answers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllAnswersComponent {
  @Input() answers: Question[];

  displayedColumns: string[] = ['question', 'right-answer'];

  trackByIndex(index: number, item: any): number {
    return item.index;
  }
}
